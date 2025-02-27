import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "@/pages/auth/login.tsx";
import GuestOnlyRoute from "@/components/guest-only-route";
import GuardRoute from "@/components/guard-route";
import DashboardPage from "@/pages/dashboard";
import { ROUTES } from "@/constant";
import CategoryPage from "@/pages/category";
import CategoryRoute from "./category";

export default function AppRoutes() {

    return (
        <Routes>
            <Route
                path={ROUTES.LOGIN}
                element={
                    <GuestOnlyRoute>
                        <Login />
                    </GuestOnlyRoute>
                }
            />
            <Route
                path={ROUTES.DASHBOARD}
                element={
                    <GuardRoute />
                }
            >
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path="/category/*" element={<CategoryRoute />} />
            </Route>
        </Routes>
    )
}
