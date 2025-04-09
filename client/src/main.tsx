import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply custom CSS variables
document.documentElement.style.setProperty('--primary', '#E53935');
document.documentElement.style.setProperty('--primary-dark', '#C62828');
document.documentElement.style.setProperty('--primary-light', '#FFCDD2');

createRoot(document.getElementById("root")!).render(<App />);
