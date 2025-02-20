import React, { FC } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet'
import { LogOut, PanelRightOpen, UserPen } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { Auth } from '@/interface'
import { MenuItems } from './sidebar'

interface DashboardHeaderProps {
    setOpen: (open: boolean) => void;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({setOpen}) => {
    const handleLogout = () => {
        console.log("logout")
    };
    return (
        <div>
            <div className="flex items-center lg:justify-end justify-between px-14 py-4 border-b">
                <Sheet onOpenChange={() => setOpen(true)}>
                    <SheetTrigger asChild>
                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden sm:block hover:bg-[#E1F2FF] px-3 py-1 rounded-md"
                        >
                            <PanelRightOpen className="w-3" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <h1 className="text-md font-extrabold font-poppins">
                                        Dashboard
                                    </h1>
                                </div>
                            </div>
                            <MenuItems
                                setOpen={setOpen}
                            />
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="/assets/user.jpg" />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    to="#"
                                    className="flex items-center gap-2"
                                >
                                    <UserPen className="w-4" /> Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div
                                    className="text-red-500 cursor-pointer flex items-center gap-2"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4" /> Logout
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader
