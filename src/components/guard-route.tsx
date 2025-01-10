import { ROUTES } from "@/constant";
import { RootState } from "@/lib/store";
import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuardRoute() {
    let token = useSelector((state: RootState) => state.auth.token);

    if (!token) return <Navigate to={ROUTES.LOGIN} replace={true} />;

    return(
        <div>
            <header>
                <h1>header</h1>
            </header>
            <div>
                <aside>
                    <h1>sidebar</h1>
                    <main>
                        <Outlet />
                    </main>
                </aside>
            </div>
        </div>
    );
}
