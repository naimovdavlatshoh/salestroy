import React, { useEffect, useState } from "react";
import { GetDataSimple } from "@/services/data";
import { usePageTitle } from "@/lib/PageTitleContext";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { AddCompany } from "./components/AddCompany";
import { UpdateCompany } from "./components/UpdateCompany";
import { ViewCompany } from "./components/ViewCompany";
import { DeleteCompany } from "./components/DeleteCompany";
import type { Company } from "./types";
import Settingsmenu from "@/components/sub/Settingsmenu";
import LoaderContainer from "@/components/sub/LoaderContainer";
import { useTranslation } from "react-i18next";
import CustomThead from "@/components/sub/CustomThead";
import { useDebounce } from "@/hooks/useDebounce";

const ITEMS_PER_PAGE = 5;

const CompanyList: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const { setTitle } = usePageTitle();
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const debouncedSearch = useDebounce(search, 500);

    const totalPages = Math.ceil(companies.length / ITEMS_PER_PAGE);

    const paginatedData = companies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setTitle(t("companies"));
    }, [t]);

    useEffect(() => {
        setLoading(true);
        GetDataSimple(`v1/company/list?search=${debouncedSearch}`).then(
            (res) => {
                if (res?.success && Array.isArray(res.data)) {
                    setCompanies(res.data);
                    setLoading(false);
                }
            }
        );
    }, [status, debouncedSearch]);

    const handlePrevious = () =>
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const changeStatus = () => setStatus(!status);

    return (
        <div>
            <Settingsmenu />

            <div className="p-4 shadow-xs rounded-2xl border border-gray-200">
                <div className="flex justify-between w-full mb-5">
                    <div className="flex items-center border w-4/5 py-2 px-5 rounded-lg  hover:border-gray-800">
                        <FiSearch color="gray" size={20} className="mr-3" />
                        <input
                            placeholder={t("search")}
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
                    <AddCompany changeStatus={changeStatus} />
                </div>
                <div className="w-full rounded-lg overflow-x-scroll">
                    {loading ? (
                        <LoaderContainer />
                    ) : (
                        <table className=" w-full text-sm text-left ">
                            <CustomThead
                                columns={[
                                    { name: "ID" },
                                    { name: t("company_name") },
                                    { name: t("director") },
                                    { name: t("tin") },
                                    { name: t("phone") },
                                    { name: t("bank") },
                                    { name: t("mfo") },
                                    { name: t("account_number") },
                                    { name: t("status") },
                                    {
                                        thClassName: "text-center",
                                        name: t("action"),
                                    },
                                ]}
                            />

                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((company) => (
                                        <tr
                                            key={company.id}
                                            className="even:bg-gray-50 h-[60px] odd:bg-white hover:bg-gray-50 border-b last:border-none"
                                        >
                                            <td className="px-4 py-3 ">
                                                {company.id}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-nowrap">
                                                {company.name}
                                            </td>
                                            <td className="px-4 py-3 text-nowrap">
                                                {company.director_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {company.tin}
                                            </td>
                                            <td className="px-4 py-3">
                                                {company.phone_number}
                                            </td>
                                            <td className="px-4 py-3">
                                                {company.bank_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {company.mfo}
                                            </td>
                                            <td className="px-4 py-3">
                                                {company.account_number}
                                            </td>
                                            <td className="px-4 py-3">
                                                {company.status === 1 ? (
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
                                                <div className="flex items-center justify-center gap-1">
                                                    <ViewCompany
                                                        company={company}
                                                    />
                                                    <UpdateCompany
                                                        changeStatus={
                                                            changeStatus
                                                        }
                                                        company={company}
                                                    />
                                                    <DeleteCompany
                                                        changeStatus={
                                                            changeStatus
                                                        }
                                                        company={company}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="text-center py-4 text-gray-500 font-medium"
                                        >
                                            {t("no_companies")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                {companies.length > 0 && (
                                    <tr>
                                        <td colSpan={10} className="px-4 py-3">
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyList;
