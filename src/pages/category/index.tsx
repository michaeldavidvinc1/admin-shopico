import {DynamicBreadcrumb} from "@/components/DynamicBreadcrumb"
import {ROUTES} from "@/constant";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useGetAllCategoryQuery} from "@/services/category.service.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import Datatable from "@/components/datatable.tsx";
import {columns} from "@/pages/category/column.tsx";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";


const CategoryPage = () => {
    const breadcrumbItems = [
        {label: "Dashboard", href: ROUTES.DASHBOARD},
        {label: "Category"},
    ];
    const {data: dataCategory, isLoading: getCategoryLoading} = useGetAllCategoryQuery({})
    // <span className="text-muted-foreground">({
    //     <ProductCount storeSlug={storeSlug}/>})</span
    return (
        <div className="space-y-6 flex flex-col gap-3">
            <div className="space-y-1">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Category</h1>
                    <DynamicBreadcrumb items={breadcrumbItems}/>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2 items-center">
                        <p>Show</p>
                        <Select>
                            <SelectTrigger className="w-[60px]">
                                <SelectValue placeholder="10"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="All Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-4 items-center">
                    <Input placeholder="Search category"/>
                    <button className="bg-primary text-white px-2 py-2 rounded-full">
                        <Link to={ROUTES.CREATE_CATEGORY} >
                            <Plus className="w-4 h-4" />
                        </Link>
                    </button>
                </div>
            </div>
            <Card>
                <CardContent className="pt-6">
                    {getCategoryLoading ? (
                        <h1>Loading</h1>
                    ) : (
                        <Datatable columns={columns} data={dataCategory?.data?.data} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoryPage
