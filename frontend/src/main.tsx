import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import SnippetsPage from "./pages/SnippetsPage.jsx"
import './index.css'

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SnippetsPage />
    </StrictMode>
)