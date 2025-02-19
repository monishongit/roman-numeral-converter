"use client";

import React, { createContext, useState, useEffect } from "react";

// Get base URL for RNC (Roman Numeral Converter) API
const API_BASE_URL = process.env.NEXT_PUBLIC_RNC_API_BASE_URL

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Send theme change to backend API for logging
    fetch(`${API_BASE_URL}`+"/metrics/romannumeral", {
      method: "POST",
      body: JSON.stringify({ type: "theme", message: `User switched to: ${theme}` }),
      headers: { "Content-Type": "application/json" },
    }).catch((error) => console.error("Logging error:", error));

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
