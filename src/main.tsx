import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PageTitleProvider } from "./lib/PageTitleContext";
import { Toaster } from "react-hot-toast";
import "./i18n";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <PageTitleProvider>

                <App />
                <Toaster position="top-right" reverseOrder={false} />
            </PageTitleProvider>
        </BrowserRouter>
    </StrictMode>
);
