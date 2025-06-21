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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { FiEdit } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { PutDataTokenJson, GetDataSimple } from "@/services/data";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import type { Company } from "../types";

export function UpdateCompany({
    company,
    changeStatus,
}: {
    company: Company;
    changeStatus: () => void;
}) {
    const { t } = useTranslation();
    const closeRef = useRef<HTMLButtonElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        director_name: "",
        phone_number: "",
        bank_name: "",
        tin: "",
        mfo: "",
        oked: "",
        account_number: "",
        region_id: "",
        district_id: "",
        address: "",
        status: false,
    });

    const [regions, setRegions] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);

    // Set initial form data
    useEffect(() => {
        setFormData({
            name: company.name ?? "",
            director_name: company.director_name ?? "",
            phone_number: company.phone_number ?? "",
            bank_name: company.bank_name ?? "",
            tin: company.tin ?? "",
            mfo: company.mfo ?? "",
            oked: company.oked ?? "",
            account_number: company.account_number ?? "",
            region_id: String(company.region_id ?? ""),
            district_id: "", // Will be set after districts are loaded
            address: company.address ?? "",
            status: company.status === 1,
        });
    }, [company]);

    // Load regions
    useEffect(() => {
        GetDataSimple("v1/common/region/list").then(setRegions);
    }, []);

    // Load districts when region_id changes
    useEffect(() => {
        if (formData.region_id) {
            GetDataSimple(`v1/common/district/list/${formData.region_id}`).then(
                (res) => {
                    setDistricts(res);
                    const match = res.find(
                        (d: any) => String(d.id) === String(company.district_id)
                    );
                    if (match) {
                        setFormData((prev) => ({
                            ...prev,
                            district_id: String(match.id),
                        }));
                    } else {
                        setFormData((prev) => ({
                            ...prev,
                            district_id: "",
                        }));
                    }
                }
            );
        } else {
            setDistricts([]);
            setFormData((prev) => ({ ...prev, district_id: "" }));
        }
    }, [formData.region_id, company.district_id]);

    // Input change handler
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (checked: boolean) =>
        setFormData((prev) => ({ ...prev, status: checked }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            region_id: Number(formData.region_id),
            district_id: Number(formData.district_id),
            status: formData.status,
        };
        PutDataTokenJson(`v1/company/update/${company.id}`, payload)
            .then(() => {
                toast.success(t("updated_successfully"));
                closeRef.current?.click();
                changeStatus();
            })
            .catch(() => toast.error(t("update_error")));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="p-2 text-amber-500 rounded-full hover:bg-amber-400 hover:text-white">
                    <FiEdit size={15} />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t("update_company_title")}</DialogTitle>
                    <DialogDescription>
                        {t("update_company_description")}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Inputs */}
                        <div className="grid gap-3">
                            <Label htmlFor="name">{t("company_name")}</Label>
                            <Input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="director_name">
                                    {t("director")}
                                </Label>
                                <Input
                                    required
                                    name="director_name"
                                    value={formData.director_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phone_number">
                                    {t("phone")}
                                </Label>
                                <Input
                                    required
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="bank_name">{t("bank")}</Label>
                                <Input
                                    required
                                    name="bank_name"
                                    value={formData.bank_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="account_number">
                                    {t("account_number")}
                                </Label>
                                <Input
                                    required
                                    name="account_number"
                                    value={formData.account_number}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="tin">{t("tin")}</Label>
                                <Input
                                    required
                                    name="tin"
                                    value={formData.tin}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="mfo">{t("mfo")}</Label>
                                <Input
                                    required
                                    name="mfo"
                                    value={formData.mfo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="oked">{t("oked")}</Label>
                            <Input
                                name="oked"
                                value={formData.oked}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Region and District */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label>{t("region_id")}</Label>
                                <Select
                                    value={formData.region_id}
                                    onValueChange={(v) =>
                                        setFormData((p) => ({
                                            ...p,
                                            region_id: v,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={t("select_region")}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {regions.map((r) => (
                                            <SelectItem
                                                key={r.id}
                                                value={String(r.id)}
                                            >
                                                {r.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label>{t("district_id")}</Label>
                                <Select
                                    value={formData.district_id}
                                    onValueChange={(v) =>
                                        setFormData((p) => ({
                                            ...p,
                                            district_id: v,
                                        }))
                                    }
                                    disabled={!formData.region_id}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={
                                                formData.region_id
                                                    ? t("select_district")
                                                    : t("select_region_first")
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districts.map((d) => (
                                            <SelectItem
                                                key={d.id}
                                                value={String(d.id)}
                                            >
                                                {d.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="address">{t("address")}</Label>
                            <Textarea
                                required
                                name="address"
                                value={formData.address}
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
