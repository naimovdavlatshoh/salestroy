import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import { PutDataTokenJson } from "@/services/data";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import type { RoleItem } from "../types";
import { useTranslation } from "react-i18next";

export function UpdateRole({
    changeStatus,
    role,
}: {
    changeStatus: () => void;
    role: RoleItem;
}) {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        status: false,
    });

    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setFormData({
            name: role.name,
            status: role.status === 1,
        });
    }, [role]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatusChange = (
        field: "status" | "is_active",
        value: boolean
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            status: formData.status ? 1 : 0,
        };

        PutDataTokenJson(`v1/role/update/${role.id}`, payload)
            .then(() => {
                toast.success(t("update.success"));
                closeRef.current?.click();
                changeStatus();
            })
            .catch(() => {
                toast.error(t("update.error"));
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="transition-all duration-300 p-2 text-amber-400 hover:bg-amber-400 cursor-pointer rounded-full hover:text-white">
                    <FiEdit size={15} />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{t("update_role")}</DialogTitle>
                    <DialogDescription>
                        {t("update.description")}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">{t("role_name")}</Label>
                            <Input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="status">{t("status")}</Label>
                            <Switch
                                checked={formData.status}
                                onCheckedChange={(val) =>
                                    handleStatusChange("status", val)
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                ref={closeRef}
                                type="button"
                                variant="outline"
                                className="bg-red-600 text-white hover:bg-red-600 hover:text-white"
                            >
                                {t("cancel")}
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-main hover:bg-main cursor-pointer"
                        >
                            {t("save")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
