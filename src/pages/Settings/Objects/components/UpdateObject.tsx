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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { GetDataSimple, PutDataTokenJson } from "@/services/data";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import type { ObjectItem } from "../types";
import { useTranslation } from "react-i18next";

export function UpdateObject({
    changeStatus,
    object,
}: {
    changeStatus: () => void;
    object: ObjectItem;
}) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        company_id: "",
        region_id: "",
        district_id: "",
        address: "",
        start_date: "",
        end_date: "",
        floor_count: "",
        block_count: "",
        status: false,
    });
    const [companies, setCompanies] = useState([]);
    const [regions, setRegions] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        GetDataSimple("v1/company/list").then((res) => setCompanies(res.data));
        GetDataSimple("v1/common/region/list").then((res) => setRegions(res));

        setFormData({
            name: object.name,
            company_id: String(object.company_id),
            region_id: String(object.region_id),
            district_id: String(object.district_id),
            address: object.address,
            start_date: object.start_date,
            end_date: object.end_date,
            floor_count: String(object.floor_count),
            block_count: String(object.block_count),
            status: object.status === 1,
        });
    }, [object]);

    useEffect(() => {
        if (formData.region_id) {
            GetDataSimple(`v1/common/district/list/${formData.region_id}`).then(
                (res) => setDistricts(res)
            );
        } else {
            setDistricts([]);
            setFormData((prev) => ({ ...prev, district_id: "" }));
        }
    }, [formData.region_id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, status: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            company_id: Number(formData.company_id),
            region_id: Number(formData.region_id),
            district_id: Number(formData.district_id),
            floor_count: Number(formData.floor_count),
            block_count: Number(formData.block_count),
        };

        PutDataTokenJson(`v1/object/update/${object.id}`, payload)
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

            <DialogContent className="sm:max-w-[700px] h-[750px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>{t("update.title")}</DialogTitle>
                    <DialogDescription>
                        {t("update.description")}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">{t("formobject.name")}</Label>
                            <Input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="company_id">
                                    {t("formobject.company")}
                                </Label>
                                <Select
                                    value={formData.company_id}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            company_id: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={t(
                                                "formobject.select_company"
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companies.map((item: any) => (
                                            <SelectItem
                                                key={item.id}
                                                value={item.id.toString()}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="region_id">
                                    {t("formobject.region")}
                                </Label>
                                <Select
                                    value={formData.region_id}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            region_id: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={t(
                                                "formobject.select_region"
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map((region: any) => (
                                            <SelectItem
                                                key={region.id}
                                                value={String(region.id)}
                                            >
                                                {region.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="district_id">
                                    {t("formobject.district")}
                                </Label>
                                <Select
                                    value={formData.district_id}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            district_id: value,
                                        }))
                                    }
                                    disabled={!formData.region_id}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={
                                                formData.region_id
                                                    ? t(
                                                          "formobject.select_district"
                                                      )
                                                    : t(
                                                          "formobject.select_region_first"
                                                      )
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districts.map((district: any) => (
                                            <SelectItem
                                                key={district.id}
                                                value={String(district.id)}
                                            >
                                                {district.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="floor_count">
                                    {t("formobject.floors")}
                                </Label>
                                <Input
                                    required
                                    type="number"
                                    name="floor_count"
                                    value={formData.floor_count}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="block_count">
                                    {t("formobject.blocks")}
                                </Label>
                                <Input
                                    required
                                    type="number"
                                    name="block_count"
                                    value={formData.block_count}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="start_date">
                                    {t("formobject.start_date")}
                                </Label>
                                <Input
                                    required
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="end_date">
                                {t("formobject.end_date")}
                            </Label>
                            <Input
                                required
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="address">
                                {t("formobject.address")}
                            </Label>
                            <Textarea
                                required
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="status">
                                {t("formobject.status")}
                            </Label>
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
                                className="bg-red-600 text-white hover:bg-red-600"
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
