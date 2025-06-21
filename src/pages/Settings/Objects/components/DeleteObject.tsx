import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FiTrash } from "react-icons/fi";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { DeleteData } from "@/services/data";
import type { ObjectItem } from "../types";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function DeleteObject({
    object,
    changeStatus,
}: {
    object: ObjectItem;
    changeStatus: () => void;
}) {
    const { t } = useTranslation();
    const closeRef = useRef<HTMLButtonElement>(null);

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
                        {t("deleteobject.title")}
                    </DialogTitle>
                    <div className="text-sm text-gray-700 font-medium">
                        {object.name}
                    </div>
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
                        onClick={async () => {
                            try {
                                await DeleteData(
                                    `v1/object/delete/${object.id}`
                                );
                                toast.success(t("deleteobject.success"));
                                changeStatus();
                                closeRef.current?.click();
                            } catch (error) {
                                toast.error(t("deleteobject.error"));
                                console.error("Delete failed:", error);
                            }
                        }}
                        className="bg-red-600 hover:bg-red-600 cursor-pointer"
                    >
                        {t("deleteobject.confirm")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
