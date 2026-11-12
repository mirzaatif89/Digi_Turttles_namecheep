import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Edit3,
  Eye,
  EyeOff,
  Search,
  Trash2,
} from "lucide-react";
import { EmptyState } from "./EmptyState";

export type DataTableColumn<T> = {
  id: string;
  label: string;
  sortable?: boolean;
  value: (row: T) => string | number;
  cell?: (row: T) => ReactNode;
  card?: boolean;
};

type TableRow = { id: string; isPublished: boolean };

type DataTableProps<T extends TableRow> = {
  rows: T[];
  columns: DataTableColumn<T>[];
  searchText: (row: T) => string;
  loading?: boolean;
  pageSize?: number;
  emptyTitle?: string;
  canEdit?: boolean;
  canCreate?: boolean;
  canPublish?: boolean;
  canDelete?: boolean;
  onEdit?: (row: T) => void;
  onDuplicate?: (row: T) => void;
  onTogglePublished?: (row: T) => void;
  onDelete?: (row: T) => void;
  onMove?: (row: T, direction: "up" | "down") => void;
};

export function DataTable<T extends TableRow>({
  rows,
  columns,
  searchText,
  loading = false,
  pageSize = 8,
  emptyTitle = "Nothing here yet",
  canEdit,
  canCreate,
  canPublish,
  canDelete,
  onEdit,
  onDuplicate,
  onTogglePublished,
  onDelete,
  onMove,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    const result = rows.filter((row) => {
      const matchesQuery = !lowered || searchText(row).toLowerCase().includes(lowered);
      const matchesStatus =
        status === "all" || (status === "published" ? row.isPublished : !row.isPublished);
      return matchesQuery && matchesStatus;
    });
    if (!sort) return result;
    const column = columns.find((item) => item.id === sort.column);
    if (!column) return result;
    return [...result].sort((left, right) => {
      const leftValue = column.value(left);
      const rightValue = column.value(right);
      const comparison =
        typeof leftValue === "number" && typeof rightValue === "number"
          ? leftValue - rightValue
          : String(leftValue).localeCompare(String(rightValue));
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [columns, query, rows, searchText, sort, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateFilter = (next: "all" | "published" | "draft") => {
    setStatus(next);
    setPage(1);
  };
  const updateQuery = (next: string) => {
    setQuery(next);
    setPage(1);
  };
  const toggleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;
    setSort((current) =>
      current?.column === column.id
        ? { column: column.id, direction: current.direction === "asc" ? "desc" : "asc" }
        : { column: column.id, direction: "asc" },
    );
    setPage(1);
  };

  const renderActions = (row: T, index: number) => (
    <div className="flex flex-wrap items-center justify-end gap-1" aria-label="Row actions">
      {onMove && canEdit && (
        <>
          <button
            type="button"
            onClick={() => onMove(row, "up")}
            disabled={index === 0}
            className="admin-table-action"
            title="Move up"
          >
            <ArrowUp />
            <span className="sr-only">Move up</span>
          </button>
          <button
            type="button"
            onClick={() => onMove(row, "down")}
            disabled={index === filtered.length - 1}
            className="admin-table-action"
            title="Move down"
          >
            <ArrowDown />
            <span className="sr-only">Move down</span>
          </button>
        </>
      )}
      {onEdit && canEdit && (
        <button
          type="button"
          onClick={() => onEdit(row)}
          className="admin-table-action"
          title="Edit"
        >
          <Edit3 />
          <span className="sr-only">Edit</span>
        </button>
      )}
      {onDuplicate && canCreate && (
        <button
          type="button"
          onClick={() => onDuplicate(row)}
          className="admin-table-action"
          title="Duplicate"
        >
          <Copy />
          <span className="sr-only">Duplicate</span>
        </button>
      )}
      {onTogglePublished && canPublish && (
        <button
          type="button"
          onClick={() => onTogglePublished(row)}
          className="admin-table-action"
          title={row.isPublished ? "Unpublish" : "Publish"}
        >
          {row.isPublished ? <EyeOff /> : <Eye />}
          <span className="sr-only">{row.isPublished ? "Unpublish" : "Publish"}</span>
        </button>
      )}
      {onDelete && canDelete && (
        <button
          type="button"
          onClick={() => onDelete(row)}
          className="admin-table-action text-red-300 hover:text-red-200"
          title="Delete"
        >
          <Trash2 />
          <span className="sr-only">Delete</span>
        </button>
      )}
    </div>
  );

  return (
    <section className="admin-card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-[var(--admin-border)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block min-w-0 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search services"
            className="admin-table-input pl-9"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--admin-muted)]">
          <span className="sr-only">Filter by status</span>
          Status
          <select
            value={status}
            onChange={(event) => updateFilter(event.target.value as typeof status)}
            className="admin-table-select"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="space-y-3 p-4" aria-label="Loading table">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-14 animate-pulse rounded-xl bg-[var(--admin-skeleton)]" />
          ))}
        </div>
      ) : pageRows.length === 0 ? (
        <EmptyState title={emptyTitle} />
      ) : (
        <>
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--admin-border)] text-xs uppercase tracking-wide text-[var(--admin-muted)]">
                <tr>
                  {columns.map((column) => (
                    <th key={column.id} className="px-4 py-3 font-semibold">
                      <button
                        type="button"
                        onClick={() => toggleSort(column)}
                        className={`inline-flex items-center gap-1 ${column.sortable ? "cursor-pointer hover:text-[var(--admin-text)]" : "cursor-default"}`}
                      >
                        {column.label}
                        {column.sortable &&
                          (sort?.column === column.id ? (
                            sort.direction === "asc" ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 opacity-45" />
                          ))}
                      </button>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--admin-border)]">
                {pageRows.map((row, index) => (
                  <tr key={row.id} className="transition-colors hover:bg-white/[0.025]">
                    {columns.map((column) => (
                      <td key={column.id} className="px-4 py-3 align-middle">
                        {column.cell ? column.cell(row) : String(column.value(row))}
                      </td>
                    ))}
                    <td className="px-4 py-3 align-middle">{renderActions(row, index)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divide-y divide-[var(--admin-border)] sm:hidden">
            {pageRows.map((row, index) => (
              <article key={row.id} className="space-y-3 p-4">
                {columns
                  .filter((column) => column.card !== false)
                  .map((column) => (
                    <div key={column.id} className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
                        {column.label}
                      </span>
                      <span className="min-w-0 text-right text-sm">
                        {column.cell ? column.cell(row) : String(column.value(row))}
                      </span>
                    </div>
                  ))}
                {renderActions(row, index)}
              </article>
            ))}
          </div>
        </>
      )}

      {!loading && filtered.length > 0 && (
        <footer className="flex items-center justify-between gap-3 border-t border-[var(--admin-border)] px-4 py-3 text-sm text-[var(--admin-muted)]">
          <span>
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="admin-table-action"
            >
              <ChevronLeft />
              <span className="sr-only">Previous page</span>
            </button>
            <span className="tabular-nums">
              {currentPage} / {pageCount}
            </span>
            <button
              type="button"
              disabled={currentPage === pageCount}
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              className="admin-table-action"
            >
              <ChevronRight />
              <span className="sr-only">Next page</span>
            </button>
          </div>
        </footer>
      )}
    </section>
  );
}
