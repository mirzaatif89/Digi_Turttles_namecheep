import type { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { SERVICES } from "@/components/site/content";
import type { PublicService, Service, ServiceInput } from "../services.schemas";

type ServiceRow = RowDataPacket & {
  id: string;
  title: string;
  text: string;
  icon: Service["icon"];
  sort_order: number;
  is_published: number;
  created_at: Date;
  updated_at: Date;
};

type Queryable = Pool | PoolConnection;

const SERVICE_COLUMNS: Record<string, string> = {
  id: "CHAR(36) NOT NULL",
  title: "VARCHAR(100) NOT NULL",
  text: "VARCHAR(300) NOT NULL",
  icon: "VARCHAR(40) NOT NULL",
  sort_order: "INT NOT NULL DEFAULT 0",
  is_published: "TINYINT(1) NOT NULL DEFAULT 1",
  created_at: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP",
  updated_at: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
};

let schemaPromise: Promise<void> | undefined;
let publishedCache: { expiresAt: number; services: PublicService[] } | undefined;

function uuid(): string {
  return crypto.randomUUID();
}

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    title: row.title,
    text: row.text,
    icon: row.icon,
    sortOrder: Number(row.sort_order),
    isPublished: Boolean(row.is_published),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function fallbackServices(): PublicService[] {
  return SERVICES.map((service, index) => ({
    id: `bundled-service-${index + 1}`,
    title: service.title,
    text: service.text,
    icon: service.icon,
    sortOrder: index,
  }));
}

async function createServicesTable(db: Pool): Promise<void> {
  await db.query(`CREATE TABLE IF NOT EXISTS services (
    id CHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    text VARCHAR(300) NOT NULL,
    icon VARCHAR(40) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_published TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_services_public (is_published, sort_order)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  const [rows] = await db.query<(RowDataPacket & { COLUMN_NAME: string })[]>(
    "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'services'",
  );
  const existing = new Set(rows.map((row) => row.COLUMN_NAME));
  for (const [column, definition] of Object.entries(SERVICE_COLUMNS)) {
    if (!existing.has(column))
      await db.query(`ALTER TABLE services ADD COLUMN ${column} ${definition}`);
  }
}

async function seedServices(db: Pool): Promise<void> {
  const [rows] = await db.query<(RowDataPacket & { count: number })[]>(
    "SELECT COUNT(*) AS count FROM services",
  );
  if (Number(rows[0]?.count ?? 0) > 0) return;

  const rowsToInsert = SERVICES.map((service, index) => [
    uuid(),
    service.title,
    service.text,
    service.icon,
    index,
    1,
  ]);
  await db.query(
    "INSERT INTO services (id, title, text, icon, sort_order, is_published) VALUES ?",
    [rowsToInsert],
  );
}

/** Creates, verifies, and seeds the one Services table without migration files. */
export async function ensureServicesSchema(db: Pool): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await createServicesTable(db);
      await seedServices(db);
    })();
  }
  return schemaPromise;
}

export function invalidatePublishedServicesCache(): void {
  publishedCache = undefined;
}

export async function listServices(db: Pool): Promise<Service[]> {
  await ensureServicesSchema(db);
  const [rows] = await db.query<ServiceRow[]>(
    "SELECT id, title, text, icon, sort_order, is_published, created_at, updated_at FROM services ORDER BY sort_order ASC, created_at ASC",
  );
  return rows.map(mapService);
}

export async function getService(db: Queryable, id: string): Promise<Service | null> {
  const [rows] = await db.query<ServiceRow[]>(
    "SELECT id, title, text, icon, sort_order, is_published, created_at, updated_at FROM services WHERE id = ? LIMIT 1",
    [id],
  );
  return rows[0] ? mapService(rows[0]) : null;
}

export async function createService(db: Pool, input: ServiceInput): Promise<Service> {
  await ensureServicesSchema(db);
  const [rows] = await db.query<(RowDataPacket & { nextOrder: number })[]>(
    "SELECT COALESCE(MAX(sort_order), -1) + 1 AS nextOrder FROM services",
  );
  const id = uuid();
  await db.query(
    "INSERT INTO services (id, title, text, icon, sort_order, is_published) VALUES (?, ?, ?, ?, ?, 1)",
    [id, input.title, input.text, input.icon, Number(rows[0]?.nextOrder ?? 0)],
  );
  return (await getService(db, id))!;
}

export async function updateService(
  db: Pool,
  id: string,
  input: ServiceInput,
): Promise<Service | null> {
  await ensureServicesSchema(db);
  await db.query("UPDATE services SET title = ?, text = ?, icon = ? WHERE id = ?", [
    input.title,
    input.text,
    input.icon,
    id,
  ]);
  return getService(db, id);
}

export async function deleteService(db: Pool, id: string): Promise<boolean> {
  await ensureServicesSchema(db);
  const [result] = await db.query<ResultSetHeader>("DELETE FROM services WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export async function duplicateService(db: Pool, id: string): Promise<Service | null> {
  await ensureServicesSchema(db);
  const source = await getService(db, id);
  if (!source) return null;
  const [rows] = await db.query<(RowDataPacket & { nextOrder: number })[]>(
    "SELECT COALESCE(MAX(sort_order), -1) + 1 AS nextOrder FROM services",
  );
  const duplicateId = uuid();
  await db.query(
    "INSERT INTO services (id, title, text, icon, sort_order, is_published) VALUES (?, ?, ?, ?, ?, ?)",
    [
      duplicateId,
      `${source.title} (copy)`.slice(0, 100),
      source.text,
      source.icon,
      Number(rows[0]?.nextOrder ?? 0),
      0,
    ],
  );
  return getService(db, duplicateId);
}

export async function setServicePublished(
  db: Pool,
  id: string,
  isPublished: boolean,
): Promise<Service | null> {
  await ensureServicesSchema(db);
  await db.query("UPDATE services SET is_published = ? WHERE id = ?", [Number(isPublished), id]);
  return getService(db, id);
}

export async function reorderService(
  db: Pool,
  id: string,
  direction: "up" | "down",
): Promise<Service | null> {
  await ensureServicesSchema(db);
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const current = await getService(connection, id);
    if (!current) {
      await connection.rollback();
      return null;
    }
    const comparator = direction === "up" ? "<" : ">";
    const order = direction === "up" ? "DESC" : "ASC";
    const [neighbors] = await connection.query<ServiceRow[]>(
      `SELECT id, title, text, icon, sort_order, is_published, created_at, updated_at FROM services WHERE sort_order ${comparator} ? ORDER BY sort_order ${order} LIMIT 1`,
      [current.sortOrder],
    );
    const neighbor = neighbors[0] ? mapService(neighbors[0]) : null;
    if (!neighbor) {
      await connection.commit();
      return current;
    }
    await connection.query("UPDATE services SET sort_order = ? WHERE id = ?", [
      neighbor.sortOrder,
      current.id,
    ]);
    await connection.query("UPDATE services SET sort_order = ? WHERE id = ?", [
      current.sortOrder,
      neighbor.id,
    ]);
    await connection.commit();
    return getService(db, id);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function getPublishedServicesWithFallback(db: Pool): Promise<PublicService[]> {
  if (publishedCache && publishedCache.expiresAt > Date.now()) return publishedCache.services;
  const fallback = fallbackServices();
  const query = (async () => {
    await ensureServicesSchema(db);
    const [rows] = await db.query<ServiceRow[]>(
      "SELECT id, title, text, icon, sort_order, is_published, created_at, updated_at FROM services WHERE is_published = 1 ORDER BY sort_order ASC, created_at ASC",
    );
    return rows.map(mapService).map(({ id, title, text, icon, sortOrder }) => ({
      id,
      title,
      text,
      icon,
      sortOrder,
    }));
  })();
  // Attach a rejection handler before racing, so a later timeout cannot create an unhandled rejection.
  const settledQuery = query.catch(() => undefined);
  const timedOut = new Promise<undefined>((resolve) => setTimeout(resolve, 1500));
  const services = (await Promise.race([settledQuery, timedOut])) ?? fallback;
  const cached = services.length > 0 ? services : fallback;
  publishedCache = { services: cached, expiresAt: Date.now() + 60_000 };
  return cached;
}
