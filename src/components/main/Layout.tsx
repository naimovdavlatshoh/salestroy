import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LanguageSwitcher from "../sub/LanguageSwitcher";

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    return (
        <div className="h-screen w-full flex overflow-hidden">
            {/* Sidebar */}
            <div
                className={`relative h-full border-r border-dashed border-gray-300 transition-all duration-300 ${
                    isCollapsed ? "w-[5%]" : "w-[15%]"
                }`}
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute top-12 -right-3 bg-white border border-dashed border-gray-300 rounded-full w-6 h-6 flex items-center justify-center shadow z-10"
                >
                    {isCollapsed ? (
                        <IoIosArrowForward size={15} color="green" />
                    ) : (
                        <IoIosArrowBack size={15} color="green" />
                    )}
                </button>

                {/* Sidebar content */}
                <Sidebar isCollapsed={isCollapsed} />
            </div>

            {/* Main section */}
            <div className="flex-1 h-full flex flex-col">
                {/* Navbar */}
                <div className="h-[60px] ">
                    <Navbar />
                </div>
                {/* Main content */}
                <div className="h-[calc(100vh-60px)] overflow-auto p-5">
                    <Outlet />
                    <LanguageSwitcher />{" "}
               
                </div>
            </div>
        </div>
    );
};

export default Layout;
