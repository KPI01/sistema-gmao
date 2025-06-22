import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    pageSize?: number;
    pagination?: number[];
}

export function Table<T>({ data, columns, pageSize = 10 }: TableProps<T>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            pagination,
        },
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="overflow-x-auto max-h-[85%]">
            <table className="table table-zebra max-h-full">
                <thead className="sticky top-0 bg-base-100 border-b-4 border-base-600">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                    {/* Filtro por columna */}
                                    {header.column.getCanFilter?.() && (
                                        <div>
                                            {header.column.getFilterFn?.() && (
                                                <input
                                                    type="text"
                                                    value={
                                                        (header.column.getFilterValue() as string) ??
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        header.column.setFilterValue(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="input input-bordered input-xs"
                                                    placeholder={`Filtrar...`}
                                                />
                                            )}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                Sin resultados.
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot className="sticky bottom-0 bg-base-100 border-t-4 border-base-600">
                    <tr>
                        <td colSpan={columns.length} className="py-2">
                            <div className="flex items-center justify-between">
                                <button
                                    className="btn btn-info btn-outline"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Anterior
                                </button>
                                <span>
                                    Página{" "}
                                    {table.getState().pagination.pageIndex + 1}{" "}
                                    de {table.getPageCount()}
                                </span>
                                <button
                                    className="btn btn-info btn-outline"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
