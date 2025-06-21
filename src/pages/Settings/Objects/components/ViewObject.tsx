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
    FiMapPin,
    FiCalendar,
    FiCheckCircle,
    FiXCircle,
    FiLayers,
    FiColumns,
    FiClock,
    FiHome,
} from "react-icons/fi";
import { format } from "date-fns";
import type { ObjectItem } from "../types";
import { useTranslation } from "react-i18next";

export function ViewObject({ object }: { object: ObjectItem }) {
    const { t } = useTranslation();

    const formatDate = (date: string) => {
        return format(new Date(date), "dd.MM.yyyy HH:mm");
    };

    const formatOnlyDate = (date: string) => {
        return format(new Date(date), "dd.MM.yyyy");
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
                        🏢 {object.name}
                    </DialogTitle>
                    <DialogDescription>
                        {t("view.description")}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-sm">
                    <InfoItem
                        icon={<FiHome />}
                        label={t("formview.name")}
                        value={object.name}
                    />
                    <InfoItem
                        icon={<FiMapPin />}
                        label={t("formview.address")}
                        value={object.address}
                        full
                    />
                    <InfoItem
                        icon={<FiMapPin />}
                        label={t("formview.region")}
                        value={String(object.region_id)}
                    />
                    <InfoItem
                        icon={<FiMapPin />}
                        label={t("formview.district")}
                        value={String(object.district_id)}
                    />
                    <InfoItem
                        icon={<FiCalendar />}
                        label={t("formview.start_date")}
                        value={formatOnlyDate(object.start_date)}
                    />
                    <InfoItem
                        icon={<FiCalendar />}
                        label={t("formview.end_date")}
                        value={formatOnlyDate(object.end_date)}
                    />
                    <InfoItem
                        icon={<FiLayers />}
                        label={t("formview.floors")}
                        value={String(object.floor_count)}
                    />
                    <InfoItem
                        icon={<FiColumns />}
                        label={t("formview.blocks")}
                        value={String(object.block_count)}
                    />
                    <InfoItem
                        icon={
                            object.status === 1 ? (
                                <FiCheckCircle className="text-green-600" />
                            ) : (
                                <FiXCircle className="text-red-600" />
                            )
                        }
                        label={t("formview.status")}
                        value={
                            object.status === 1
                                ? t("statusobject.active")
                                : t("statusobject.inactive")
                        }
                    />
                    <InfoItem
                        icon={<FiClock />}
                        label={t("formview.created_at")}
                        value={formatDate(object.created_at)}
                    />
                    <InfoItem
                        icon={<FiClock />}
                        label={t("formview.updated_at")}
                        value={formatDate(object.updated_at)}
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
