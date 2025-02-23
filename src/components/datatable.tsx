import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    ColumnDef
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type DataTableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    page: number;
    totalPage: number;
    setPage: (page: number) => void;
};

const Datatable = <T extends object>({ data, columns, page, totalPage, setPage }: DataTableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-black text-center">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="text-center">
                                    {row.getVisibleCells().map((cell) => {
                                        const cellValue = flexRender(cell.column.columnDef.cell, cell.getContext());
                                        if (Array.isArray(cellValue)) {
                                            return (
                                                <TableCell key={cell.id}>
                                                    {cellValue.map((item: ImageItem, index: number) => (
                                                        <div key={index}>
                                                            <img src={item.url} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover" />
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
            <div className="flex items-center justify-end py-4 mt-2">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                        className="px-3"
                    >
                        ⏪ First
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(Math.max(page - 1, 1))}
                        disabled={page === 1}
                        className="px-3"
                    >
                        ◀ Prev
                    </Button>
                    <span className="px-2 text-sm font-medium">{page}</span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(Math.min(page + 1, totalPage))}
                        disabled={page === totalPage}
                        className="px-3"
                    >
                        Next ▶
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(totalPage)}
                        disabled={page === totalPage}
                        className="px-3"
                    >
                        Last ⏩
                    </Button>
                </div>
            </div>

        </>
    );
};

export default Datatable;
