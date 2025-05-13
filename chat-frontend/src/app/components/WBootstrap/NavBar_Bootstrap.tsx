"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../user-provider";
import InfinityLoader from "../Loader"; // Asegúrate de que esta importación sea correcta

const NavBar = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (!isLoading && (!user || !user._id)) {
            setRedirecting(true);
            router.push("/Login"); // Redirige si el usuario no está autenticado
        }
    }, [user, isLoading, router]);

    if (isLoading || redirecting) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <InfinityLoader />
            </div>
        );
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/Login");
    };

    const userImage =
        "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0";

    return (
        <nav className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <a href="/" className="flex items-center space-x-2">
                    <img src="https://th.bing.com/th/id/R.e609f215504729e434d0e435fc1a9487?rik=hlBZQqxx4Uj0gQ&riu=http%3a%2f%2fwww.radcolombia.org%2fweb%2fsites%2fdefault%2ffiles%2farchivos%2finstituciones%2fcorporacion-unificada-nacional-educacion-superior%2flogo-cun.png&ehk=b2JJI4J84umR%2fpY2iWTLvVi%2fkGW%2bajxdV6c8pDmgKc4%3d&risl=&pid=ImgRaw&r=0" alt="Logo" className="w-6 h-6" />
                    <span className="font-semibold text-xl">Cun_Chat</span>
                </a>

                <button onClick={toggleMenu} className="lg:hidden text-gray-700 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <ul className={`lg:flex space-x-6 items-center ${menuOpen ? "block" : "hidden"} lg:block mt-4 lg:mt-0`}>
                    <li><a href="/" className="text-gray-700 hover:text-blue-600">Home</a></li>
                    <li><a href="/Chat" className="text-gray-700 hover:text-blue-600">Chats</a></li>
                    {!user && (
                        <>
                            <li><a href="/Register" className="text-gray-700 hover:text-blue-600">Register</a></li>
                            <li><a href="/Login" className="text-gray-700 hover:text-blue-600">Login</a></li>
                        </>
                    )}
                </ul>

                {user && (
                    <div className="relative ml-4">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 focus:outline-none"
                        >
                            <img src={userImage} className="w-8 h-8 rounded-full" alt="User" />
                            <span className="text-gray-700">{user?.name || "User"}</span>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                                <div className="px-4 py-2">
                                    <p className="font-semibold">{user?.name}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                                <hr />
                                <a href="/" className="block px-4 py-2 hover:bg-gray-100">Home</a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
