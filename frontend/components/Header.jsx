import { useState, useEffect } from "react";

export default function Header() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const userInfo = localStorage.getItem("user");

        if (userInfo) {
            try {
                const parsedUser = JSON.parse(userInfo);
                setUserName(parsedUser.name || "Guest");
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    return (
        <nav className="bg-gray-800 text-white w-max-full shadow-lg">
            <div className="container pl-4">
                <div className="flex items-center h-20 gap-96">
                    <div className="flex items-center gap-2">
                        <img
                            src="../assets/task-manager-logo-dark.png"
                            alt="TaskManager Logo"
                            className="h-14 w-auto"
                        />
                        <span className="text-2xl font-bold tracking-wide text-indigo-400">
                            TaskManager
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center">
                        <span className="text-lg font-semibold text-gray-300">
                            Welcome, <span className="text-indigo-300">{userName.toUpperCase()}</span>
                        </span>
                    </div>

                    {/* User Profile Icon */}
                    <div className="hidden md:flex md:flex-row items-center gap-2 cursor-pointer">
                        <span className="text-lg font-semibold text-gray-300">Log Out</span>
                        <img src="../assets/log-out.png" alt="Log Out" className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
