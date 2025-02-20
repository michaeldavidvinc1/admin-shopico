import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    ColumnDef
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Updated DataTableProps to use ColumnDef
type DataTableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
};

const Datatable = <T extends object>({ data, columns }: DataTableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    interface ImageItem {
        url: string;
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-black text-center"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="text-center"
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const cellValue = flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        );
                                        // Check if the value is an array (like for image URLs)
                                        if (Array.isArray(cellValue)) {
                                            // If the value is an array, just render its contents (e.g., image URLs)
                                            return (
                                                <TableCell key={cell.id}>
                                                    {cellValue.map((item: ImageItem, index: number) => (
                                                        <div key={index}>
                                                            <img
                                                                src={item.url}
                                                                alt={`Image ${index + 1}`}
                                                                className="w-16 h-16 object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </TableCell>
                                            );
                                        }
                                        return <TableCell key={cell.id}>{cellValue}</TableCell>;
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </>
    );
};

export default Datatable;