import { usePageTitle } from "@/lib/PageTitleContext";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSettingsCard } from "@/mock.ts/data";

const Settings = () => {
    const { setTitle } = usePageTitle();
    const cards = useSettingsCard();

    useEffect(() => {
        setTitle("Settings");
    }, []);

    return (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, idx) => (
                <Link
                    key={idx}
                    to={card.to}
                    className="group relative p-6 overflow-hidden rounded-3xl border border-main bg-white text-main hover:bg-second transition-all duration-300 shadow-md hover:shadow-md  transform"
                >
                    {/* Diagonal lines background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-main/10 opacity-10 pointer-events-none z-0" />

                    {/* Top ring accent */}
                    <div className="absolute -top-3 -right-3 w-16 h-16 bg-second opacity-20 rounded-full blur-2xl z-0"></div>

                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col gap-4 items-start">
                        <div className="p-3 rounded-xl bg-main/10 text-main text-xl group-hover:scale-110 transition-transform duration-300">
                            {card.icon}
                        </div>
                        <p className="text-lg font-bold tracking-wide">
                            {card.label}
                        </p>
                        <span className="text-sm opacity-70">
                            Manage {card.label.toLowerCase()}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Settings;
