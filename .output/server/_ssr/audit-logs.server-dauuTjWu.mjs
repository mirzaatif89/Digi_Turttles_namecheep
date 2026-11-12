//#region node_modules/.nitro/vite/services/ssr/assets/audit-logs.server-dauuTjWu.js
async function recordAuditLog(db, entry) {
	await db.query("INSERT INTO audit_logs (admin_id, module, action, record_id, summary, ip_address) VALUES (?, ?, ?, ?, ?, ?)", [
		entry.adminId,
		entry.module,
		entry.action,
		entry.recordId ?? null,
		entry.summary,
		entry.ipAddress
	]);
}
//#endregion
export { recordAuditLog };
