import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import { ROUTES } from "@/constant";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useGetAllCategoryQuery } from "@/services/category.service.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import Datatable from "@/components/datatable.tsx";
import { columns } from "@/pages/category/column.tsx";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

const CategoryPage = () => {
    // State untuk filter
    const [filters, setFilters] = useState({
        page: 1,
        size: 10,
        name: "",
        status: "",
        debouncedName: "",
    });
    const breadcrumbItems = [
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Category" },
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilters((prev) => ({ ...prev, debouncedName: prev.name }));
        }, 500);

        return () => clearTimeout(timeout);
    }, [filters.name]);

    const { data: dataCategory, isLoading: getCategoryLoading } = useGetAllCategoryQuery({
        page: filters.page,
        size: filters.size,
        name: filters.debouncedName,
        status: filters.status === 'all' ? "" : filters.status,
    });

    // Menghitung total halaman (gunakan `useMemo` biar gak dihitung ulang tiap render)
    const totalPage = useMemo(() => dataCategory?.data?.paging?.total_page || 1, [dataCategory]);

    // Function untuk update filter dengan aman
    const updateFilter = (key: keyof typeof filters, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Reset ke page 1 jika name atau status berubah
    useEffect(() => {
        updateFilter("page", 1);
    }, [filters.name, filters.status]);

    return (
        <div className="space-y-6 flex flex-col gap-3">
            <div className="space-y-1">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Category</h1>
                    <DynamicBreadcrumb items={breadcrumbItems} />
                </div>
            </div>

            {/* Filter */}
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    {/* Show Size */}
                    <div className="flex gap-2 items-center">
                        <p>Show</p>
                        <Select onValueChange={(value) => updateFilter("size", Number(value))}>
                            <SelectTrigger className="w-[60px]">
                                <SelectValue placeholder={filters.size.toString()} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Filter Status */}
                    <Select onValueChange={(value) => updateFilter("status", value)}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Search & Tambah */}
                <div className="flex gap-4 items-center">
                    <Input
                        placeholder="Search category"
                        value={filters.name}
                        onChange={(e) => updateFilter("name", e.target.value)}
                    />
                    <button className="bg-primary text-white px-2 py-2 rounded-full">
                        <Link to={ROUTES.CREATE_CATEGORY}>
                            <Plus className="w-4 h-4" />
                        </Link>
                    </button>
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardContent className="pt-6">
                    {getCategoryLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <Datatable
                            data={dataCategory?.data?.data}
                            columns={columns}
                            page={filters.page}
                            totalPage={totalPage}
                            setPage={(newPage) => updateFilter("page", newPage)}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default CategoryPage;
