"use client";

import React from "react";
import { StoreProvider } from "@/redux/store";
import { ThemeProvider } from "./theme-provider";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StoreProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
};
