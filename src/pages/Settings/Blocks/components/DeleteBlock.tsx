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
import type { BlockItem } from "../types";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function DeleteBlock({
    block,
    changeStatus,
}: {
    block: BlockItem;
    changeStatus: () => void;
}) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();

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
                        {t("delete_block_title")}
                    </DialogTitle>
                    <p className="text-sm text-gray-700 font-semibold pt-2">
                        {block.name}
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
                        onClick={async () => {
                            try {
                                await DeleteData(
                                    `v1/object/delete/${block.id}`
                                );
                                toast.success(t("delete_success"));
                                changeStatus();
                                closeRef.current?.click();
                            } catch (error) {
                                toast.error(t("delete_error"));
                                console.error("Delete failed:", error);
                            }
                        }}
                        className="bg-red-600 hover:bg-red-600 cursor-pointer"
                    >
                        {t("delete")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
