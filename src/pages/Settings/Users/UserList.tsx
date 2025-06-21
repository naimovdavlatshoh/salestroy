import React, { useEffect, useState } from "react";
import { GetDataSimple } from "@/services/data";
import { usePageTitle } from "@/lib/PageTitleContext";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import Settingsmenu from "@/components/sub/Settingsmenu";
import LoaderContainer from "@/components/sub/LoaderContainer";
import { useTranslation } from "react-i18next";
import CustomThead from "@/components/sub/CustomThead";
import { AddUser } from "./components/AddUser";
import { UpdateUser } from "./components/UpdateUser";
import type { RoleItem } from "../Roles/types";
import type { UserData } from "./types";
import { ViewUser } from "./components/ViewUser";
import { DeleteUser } from "./components/DeleteUser";
import { useDebounce } from "@/hooks/useDebounce";

const ITEMS_PER_PAGE = 5;

const UserList: React.FC = () => {
    const [roles, setRoles] = useState<RoleItem[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(false);
    const { setTitle } = usePageTitle();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const debouncedSearch = useDebounce(search, 500);

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const paginatedData = users.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setTitle(t("users"));
    }, [t]);

    useEffect(() => {
        setLoading(true);
        GetDataSimple(`v1/role/list`).then((res) => {
            if (res?.success && Array.isArray(res.data)) {
                setRoles(res.data);
            }
        });
    }, [status]);

    useEffect(() => {
        setLoading(true);
        GetDataSimple(`v1/user/list?search=${debouncedSearch}`).then((res) => {
            if (res?.success && Array.isArray(res.data)) {
                setUsers(res.data);
            }
            setLoading(false);
        });
    }, [debouncedSearch, status]);

    const handlePrevious = () =>
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const changeStatus = () => setStatus(!status);

    return (
        <div>
            <Settingsmenu />

            <div className="p-4 overflow-auto border rounded-2xl border-gray-200 shadow-xs">
                <div className="flex justify-between w-full mb-5">
                    <div className="flex items-center border w-4/5 py-2 px-5 rounded-lg">
                        <FiSearch size={20} className="mr-3 text-gray-500" />
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
                    <AddUser roles={roles} changeStatus={changeStatus} />
                </div>

                <div className="w-full rounded-lg overflow-hidden">
                    {loading ? (
                        <LoaderContainer />
                    ) : (
                        <table className="min-w-full text-sm text-left">
                            <CustomThead
                                columns={[
                                    t("id"),
                                    t("full_name"),
                                    t("login"),
                                    t("role"),
                                    t("status"),
                                    t("is_admin"),
                                    t("created_at"),
                                    t("updated_at"),
                                    t("actions"),
                                ]}
                            />
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="even:bg-gray-50 odd:bg-white hover:bg-gray-50 border-b h-[60px]"
                                        >
                                            <td className="px-4 py-3">
                                                {user.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.login}
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.role_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.status === 1 ? (
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
                                                {user.is_admin === 1
                                                    ? t("yes")
                                                    : t("no")}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(
                                                    user.updated_at
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <ViewUser user={user} />
                                                <UpdateUser
                                                    user={user}
                                                    roles={roles}
                                                    changeStatus={changeStatus}
                                                />
                                                <DeleteUser
                                                    user={user}
                                                    changeStatus={changeStatus}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="text-center py-4 text-gray-500 font-medium"
                                        >
                                            {t("no_users")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            {users.length > 0 && (
                                <tfoot>
                                    <tr>
                                        <td colSpan={9} className="px-4 py-3">
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserList;
