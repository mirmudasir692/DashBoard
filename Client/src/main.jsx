import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "../src/App/store.js";
import { Provider } from "react-redux";
import { ToastProvider } from "./globals/ToastContext.jsx";
import { SidebarProvider } from "./globals/sidebarContext.jsx";

const RootComponent = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </ToastProvider>
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);
