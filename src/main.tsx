/**
 * Application entry point. Mounts the React root to #root and renders App
 * inside StrictMode for development-time checks (e.g. deprecated APIs).
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
