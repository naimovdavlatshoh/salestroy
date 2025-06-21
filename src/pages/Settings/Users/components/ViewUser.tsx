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
    FiClock,
    FiUser,
    FiLock,
    FiShield,
} from "react-icons/fi";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import type { UserData } from "../types";

export function ViewUser({ user }: { user: UserData }) {
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

            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-main">
                        {user.name}
                    </DialogTitle>
                    <DialogDescription>{t("view_user")}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-sm">
                    {/* <InfoItem
                        icon={<FiKey />}
                        label={t("id")}
                        value={String(user.id)}
                    /> */}
                    <InfoItem
                        icon={<FiUser />}
                        label={t("full_name")}
                        value={user.name}
                    />
                    <InfoItem
                        icon={<FiLock />}
                        label={t("login")}
                        value={user.login}
                    />
                    <InfoItem
                        icon={<FiShield />}
                        label={t("role_id")}
                        value={String(user.role_id)}
                    />

                    <InfoItem
                        icon={
                            user.status === 1 ? (
                                <FiCheckCircle className="text-green-600" />
                            ) : (
                                <FiXCircle className="text-red-600" />
                            )
                        }
                        label={t("status")}
                        value={
                            user.status === 1
                                ? t("statusobject.active")
                                : t("statusobject.inactive")
                        }
                    />

                    <InfoItem
                        icon={
                            user.is_admin === 1 ? (
                                <FiCheckCircle className="text-green-600" />
                            ) : (
                                <FiXCircle className="text-red-600" />
                            )
                        }
                        label={t("is_admin")}
                        value={user.is_admin === 1 ? t("yes") : t("no")}
                    />

                    <InfoItem
                        icon={
                            user.is_active === 1 ? (
                                <FiCheckCircle className="text-green-600" />
                            ) : (
                                <FiXCircle className="text-red-600" />
                            )
                        }
                        label={t("is_active")}
                        value={user.is_active === 1 ? t("yes") : t("no")}
                    />

                    <InfoItem
                        icon={<FiClock />}
                        label={t("created_at")}
                        value={formatDate(user.created_at)}
                    />
                    <InfoItem
                        icon={<FiClock />}
                        label={t("updated_at")}
                        value={formatDate(user.updated_at)}
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
