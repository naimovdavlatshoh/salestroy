import React, { useEffect, useState } from "react";
import { GetDataSimple } from "@/services/data";
import { usePageTitle } from "@/lib/PageTitleContext";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import Settingsmenu from "@/components/sub/Settingsmenu";
import { AddRole } from "./components/AddRole";
import { ViewRole } from "./components/ViewRole";
import { UpdateRole } from "./components/UpdateRole";
import { DeleteRole } from "./components/DeleteRole";
import type { RoleItem } from "./types";
import LoaderContainer from "@/components/sub/LoaderContainer";
import { useTranslation } from "react-i18next";
import CustomThead from "@/components/sub/CustomThead";

const ITEMS_PER_PAGE = 5;

const RoleList: React.FC = () => {
    const [roles, setRoles] = useState<RoleItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(false);
    const { setTitle } = usePageTitle();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const totalPages = Math.ceil(roles.length / ITEMS_PER_PAGE);
    const paginatedData = roles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setTitle(t("roles"));
    }, [t]);

    useEffect(() => {
        setLoading(true);

        GetDataSimple(`v1/role/list?search=${search}`).then((res) => {
            if (res?.success && Array.isArray(res.data)) {
                setRoles(res.data);
                setLoading(false);
            }
        });
    }, [search, status]);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const changeStatus = () => setStatus(!status);

    return (
        <div>
            <Settingsmenu />
            {loading ? (
                <LoaderContainer />
            ) : (
                <div className="p-4 overflow-auto border rounded-2xl border-gray-200 shadow-xs">
                    <div className="flex justify-between w-full mb-5">
                        <div className="flex items-center border w-4/5 py-2 px-5 rounded-lg">
                            <FiSearch
                                size={20}
                                className="mr-3 text-gray-500"
                            />
                            <input
                                type="text"
                                placeholder={t("search_placeholder")}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="outline-none w-full"
                            />
                            {search && (
                                <IoMdClose
                                    size={20}
                                    onClick={() => setSearch("")}
                                    className="text-gray-500 cursor-pointer"
                                />
                            )}
                        </div>
                        <AddRole changeStatus={changeStatus} />
                    </div>

                    <div className="w-full rounded-lg overflow-hidden">
                        <table className="min-w-full text-sm text-left">
                            <CustomThead
                                columns={[
                                    t("id"),
                                    t("name"),
                                    t("status"),
                                    t("is_active"),
                                    t("created_at"),
                                    t("updated_at"),
                                    t("actions"),
                                ]}
                            />

                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((role) => (
                                        <tr
                                            key={role.id}
                                            className="even:bg-gray-50 odd:bg-white hover:bg-gray-50 border-b h-[60px]"
                                        >
                                            <td className="px-4 py-3">
                                                {role.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {role.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {role.status === 1 ? (
                                                    <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                                                        {t("active")}
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-600 text-xs font-semibold">
                                                        {t("inactive")}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {role.is_active === 1
                                                    ? t("yes")
                                                    : t("no")}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(
                                                    role.created_at
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(
                                                    role.updated_at
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <ViewRole object={role} />
                                                    <UpdateRole
                                                        changeStatus={
                                                            changeStatus
                                                        }
                                                        role={role}
                                                    />
                                                    <DeleteRole
                                                        changeStatus={
                                                            changeStatus
                                                        }
                                                        object={role}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="text-center py-4 text-gray-500 font-medium"
                                        >
                                            {t("no_roles")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            {roles.length > 0 && (
                                <tfoot>
                                    <tr>
                                        <td colSpan={7} className="px-4 py-3">
                                            <div className="flex items-center justify-between text-sm mt-2">
                                                <span className="text-gray-600">
                                                    {t("page")} {currentPage}{" "}
                                                    {t("of")} {totalPages}
                                                </span>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={handlePrevious}
                                                        disabled={
                                                            currentPage === 1
                                                        }
                                                        className="p-2 rounded-full border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                                                    >
                                                        <IoIosArrowBack />
                                                    </button>
                                                    <button
                                                        onClick={handleNext}
                                                        disabled={
                                                            currentPage ===
                                                            totalPages
                                                        }
                                                        className="p-2 rounded-full border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                                                    >
                                                        <IoIosArrowForward />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleList;
