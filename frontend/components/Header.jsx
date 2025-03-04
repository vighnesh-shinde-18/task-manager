import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [userName, setUserName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

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
        <nav className="bg-gray-800 text-white w-full shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <img
                            src="../assets/task-manager-logo-dark.png"
                            alt="TaskManager Logo"
                            className="h-12 w-auto"
                        />
                        <span className="text-2xl font-bold tracking-wide text-indigo-400">
                            TaskManager
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <span className="text-lg font-semibold text-gray-300">
                            Welcome, <span className="text-indigo-300">{userName.toUpperCase()}</span>
                        </span>
                        <button
                            className="flex items-center gap-2 text-lg font-semibold text-gray-300 hover:text-indigo-300"
                            onClick={() => {
                                setTimeout(() => {
                                    navigate("./loginAndRegistration");
                                }, 1000);
                                localStorage.removeItem("token");
                            }}
                        >
                            Log Out
                            <img src="../assets/log-out.png" alt="Log Out" className="h-6 w-6" />
                        </button>
                    </div>

                    <button
                        className="md:hidden focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-8 h-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {menuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-gray-700 py-3 px-4 space-y-2">
                        <span className="block text-lg font-semibold text-gray-300">
                            Welcome, <span className="text-indigo-300">{userName.toUpperCase()}</span>
                        </span>
                        <button
                            className="flex items-center gap-2 text-lg font-semibold text-gray-300 hover:text-indigo-300 w-full"
                            onClick={() => {
                                navigate("/Login");
                                setMenuOpen(false);
                            }}
                        >Log Out
                            <img src="../assets/log-out.png" alt="Log Out" className="h-6 w-6" />
                        </button>
                    </div>
                )}
            </div>
        </nav >
    );
}