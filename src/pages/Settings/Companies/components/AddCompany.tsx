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
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { GetDataSimple, PostDataTokenJson } from "@/services/data";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function AddCompany({ changeStatus }: { changeStatus: () => void }) {
    const { t } = useTranslation();
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
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        GetDataSimple("v1/common/region/list").then((res: any) =>
            setRegions(res)
        );
    }, []);

    useEffect(() => {
        if (formData.region_id) {
            GetDataSimple(`v1/common/district/list/${formData.region_id}`).then(
                (res: any) => setDistricts(res)
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
            region_id: Number(formData.region_id),
            district_id: Number(formData.district_id),
        };

        PostDataTokenJson("v1/company/add", payload)
            .then(() => {
                toast.success(t("added_successfully"));
                closeRef.current?.click();
                changeStatus();
                setFormData({
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
            })
            .catch(() => {
                toast.error(t("add_error"));
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="p-4 h-[45px] bg-main hover:bg-main">
                    {t("add_company")}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] h-[750px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>{t("add_company")}</DialogTitle>
                    <DialogDescription>
                        {t("enter_company_details")}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Other Inputs */}
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
                                <Label htmlFor="tin">TIN</Label>
                                <Input
                                    required
                                    name="tin"
                                    value={formData.tin}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="mfo">MFO</Label>
                                <Input
                                    required
                                    name="mfo"
                                    value={formData.mfo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-1 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="oked">OKED</Label>
                                <Input
                                    name="oked"
                                    value={formData.oked}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-1 gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label>{t("region_id")}</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                region_id: value,
                                            }))
                                        }
                                        value={formData.region_id}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder={t("select_region")}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {regions.map((region) => (
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

                                <div className="grid gap-3">
                                    <Label>{t("district_id")}</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                district_id: value,
                                            }))
                                        }
                                        value={formData.district_id}
                                        disabled={!formData.region_id}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder={
                                                    formData.region_id
                                                        ? t("select_district")
                                                        : t(
                                                              "select_region_first"
                                                          )
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {districts.map((district) => (
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
