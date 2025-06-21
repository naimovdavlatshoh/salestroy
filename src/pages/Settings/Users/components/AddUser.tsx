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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/sub/PasswordInput";

export function AddUser({
    changeStatus,
    roles,
}: {
    changeStatus: () => void;
    roles: { id: number; name: string }[];
}) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        login: "",
        password: "",
        confirm_password: "",
        role_id: "",
        status: false,
        is_admin: false,
    });

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            login: formData.login,
            password: formData.password,
            password_confirmation: formData.confirm_password,
            role_id: Number(formData.role_id),
            status: formData.status,
            is_admin: formData.is_admin,
        };

        PostDataTokenJson("v1/user/add", payload)
            .then(() => {
                toast.success(t("added_successfully"));
                closeRef.current?.click();
                changeStatus();
                setFormData({
                    name: "",
                    login: "",
                    password: "",
                    confirm_password: "",
                    role_id: "",
                    status: false,
                    is_admin: false,
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
                    {t("add_user")}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{t("add_user")}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">{t("full_name")}</Label>
                            <Input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="login">{t("login")}</Label>
                            <Input
                                required
                                name="login"
                                value={formData.login}
                                onChange={handleChange}
                            />
                        </div>

                        <PasswordInput
                            label={t("password")}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <PasswordInput
                            label={t("confirm_password")}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />

                        <div className="grid gap-3">
                            <Label htmlFor="role">{t("role")}</Label>
                            <Select
                                value={formData.role_id}
                                onValueChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        role_id: val,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={t("select_role")}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem
                                            key={role.id}
                                            value={String(role.id)}
                                        >
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>{t("active_status")}</Label>
                            <Switch
                                checked={formData.status}
                                onCheckedChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        status: val,
                                    }))
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>{t("is_admin")}</Label>
                            <Switch
                                checked={formData.is_admin}
                                onCheckedChange={(val) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        is_admin: val,
                                    }))
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
                                className="bg-red-600 text-white hover:text-white hover:bg-red-700"
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
