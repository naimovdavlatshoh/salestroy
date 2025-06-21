import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRef, useState } from "react";
import { PostDataTokenJson } from "@/services/data";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function AddRole({ changeStatus }: { changeStatus: () => void }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        status: false,
    });

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatusChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            status: checked,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            status: formData.status,
        };

        PostDataTokenJson("v1/role/add", payload)
            .then(() => {
                toast.success(t("added_successfully"));
                closeRef.current?.click();
                changeStatus();
                setFormData({
                    name: "",
                    status: false,
                });
            })
            .catch(() => {
                toast.error(t("add_error"));
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="p-4 h-[45px] bg-main hover:bg-main cursor-pointer">
                    {t("add_role")}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{t("add_role")}</DialogTitle>
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
                            <Label htmlFor="status">{t("active_status")}</Label>
                            <Switch
                                checked={formData.status}
                                onCheckedChange={handleStatusChange}
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
                        <Button type="submit" className="bg-main hover:bg-main">
                            {t("save")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
