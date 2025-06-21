import { usePageTitle } from "@/lib/PageTitleContext";
import { GetDataSimple } from "@/services/data";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
    const { title } = usePageTitle();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    console.log();

    const toggleProfileMenu = () => {
        setIsProfileOpen((prev) => !prev);
    };

    // Tashqaridan bosilsa dropdown yopiladi
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const Logout = () => {
        GetDataSimple(`auth/logout`).then((res) => {
            console.log(res);
        });
    };

    return (
        <div className="w-full h-full flex items-center justify-between px-6 bg-white border-b relative">
            <p className="text-xl">{title}</p>
            {/* Til tanlash */}
            <div className="flex items-center ">
                {/* Profil tugmasi */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={toggleProfileMenu}
                        className="w-8 h-8 rounded-full bg-main text-white font-bold text-sm flex items-center justify-center shadow hover:opacity-90 transition"
                    >
                        D
                    </button>

                    {/* Dropdown menyu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in">
                            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Profile
                            </button>
                            <button
                                onClick={Logout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
