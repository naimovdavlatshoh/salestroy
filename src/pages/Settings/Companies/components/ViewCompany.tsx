import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    FiEye,
    FiUser,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiBriefcase,
    FiCheckCircle,
    FiXCircle,
    FiCreditCard,
    FiTag,
} from "react-icons/fi";
import { format } from "date-fns";
import type { Company } from "../types";
import { useTranslation } from "react-i18next";

export function ViewCompany({ company }: { company: Company }) {
    const { t } = useTranslation();

    const formatDate = (date: string) => {
        return format(new Date(date), "dd.MM.yyyy HH:mm");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="transition-all duration-300 p-2 text-green-500 hover:bg-green-500 hover:text-white rounded-full">
                    <FiEye size={16} />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-main">
                        🏢 {company.name}
                    </DialogTitle>
                    <DialogDescription>
                        {t("company_detail_info")}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-sm">
                    <InfoItem
                        icon={<FiUser />}
                        label={t("director")}
                        value={company.director_name}
                    />
                    <InfoItem
                        icon={<FiPhone />}
                        label={t("phone")}
                        value={company.phone_number}
                    />
                    <InfoItem
                        icon={<FiBriefcase />}
                        label={t("tin")}
                        value={company.tin}
                    />
                    <InfoItem
                        icon={<FiCreditCard />}
                        label={t("account_number")}
                        value={company.account_number}
                    />
                    <InfoItem
                        icon={<FiTag />}
                        label={t("oked")}
                        value={company.oked}
                    />
                    <InfoItem
                        icon={<FiTag />}
                        label={t("mfo")}
                        value={company.mfo}
                    />
                    <InfoItem
                        icon={<FiBriefcase />}
                        label={t("bank_name")}
                        value={company.bank_name}
                    />
                    <InfoItem
                        icon={<FiMapPin />}
                        label={t("region_id")}
                        value={String(company.region_id)}
                    />
                    <InfoItem
                        icon={<FiMapPin />}
                        label={t("district_id")}
                        value={String(company.district_id)}
                    />
                    <InfoItem
                        icon={<FiMapPin />}
                        label={t("address")}
                        value={company.address}
                        full
                    />
                    <InfoItem
                        icon={
                            company.status === 1 ? (
                                <FiCheckCircle className="text-green-600" />
                            ) : (
                                <FiXCircle className="text-red-600" />
                            )
                        }
                        label={t("status")}
                        value={
                            company.status === 1 ? t("active") : t("inactive")
                        }
                    />
                    <InfoItem
                        icon={<FiCalendar />}
                        label={t("created_at")}
                        value={formatDate(company.created_at)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

const InfoItem = ({
    icon,
    label,
    value,
    full = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    full?: boolean;
}) => (
    <div
        className={`flex flex-col gap-1 p-4 border rounded-xl shadow-sm bg-white ${
            full ? "md:col-span-2" : ""
        }`}
    >
        <div className="flex items-center text-gray-500 gap-2 text-sm font-medium mb-1">
            {icon}
            <span>{label}</span>
        </div>
        <div className="text-gray-900 font-semibold break-words">{value}</div>
    </div>
);
