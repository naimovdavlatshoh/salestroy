import { Link, useLocation } from "react-router-dom";
import { useSettingsCard } from "@/mock.ts/data";

const Settingsmenu = () => {
    const currentUrl = useLocation().pathname;
    const cards = useSettingsCard();

    return (
        <div>
            <div className="shadow-md rounded-xl  py-2 flex justify-between items-center border border-gray-200 mb-5">
                {cards?.map((card: any, idx) => (
                    <Link
                        to={card.to}
                        key={idx}
                        className={`flex items-center justify-start p-2 px-5 gap-4 w-1/4 ${
                            idx != 4 && "border-r border-dashed"
                        }`}
                    >
                        <div
                            className={`p-3 rounded-xl ${
                                currentUrl == card.to
                                    ? "bg-main/10 text-main"
                                    : "bg-gray-100 text-gray-500"
                            }  text-xl group-hover:scale-110 transition-transform duration-300`}
                        >
                            {card.icon}
                        </div>
                        <div>
                            <p>{card.label}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Settingsmenu;
