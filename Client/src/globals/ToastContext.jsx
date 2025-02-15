import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  // Function to show a toast
  const showToast = useCallback(
    (message, type, link, btnText, duration, position) => {
      setToast({ message, type, link, btnText, duration, position });
    },
    []
  );

  // Function to hide the toast
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (toast?.duration) {
      const timer = setTimeout(() => {
        hideToast();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Render the Toast component if there is a toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          link={toast.link}
          btnText={toast.btnText}
          duration={toast.duration}
          position={toast.position}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use the ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
