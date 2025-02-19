"use client";

import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Provider as SpectrumProvider, defaultTheme, darkTheme } from "@adobe/react-spectrum";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  const [mounted, setMounted] = useState(false);

  // Render this component only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <SpectrumProvider theme={theme === "dark" ? darkTheme : defaultTheme} colorScheme={theme}>
      {children}
    </SpectrumProvider>
  );
};

export default ThemeProvider;
