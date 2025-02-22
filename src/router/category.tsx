import CategoryPage from "@/pages/category";
import CreateCategory from "@/pages/category/create";
import UpdateCategory from "@/pages/category/update";
import { Route, Routes } from "react-router-dom";

export default function CategoryRoute() {
    return (
        <Routes>
            <Route path="/" element={<CategoryPage />} />
            <Route path="/create" element={<CreateCategory />} />
            <Route path="/:slug" element={<UpdateCategory />} />
        </Routes>
    )
}