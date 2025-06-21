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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import { GetDataSimple, PostDataTokenJson } from "@/services/data";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function AddBlock({ changeStatus }: { changeStatus: () => void }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        object_id: "",
        name: "",
        apartments_per_floor_count: "",
        status: false,
    });

    const [objects, setObjects] = useState([]);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        GetDataSimple("v1/object/list").then((res) => {
            setObjects(res.data);
        });
    }, []);

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
            object_id: Number(formData.object_id),
            name: formData.name,
            apartments_per_floor_count: Number(
                formData.apartments_per_floor_count
            ),
            status: formData.status,
        };

        PostDataTokenJson("v1/block/add", payload)
            .then(() => {
                toast.success(t("block_added_success"));
                closeRef.current?.click();
                changeStatus();
                setFormData({
                    object_id: "",
                    name: "",
                    apartments_per_floor_count: "",
                    status: false,
                });
            })
            .catch(() => {
                toast.error(t("block_add_error"));
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="p-4 h-[45px] bg-main hover:bg-main cursor-pointer"
                >
                    {t("add_block")}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{t("add_new_block")}</DialogTitle>
                    <DialogDescription>
                        {t("add_block_description")}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="object_id">{t("object")}</Label>
                            <Select
                                value={formData.object_id}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        object_id: value,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={t("select_object")}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {objects.map((obj: any) => (
                                        <SelectItem
                                            key={obj.id}
                                            value={obj.id.toString()}
                                        >
                                            {obj.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name">{t("block_name")}</Label>
                            <Input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="apartments_per_floor_count">
                                {t("apartments_per_floor")}
                            </Label>
                            <Input
                                required
                                type="number"
                                name="apartments_per_floor_count"
                                value={formData.apartments_per_floor_count}
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
