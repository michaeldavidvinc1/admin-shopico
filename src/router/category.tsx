import CategoryPage from "@/pages/category";
import CreateCategory from "@/pages/category/create";
import { Route, Routes } from "react-router-dom";

export default function CategoryRoute() {
    return (
        <Routes>
            <Route path="/" element={<CategoryPage />} />
            <Route path="/create" element={<CreateCategory />} />
        </Routes>
    )
}