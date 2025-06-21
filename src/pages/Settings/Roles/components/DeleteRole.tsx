import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { FiTrash } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { DeleteData } from "@/services/data";
import type { RoleItem } from "../types";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function DeleteRole({
    object,
    changeStatus,
}: {
    object: RoleItem;
    changeStatus: () => void;
}) {
    const { t } = useTranslation();
    const closeRef = useRef<HTMLButtonElement>(null);

    const handleDelete = async () => {
        try {
            await DeleteData(`v1/role/delete/${object.id}`);
            toast.success(t("delete_success"));
            changeStatus();
            closeRef.current?.click();
        } catch (error) {
            toast.error(t("delete_error"));
            console.error("Delete failed:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="transition-all duration-300 p-2 text-red-500 hover:bg-red-500 cursor-pointer rounded-full hover:text-white">
                    <FiTrash size={15} />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-normal text-black">
                        {t("delete_confirm")}
                    </DialogTitle>
                    <p className="mt-2 text-main font-semibold">
                        {object.name}
                    </p>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            ref={closeRef}
                            type="button"
                            variant="outline"
                            className="bg-main text-white hover:bg-main hover:text-white"
                        >
                            {t("cancel")}
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-600 cursor-pointer"
                    >
                        {t("delete")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
