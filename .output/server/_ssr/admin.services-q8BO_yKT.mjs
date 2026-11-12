import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime, a as AlertDialogDescription$1, c as AlertDialogTitle$1, i as AlertDialogContent$1, k as Slot, n as AlertDialogAction$1, o as AlertDialogOverlay$1, r as AlertDialogCancel$1, s as AlertDialogPortal$1, t as AlertDialog$1 } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { $ as ChevronLeft, H as Eye, L as GraduationCap, Q as ChevronRight, R as Gem, T as Megaphone, U as EyeOff, W as Copy, Z as ChevronUp, _ as PenLine, a as Target, at as ArrowUp, et as ChevronDown, f as Search, g as Plus, i as Trash2, it as Bot, nt as ChartNoAxesCombined, q as CodeXml, st as ArrowDown, y as Palette } from "../_libs/lucide-react.mjs";
import { a as SheetHeader, i as SheetFooter, n as SheetContent, o as SheetTitle, r as SheetDescription, t as Sheet } from "./sheet-CvGuJq1E.mjs";
import { n as NoAccess, r as PageHeader, t as EmptyState } from "./PageHeader-C9WTh_bf.mjs";
import { r as serviceInputSchema, t as SERVICE_ICON_NAMES } from "./services.schemas-U1PpKNTi.mjs";
import { t as Route } from "./admin.services-BMzCQb_e.mjs";
import { a as listServices, c as updateService, n as deleteService, o as reorderService, r as duplicateService, s as setPublishedService, t as createService } from "./services.functions-DnjVqoLi.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.services-q8BO_yKT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var AlertDialog = AlertDialog$1;
var AlertDialogPortal = AlertDialogPortal$1;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay$1, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = AlertDialogOverlay$1.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = AlertDialogContent$1.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = AlertDialogTitle$1.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = AlertDialogDescription$1.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction$1, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = AlertDialogAction$1.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel$1, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = AlertDialogCancel$1.displayName;
function ConfirmDelete({ open, onOpenChange, itemName, onConfirm, loading = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "admin-dialog",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
				"Delete ",
				itemName ?? "this item",
				"?"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This cannot be undone. The item will be removed from the website and admin list." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
				disabled: loading,
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				disabled: loading,
				onClick: (event) => {
					event.preventDefault();
					onConfirm();
				},
				className: "bg-red-600 text-white hover:bg-red-500",
				children: loading ? "Deleting…" : "Delete service"
			})] })]
		})
	});
}
function DataTable({ rows, columns, searchText, loading = false, pageSize = 8, emptyTitle = "Nothing here yet", canEdit, canCreate, canPublish, canDelete, onEdit, onDuplicate, onTogglePublished, onDelete, onMove }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(1);
	const filtered = (0, import_react.useMemo)(() => {
		const lowered = query.trim().toLowerCase();
		const result = rows.filter((row) => {
			const matchesQuery = !lowered || searchText(row).toLowerCase().includes(lowered);
			const matchesStatus = status === "all" || (status === "published" ? row.isPublished : !row.isPublished);
			return matchesQuery && matchesStatus;
		});
		if (!sort) return result;
		const column = columns.find((item) => item.id === sort.column);
		if (!column) return result;
		return [...result].sort((left, right) => {
			const leftValue = column.value(left);
			const rightValue = column.value(right);
			const comparison = typeof leftValue === "number" && typeof rightValue === "number" ? leftValue - rightValue : String(leftValue).localeCompare(String(rightValue));
			return sort.direction === "asc" ? comparison : -comparison;
		});
	}, [
		columns,
		query,
		rows,
		searchText,
		sort,
		status
	]);
	const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
	const currentPage = Math.min(page, pageCount);
	const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	const updateFilter = (next) => {
		setStatus(next);
		setPage(1);
	};
	const updateQuery = (next) => {
		setQuery(next);
		setPage(1);
	};
	const toggleSort = (column) => {
		if (!column.sortable) return;
		setSort((current) => current?.column === column.id ? {
			column: column.id,
			direction: current.direction === "asc" ? "desc" : "asc"
		} : {
			column: column.id,
			direction: "asc"
		});
		setPage(1);
	};
	const renderActions = (row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-end gap-1",
		"aria-label": "Row actions",
		children: [
			onMove && canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onMove(row, "up"),
				disabled: index === 0,
				className: "admin-table-action",
				title: "Move up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Move up"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onMove(row, "down"),
				disabled: index === filtered.length - 1,
				className: "admin-table-action",
				title: "Move down",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Move down"
				})]
			})] }),
			onEdit && canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onEdit(row),
				className: "admin-table-action",
				title: "Edit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Edit"
				})]
			}),
			onDuplicate && canCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onDuplicate(row),
				className: "admin-table-action",
				title: "Duplicate",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Duplicate"
				})]
			}),
			onTogglePublished && canPublish && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onTogglePublished(row),
				className: "admin-table-action",
				title: row.isPublished ? "Unpublish" : "Publish",
				children: [row.isPublished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: row.isPublished ? "Unpublish" : "Publish"
				})]
			}),
			onDelete && canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onDelete(row),
				className: "admin-table-action text-red-300 hover:text-red-200",
				title: "Delete",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Delete"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "admin-card overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 border-b border-[var(--admin-border)] p-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block min-w-0 flex-1 sm:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => updateQuery(event.target.value),
						placeholder: "Search services",
						className: "admin-table-input pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm text-[var(--admin-muted)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Filter by status"
						}),
						"Status",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (event) => updateFilter(event.target.value),
							className: "admin-table-select",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "published",
									children: "Published"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "draft",
									children: "Draft"
								})
							]
						})
					]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 p-4",
				"aria-label": "Loading table",
				children: Array.from({ length: 5 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 animate-pulse rounded-xl bg-[var(--admin-skeleton)]" }, index))
			}) : pageRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: emptyTitle }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-x-auto sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-[var(--admin-border)] text-xs uppercase tracking-wide text-[var(--admin-muted)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleSort(column),
								className: `inline-flex items-center gap-1 ${column.sortable ? "cursor-pointer hover:text-[var(--admin-text)]" : "cursor-default"}`,
								children: [column.label, column.sortable && (sort?.column === column.id ? sort.direction === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 opacity-45" }))]
							})
						}, column.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Actions"
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-[var(--admin-border)]",
						children: pageRows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "transition-colors hover:bg-white/[0.025]",
							children: [columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 align-middle",
								children: column.cell ? column.cell(row) : String(column.value(row))
							}, column.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 align-middle",
								children: renderActions(row, index)
							})]
						}, row.id))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-[var(--admin-border)] sm:hidden",
				children: pageRows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "space-y-3 p-4",
					children: [columns.filter((column) => column.card !== false).map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs font-semibold uppercase tracking-wide text-[var(--admin-muted)]",
							children: column.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 text-right text-sm",
							children: column.cell ? column.cell(row) : String(column.value(row))
						})]
					}, column.id)), renderActions(row, index)]
				}, row.id))
			})] }),
			!loading && filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex items-center justify-between gap-3 border-t border-[var(--admin-border)] px-4 py-3 text-sm text-[var(--admin-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					filtered.length,
					" result",
					filtered.length === 1 ? "" : "s"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: currentPage === 1,
							onClick: () => setPage((current) => Math.max(1, current - 1)),
							className: "admin-table-action",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Previous page"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								currentPage,
								" / ",
								pageCount
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: currentPage === pageCount,
							onClick: () => setPage((current) => Math.min(pageCount, current + 1)),
							className: "admin-table-action",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Next page"
							})]
						})
					]
				})]
			})
		]
	});
}
function EntityFormSheet({ open, onOpenChange, title, description, schema, defaultValues, resetKey, submitLabel, onSubmit, children }) {
	const form = useForm({
		resolver: u(schema),
		defaultValues
	});
	const [discardOpen, setDiscardOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) form.reset(defaultValues);
	}, [
		defaultValues,
		form,
		open,
		resetKey
	]);
	const requestClose = (nextOpen) => {
		if (nextOpen || !form.formState.isDirty || form.formState.isSubmitting) {
			onOpenChange(nextOpen);
			return;
		}
		setDiscardOpen(true);
	};
	const submit = form.handleSubmit(async (values) => {
		await onSubmit(values);
		form.reset(values);
		onOpenChange(false);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: requestClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "admin-sheet overflow-y-auto sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: description })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-5",
				onSubmit: submit,
				noValidate: true,
				children: [children(form), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetFooter, {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => requestClose(false),
						className: "admin-secondary-button",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: form.formState.isSubmitting,
						className: "admin-primary-button",
						children: form.formState.isSubmitting ? "Saving…" : submitLabel
					})]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: discardOpen,
		onOpenChange: setDiscardOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "admin-dialog",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Discard unsaved changes?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Your edits have not been saved yet." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep editing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => {
					form.reset(defaultValues);
					setDiscardOpen(false);
					onOpenChange(false);
				},
				children: "Discard changes"
			})] })]
		})
	})] });
}
var ICONS = {
	Target,
	Megaphone,
	Bot,
	Search,
	Gem,
	GraduationCap,
	ChartNoAxesCombined,
	Palette,
	Code2: CodeXml
};
var emptyService = {
	title: "",
	text: "",
	icon: "Target"
};
function ServicesPage() {
	const { allowed } = Route.useLoaderData();
	const { new: createFromQuickAction } = Route.useSearch();
	const { adminSession } = Route.useRouteContext();
	const [services, setServices] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const result = await listServices();
			if (result instanceof Response) throw new Error("You do not have permission to view services.");
			setServices(result);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not load services.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (allowed) load();
	}, [allowed, load]);
	(0, import_react.useEffect)(() => {
		if (createFromQuickAction && adminSession.permissions.services.create) setSheet({ mode: "create" });
	}, [adminSession.permissions.services.create, createFromQuickAction]);
	const permissions = adminSession.permissions.services;
	const defaultValues = (0, import_react.useMemo)(() => sheet?.mode === "edit" && sheet.service ? {
		title: sheet.service.title,
		text: sheet.service.text,
		icon: sheet.service.icon
	} : emptyService, [sheet]);
	const columns = (0, import_react.useMemo)(() => [
		{
			id: "title",
			label: "Service",
			sortable: true,
			value: (service) => service.title,
			cell: (service) => {
				const Icon = ICONS[service.icon];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-48 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--admin-teal)_15%,transparent)] text-[var(--admin-teal)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-semibold",
							children: service.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-1 text-xs text-[var(--admin-muted)]",
							children: service.text
						})]
					})]
				});
			}
		},
		{
			id: "icon",
			label: "Icon",
			sortable: true,
			value: (service) => service.icon
		},
		{
			id: "status",
			label: "Status",
			sortable: true,
			value: (service) => service.isPublished ? "Published" : "Draft",
			cell: (service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `admin-status ${service.isPublished ? "admin-status-published" : "admin-status-draft"}`,
				children: service.isPublished ? "Published" : "Draft"
			})
		},
		{
			id: "order",
			label: "Order",
			sortable: true,
			value: (service) => service.sortOrder,
			card: false
		},
		{
			id: "updated",
			label: "Updated",
			sortable: true,
			value: (service) => service.updatedAt,
			cell: (service) => new Date(service.updatedAt).toLocaleDateString(),
			card: false
		}
	], []);
	const mutate = async (work, success) => {
		try {
			if (await work() instanceof Response) throw new Error("Your permission was denied.");
			await load();
			toast.success(success);
			return true;
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "The service could not be saved.");
			return false;
		}
	};
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoAccess, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Services",
			description: "Manage the agency services shown on the public website.",
			actions: permissions.create ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setSheet({ mode: "create" }),
				className: "admin-primary-button",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New service"]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			rows: services,
			columns,
			searchText: (service) => `${service.title} ${service.text} ${service.icon}`,
			loading,
			emptyTitle: "No services match this view",
			canEdit: permissions.edit,
			canCreate: permissions.create,
			canPublish: permissions.publish,
			canDelete: permissions.delete,
			onEdit: (service) => setSheet({
				mode: "edit",
				service
			}),
			onDuplicate: (service) => void mutate(() => duplicateService({ data: { id: service.id } }), "Service duplicated as a draft."),
			onTogglePublished: (service) => void mutate(() => setPublishedService({ data: {
				id: service.id,
				isPublished: !service.isPublished
			} }), service.isPublished ? "Service unpublished." : "Service published."),
			onDelete: setPendingDelete,
			onMove: (service, direction) => void mutate(() => reorderService({ data: {
				id: service.id,
				direction
			} }), "Service order updated.")
		}),
		sheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityFormSheet, {
			open: true,
			onOpenChange: (open) => {
				if (!open) setSheet(null);
			},
			title: sheet.mode === "create" ? "New service" : "Edit service",
			description: "Use clear, client-facing language. Changes appear on the public site after publishing.",
			schema: serviceInputSchema,
			defaultValues,
			resetKey: sheet.service?.id ?? "new",
			submitLabel: sheet.mode === "create" ? "Create service" : "Save changes",
			onSubmit: async (values) => {
				if (!await mutate(() => sheet.mode === "create" ? createService({ data: values }) : updateService({ data: {
					id: sheet.service.id,
					...values
				} }), sheet.mode === "create" ? "Service created." : "Service updated.")) throw new Error("The service could not be saved.");
			},
			children: (form) => {
				const selectedIcon = form.watch("icon");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "admin-form-label",
								children: "Title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								...form.register("title"),
								className: "admin-table-input mt-1.5",
								maxLength: 100
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineError, { message: form.formState.errors.title?.message })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "admin-form-label",
								children: "Description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								...form.register("text"),
								className: "admin-table-input mt-1.5 min-h-28 resize-y py-2",
								maxLength: 300
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineError, { message: form.formState.errors.text?.message })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "admin-form-label",
							children: "Icon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5",
							children: SERVICE_ICON_NAMES.map((iconName) => {
								const Icon = ICONS[iconName];
								const selected = selectedIcon === iconName;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => form.setValue("icon", iconName, {
										shouldDirty: true,
										shouldValidate: true
									}),
									className: `admin-icon-picker ${selected ? "admin-icon-picker-active" : ""}`,
									"aria-pressed": selected,
									title: iconName,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: iconName
									})]
								}, iconName);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineError, { message: form.formState.errors.icon?.message })
					] })
				] });
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDelete, {
			open: Boolean(pendingDelete),
			onOpenChange: (open) => {
				if (!open) setPendingDelete(null);
			},
			itemName: pendingDelete?.title,
			loading: deleting,
			onConfirm: () => {
				if (!pendingDelete) return;
				setDeleting(true);
				mutate(() => deleteService({ data: { id: pendingDelete.id } }), "Service deleted.").then(() => {
					setDeleting(false);
					setPendingDelete(null);
				});
			}
		})
	] });
}
function InlineError({ message }) {
	return message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1.5 text-xs text-red-300",
		children: message
	}) : null;
}
//#endregion
export { ServicesPage as component };
