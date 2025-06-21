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
    FiCheckCircle,
    FiXCircle,
    FiHome,
    FiGrid,
    FiUser,
    FiClock,
} from "react-icons/fi";
import { format } from "date-fns";
import type { BlockItem } from "../types";
import { useTranslation } from "react-i18next";

export function ViewBlock({ block }: { block: BlockItem }) {
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

            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-main">
                        {block.name}
                    </DialogTitle>
                    <DialogDescription>{t("block_details")}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-sm">
                    <InfoItem
                        icon={<FiHome />}
                        label={t("block_name")}
                        value={block.name}
                    />
                    <InfoItem
                        icon={<FiUser />}
                        label={t("object_id")}
                        value={String(block.object_id)}
                    />
                    <InfoItem
                        icon={<FiUser />}
                        label={t("company_id")}
                        value={String(block.company_id)}
                    />
                    <InfoItem
                        icon={<FiGrid />}
                        label={t("apartments_per_floor")}
                        value={String(block.apartments_per_floor_count)}
                    />
                    <InfoItem
                        icon={
                            block.status === 1 ? (
                                <FiCheckCircle className="text-green-600" />
                            ) : (
                                <FiXCircle className="text-red-600" />
                            )
                        }
                        label={t("status")}
                        value={block.status === 1 ? t("active") : t("inactive")}
                    />
                    <InfoItem
                        icon={<FiClock />}
                        label={t("created_at")}
                        value={formatDate(block.created_at)}
                    />
                    <InfoItem
                        icon={<FiClock />}
                        label={t("updated_at")}
                        value={formatDate(block.updated_at)}
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
