import { ROUTES } from "@/constant";
import { RootState } from "@/lib/store";
import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestOnlyRoute({ children }: {children: React.ReactNode}) {
    let token  = useSelector((state: RootState) => state.auth.token);

    if (token) return <Navigate to={ROUTES.DASHBOARD} replace={true} />;

    return children || <Outlet />;
}
