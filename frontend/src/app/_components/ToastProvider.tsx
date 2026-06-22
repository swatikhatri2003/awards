"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
  toastError: (message: string) => void;
  toastSuccess: (message: string) => void;
  toastInfo: (message: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = React.useState<ToastItem[]>([]);
  const [current, setCurrent] = React.useState<ToastItem | null>(null);
  const idRef = React.useRef(0);

  const enqueue = React.useCallback((message: string, variant: ToastVariant = "info") => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const item = { id: ++idRef.current, message: trimmed, variant };
    setQueue((q) => [...q, item]);
  }, []);

  React.useEffect(() => {
    if (current || queue.length === 0) return;
    setCurrent(queue[0]!);
    setQueue((q) => q.slice(1));
  }, [queue, current]);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setCurrent(null);
  };

  const value = React.useMemo<ToastContextValue>(
    () => ({
      showToast: enqueue,
      toastError: (message) => enqueue(message, "error"),
      toastSuccess: (message) => enqueue(message, "success"),
      toastInfo: (message) => enqueue(message, "info"),
    }),
    [enqueue],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={!!current}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: { xs: 16, sm: 24 } }}
      >
        {current ? (
          <Alert
            onClose={handleClose}
            severity={current.variant}
            variant="filled"
            sx={{ width: "100%", maxWidth: "min(92vw, 480px)" }}
          >
            {current.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
