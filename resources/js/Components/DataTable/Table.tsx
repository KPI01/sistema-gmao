import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
    getFilteredRowModel,
} from "@tanstack/react-table";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
}

export function Table<T>({ data, columns }: TableProps<T>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { columnFilters },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <table className="min-w-full border">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="border px-2 py-1">
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                                {header.column.getCanFilter() ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={
                                                (header.column.getFilterValue() ??
                                                    "") as string
                                            }
                                            onChange={(e) =>
                                                header.column.setFilterValue(
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Filtrar...`}
                                            className="mt-1 w-full border rounded px-1 py-0.5 text-xs"
                                        />
                                    </div>
                                ) : null}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="border px-2 py-1">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
