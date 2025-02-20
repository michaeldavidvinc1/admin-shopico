import { config } from "@/config";
import { API_URL } from "@/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardHeader from "./header";
import DashboardSidebar from "./sidebar";

export default function GuardRoute() {
    const navigate = useNavigate();
    const location = useLocation();
    const [openSidebar, setOpenSidebar] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(config.api_host_dev + API_URL.VERIFY_TOKEN(token));
                if (response.data.success !== true) {
                    throw new Error('Token invalid');
                }
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        validateToken();
    }, [location.pathname, navigate]);  
    return (
        <div className="flex min-h-screen w-full bg-gradient-to-bottom">
            <DashboardSidebar
                setOpen={setOpenSidebar}
            />
            <div className="flex flex-1 flex-col">
                <DashboardHeader setOpen={setOpenSidebar} />
                <main className="flex-1 flex-col flex p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
