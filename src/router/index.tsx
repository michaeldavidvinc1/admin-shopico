import {Route, Routes} from "react-router-dom";
import Login from "@/pages/auth/login.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
