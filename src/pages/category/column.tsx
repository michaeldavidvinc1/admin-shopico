import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Category } from "@/interface";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant";

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "no",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    No
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: { row: Row<Category> }) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: { row: Row<Category> }) => {
            const name = row.getValue<string>("name");
            const image = row.original.image?.url || "image/category-default.png"; 

            return (
                <div className="flex items-center space-x-2">
                    <img src={image} alt={name} className="w-10 h-10 rounded-md object-cover" />
                    <span>{name}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<Category> }) => {
            const status = row.getValue<string>("status");

            return <Badge variant={status === 'ACTIVE' ? 'active' : 'destructive'} className="capitalize">{status.toLowerCase()}</Badge>
        }
    },
    {
        id: "actions",
        cell: ({ row }: { row: Row<Category> }) => {
            const navigate = useNavigate();
            const dataRow = row.original;
            // const [deleteProduct, { isLoading: loadingDeleteProduct }] = useDeleteProductMutation();
            // const { refetch: refetchProducts } = useGetAllProductByStoreQuery(dataRow.storeId);

            const handleEdit = (slug: string) => {
                navigate(ROUTES.UPDATE_CATEGORY(slug))
            }

            const handleDelete = () => {
                console.log("delete")
                // Swal.fire({
                //     title: "Are you sure?",
                //     text: "You cannot undo this data again!",
                //     icon: "warning",
                //     showCancelButton: true,
                //     confirmButtonColor: "#3085d6",
                //     cancelButtonColor: "#d33",
                //     confirmButtonText: "Iya, Hapus",
                //     cancelButtonText: "Batal",
                // }).then(async (result) => {
                //     if (result.isConfirmed) {
                //         const res = await deleteProduct(id).unwrap();
                //         if (res.success) {
                //             console.log("sukses")
                //         }
                //     }
                // });
            };
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer"
                                onClick={() => handleEdit(dataRow.slug)}
                            >
                                <Edit className="w-4" /> Edit
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer text-red-500"
                                onClick={() => handleDelete()}
                            >
                                <Trash2 className="w-4" /> Delete
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
