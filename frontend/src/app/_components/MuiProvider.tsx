"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
      dark: "#1d4ed8",
    },
    success: {
      main: "#059669",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});

export function MuiProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <div className="appRoot">{children}</div>
        </ToastProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
