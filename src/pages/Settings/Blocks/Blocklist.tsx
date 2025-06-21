import React, { useEffect, useState } from "react";
import { GetDataSimple } from "@/services/data";
import { usePageTitle } from "@/lib/PageTitleContext";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { AddBlock } from "./components/AddBlock";
import { UpdateBlock } from "./components/UpdateBlock";
import { ViewBlock } from "./components/ViewBlock";
import { DeleteBlock } from "./components/DeleteBlock";
import Settingsmenu from "@/components/sub/Settingsmenu";
import type { BlockItem } from "./types";
import LoaderContainer from "@/components/sub/LoaderContainer";
import { useTranslation } from "react-i18next";
import CustomThead from "@/components/sub/CustomThead";

const ITEMS_PER_PAGE = 5;

const BlockList: React.FC = () => {
    const { t } = useTranslation();
    const [blocks, setBlocks] = useState<BlockItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const { setTitle } = usePageTitle();
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    const totalPages = Math.ceil(blocks.length / ITEMS_PER_PAGE);

    const paginatedData = blocks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setTitle(t("blocks_title"));
    }, [t]);

    useEffect(() => {
        setLoading(true);
        GetDataSimple(`v1/block/list?search=${search}`).then((res) => {
            setBlocks(res.data);
            setLoading(false);
        });
    }, [status, search]);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const changeStatus = () => {
        setStatus(!status);
    };

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
                        <AddBlock changeStatus={changeStatus} />
                    </div>

                    <div className="w-full rounded-lg overflow-hidden">
                        <table className="min-w-full text-sm text-left">
                            <CustomThead
                                columns={[
                                    "ID",
                                    t("name"),
                                    t("company_id"),
                                    t("object_id"),
                                    t("apartments_per_floor"),
                                    t("status"),
                                    t("actions"),
                                ]}
                            />

                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((block) => (
                                        <tr
                                            key={block.id}
                                            className="even:bg-gray-50 h-[60px] odd:bg-white hover:bg-gray-50 border-b"
                                        >
                                            <td className="px-4 py-3">
                                                {block.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {block.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {block.company_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {block.object_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {
                                                    block.apartments_per_floor_count
                                                }
                                            </td>
                                            <td className="px-4 py-3">
                                                {block.status === 1 ? (
                                                    <span className="inline-block px-2 py-1 rounded bg-second text-main text-xs font-semibold">
                                                        {t("active")}
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-600 text-xs font-semibold">
                                                        {t("inactive")}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 ">
                                                <div className="flex items-center gap-1">
                                                    <ViewBlock block={block} />
                                                    <UpdateBlock
                                                        changeStatus={
                                                            changeStatus
                                                        }
                                                        block={block}
                                                    />
                                                    <DeleteBlock
                                                        changeStatus={
                                                            changeStatus
                                                        }
                                                        block={block}
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
                                            {t("no_blocks_found")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                {blocks.length > 0 && (
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
                                )}
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlockList;
