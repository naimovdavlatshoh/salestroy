import { BsBuildings, BsHouses } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";
import { RiBuilding2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { HiUserGroup } from "react-icons/hi2";

export const useSettingsCard = () => {
    const { t } = useTranslation();

    return [
        {
            to: "/companies",
            icon: <RiBuilding2Line size={32} />,
            label: t("companies"),
        },
        {
            to: "/objects",
            icon: <BsBuildings size={32} />,
            label: t("objects"),
        },
        {
            to: "/blocks",
            icon: <BsHouses size={32} />,
            label: t("blocks"),
        },
        {
            to: "/roles",
            icon: <FaUsersGear size={32} />,
            label: t("roles"),
        },
        {
            to: "/users",
            icon: <HiUserGroup size={32} />,
            label: t("users"),
        },
    ];
};
