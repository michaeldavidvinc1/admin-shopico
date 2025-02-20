import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ChevronDown } from "lucide-react";
import { ROUTES } from "@/constant";

interface MenuItem {
    id: string;
    label: string;
    path?: string;
    icon: JSX.Element;
    children?: MenuItem[];
}

const Menu: MenuItem[] = [
    {
        id: "dashboard",
        label: "Home",
        path: ROUTES.DASHBOARD,
        icon: <LayoutDashboard className="w-5" />,
    },
    {
        id: "test",
        label: "Test",
        path: ROUTES.TEST,
        icon: <LayoutDashboard className="w-5" />,
    },
];

interface MenuItemsProps {
    setOpen?: (open: boolean) => void;
}

export const MenuItems: FC<MenuItemsProps> = ({ setOpen }) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const location = useLocation();

    const toggleMenu = (id: string) => {
        setOpenMenu(openMenu === id ? null : id);
    };

    return (
        <nav className="mt-8 flex-col flex gap-1">
            {Menu.map((menuItem) => {
                const isActive =
                    menuItem.path === location.pathname ||
                    (menuItem.children &&
                        menuItem.children.some(
                            (child) => child.path === location.pathname
                        ));

                return (
                    <div
                        key={menuItem.id}
                        className={`${
                            isActive
                                ? "rounded-lg bg-primary/20 border text-primary/90 border-primary/30"
                                : ""
                        }`}
                    >
                        <div
                            onClick={() => {
                                if (menuItem.children) {
                                    toggleMenu(menuItem.id);
                                }
                            }}
                            className="flex cursor-pointer text-sm font-poppins items-center justify-between rounded-md font-semibold px-3 py-2"
                        >
                            <div className="flex items-center gap-4">
                                {menuItem.icon}
                                {menuItem.path ? (
                                    <Link to={menuItem.path}>{menuItem.label}</Link>
                                ) : (
                                    <span>{menuItem.label}</span>
                                )}
                            </div>
                            {menuItem.children && (
                                <ChevronDown
                                    className={`w-5 transform transition-transform ${
                                        openMenu === menuItem.id ? "rotate-180" : ""
                                    }`}
                                />
                            )}
                        </div>
                        {menuItem.children && openMenu === menuItem.id && (
                            <div className="ml-8 mt-1 flex flex-col gap-1">
                                {menuItem.children.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.path || "#"}
                                        onClick={() => setOpen && setOpen(false)}
                                        className="cursor-pointer text-sm font-poppins px-3 py-1 rounded-md font-semibold"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

interface DashboardSidebarProps {
    setOpen?: (open: boolean) => void;
}

const DashboardSidebar: FC<DashboardSidebarProps> = ({ setOpen }) => {
    return (
        <aside className="hidden w-64 flex-col border-r bg-background py-6 px-4 lg:flex">
            <div className="flex justify-between items-center">
                <h1 className="text-md font-extrabold font-poppins">Admin Panel</h1>
            </div>
            <MenuItems setOpen={setOpen}/>
        </aside>
    );
};

export default DashboardSidebar;
