import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface PageTitleContextType {
    title: string;
    setTitle: (newTitle: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(
    undefined
);

export const usePageTitle = () => {
    const context = useContext(PageTitleContext);
    if (!context) {
        throw new Error("usePageTitle must be used within PageTitleProvider");
    }
    return context;
};

export const PageTitleProvider = ({ children }: { children: ReactNode }) => {
    const [title, setTitle] = useState("");

    return (
        <PageTitleContext.Provider value={{ title, setTitle }}>
            {children}
        </PageTitleContext.Provider>
    );
};
