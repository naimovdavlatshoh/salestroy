import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLanguageOutline } from "react-icons/io5";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState(i18n.language);
    const panelRef = useRef<HTMLDivElement>(null);

    const handleChangeLanguage = (lang: "en" | "ru" | "uz") => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };

    const toggleLangMenu = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div
                className={`fixed top-4/5 right-0 transform -translate-y-1/2 z-50 transition-all duration-300 ${
                    isOpen ? "translate-x-[-60px]" : "translate-x-0"
                }`}
            >
                <button
                    onClick={toggleLangMenu}
                    className="bg-main text-white w-12 h-12 flex items-center justify-center rounded-l-full shadow hover:opacity-90 transition-all"
                    title="Tilni tanlang"
                >
                    <IoLanguageOutline size={24} />
                </button>
            </div>

            {/* Sliding Panel */}
            <div
                ref={panelRef}
                className={`fixed top-4/5 right-0 transform -translate-y-1/2 z-40 bg-white shadow-lg border-l border-t border-b border-gray-300 rounded-l-2xl transition-all duration-300 py-3 flex flex-col justify-center items-start px-2 space-y-3 ${
                    isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0 pointer-events-none"
                }`}
            >
                {["en", "ru", "uz"].map((lang) => (
                    <button
                        key={lang}
                        onClick={() =>
                            handleChangeLanguage(lang as "en" | "ru" | "uz")
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                            language === lang
                                ? "bg-main text-white"
                                : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>
        </>
    );
};

export default LanguageSwitcher;
