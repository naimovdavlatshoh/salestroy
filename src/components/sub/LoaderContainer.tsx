import { Loader2Icon } from "lucide-react";

const LoaderContainer = () => {
    return (
        <div className="p-4 overflow-auto h-[500px] w-full flex justify-center items-center text-main">
            <Loader2Icon size={40} className="animate-spin" />
        </div>
    );
};

export default LoaderContainer;
