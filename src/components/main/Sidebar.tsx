import { FaUsers } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const currentUrl = useLocation().pathname;
  const { t } = useTranslation();

  const menuItems = [
    {
      icon: <FaChartSimple size={20} />,
      label: t("dashboard"),
      path: "#"
    },
    {
      icon: <FaUsers size={20} />,
      label: t("users"),
      path: "#"
    },
    {
      icon: <MdSpaceDashboard size={20} />,
      label: t("products"),
      path: "#"
    }
  ];

  return (
    <div
      className={`h-full flex flex-col justify-between transition-all duration-300 relative ${
        isCollapsed ? "items-center" : "items-start"
      }`}
    >
      <div className="px-2 py-4 w-full transition-all duration-300">
        <h1
          className={`mb-3 text-main text-xl font-bold transition-all duration-300 px-2 ${
            isCollapsed ? "text-center" : "text-start"
          }`}
        >
          {isCollapsed ? t("brand_short") : t("brand_full")}
        </h1>

        <div className="transition-all duration-300">
          <ul className="text-sm">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`group relative hover:bg-gray-100 transition-all duration-300 py-3 px-2 rounded-md flex items-center text-gray-600 ${
                  isCollapsed ? "justify-center" : "justify-start gap-3"
                }`}
              >
                {item.icon}
                <span
                  className={`transition-opacity duration-300 ${
                    isCollapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100"
                  }`}
                >
                  {item.label}
                </span>

                {isCollapsed && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-500 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none select-none z-50">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Settings */}
      <Link
        to={"settings"}
        className={`py-3 px-4 w-full border-t border-gray-300  ${
          currentUrl == "/settings"
            ? "text-main font-bold bg-second"
            : "hover:bg-gray-200"
        } transition-all duration-300 relative group`}
      >
        <p
          className={`text-md flex items-center gap-2 transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <TbSettings2 size={20} />
          <span
            className={`transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            {t("settings")}
          </span>

          {isCollapsed && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-500 text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none select-none z-50">
              {t("settings")}
            </span>
          )}
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
