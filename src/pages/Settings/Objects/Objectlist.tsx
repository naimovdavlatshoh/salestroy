import React, { useEffect, useState } from "react";
import { GetDataSimple } from "@/services/data";
import { usePageTitle } from "@/lib/PageTitleContext";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { AddObject } from "./components/AddObject";
import { UpdateObject } from "./components/UpdateObject";
import { ViewObject } from "./components/ViewObject";
import { DeleteObject } from "./components/DeleteObject";
import type { ObjectItem } from "./types";
import Settingsmenu from "@/components/sub/Settingsmenu";
import LoaderContainer from "@/components/sub/LoaderContainer";
import CustomThead from "@/components/sub/CustomThead";

const ITEMS_PER_PAGE = 5;

const ObjectList: React.FC = () => {
    const [objects, setObjects] = useState<ObjectItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const { setTitle } = usePageTitle();
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const totalPages = Math.ceil(objects.length / ITEMS_PER_PAGE);

    const paginatedData = objects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setTitle(t("objects"));
    }, [t]);

    useEffect(() => {
        setLoading(true);
        GetDataSimple(`v1/object/list?search=${search}`).then((res) => {
            if (res?.success && Array.isArray(res.data)) {
                setObjects(res.data);
                setLoading(false);
            }
        });
    }, [status, search]);

    const handlePrevious = () =>
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
                            <FiSearch color="gray" size={20} className="mr-3" />
                            <input
                                placeholder={t("search_placeholder")}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="outline-none w-full"
                            />
                            {search.length > 0 && (
                                <IoMdClose
                                    onClick={() => setSearch("")}
                                    color="gray"
                                    size={20}
                                />
                            )}
                        </div>
                        <AddObject changeStatus={changeStatus} />
                    </div>

                    <div className="w-full rounded-lg overflow-hidden">
                        <table className="min-w-full text-sm text-left">
                            <CustomThead
                                columns={[
                                    t("id"),
                                    t("name"),
                                    t("company_id"),
                                    t("region"),
                                    t("district"),
                                    t("address"),
                                    t("floors"),
                                    t("blocks"),
                                    t("start"),
                                    t("end"),
                                    t("status"),
                                    t("actions"),
                                ]}
                            />
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((object) => (
                                        <tr
                                            key={object.id}
                                            className="even:bg-gray-50 h-[60px] odd:bg-white hover:bg-gray-50 border-b"
                                        >
                                            <td className="px-4 py-3">
                                                {object.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.company_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.region_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.district_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.address}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.floor_count}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.block_count}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.start_date}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.end_date}
                                            </td>
                                            <td className="px-4 py-3">
                                                {object.status == 1 ? (
                                                    <span className="inline-block px-2 py-1 rounded bg-second text-main text-xs font-semibold">
                                                        {t("active")}
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-600 text-xs font-semibold">
                                                        {t("inactive")}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <ViewObject
                                                        object={object}
                                                    />
                                                    <UpdateObject
                                                        changeStatus={
                                                            changeStatus
                                                        }
                                                        object={object}
                                                    />
                                                    <DeleteObject
                                                        changeStatus={
                                                            changeStatus
                                                        }
                                                        object={object}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={12}
                                            className="text-center py-4 text-gray-500 font-medium"
                                        >
                                            {t("no_objects_found")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                {objects.length > 0 && (
                                    <tr>
                                        <td colSpan={12} className="px-4 py-3">
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
                                )}
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ObjectList;
