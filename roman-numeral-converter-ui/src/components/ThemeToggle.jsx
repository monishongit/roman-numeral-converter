"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { View, Switch } from "@adobe/react-spectrum";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <View position="fixed" top="size-100" right="size-200" zIndex={1000}>
      <Switch
        isSelected={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        id = "toggle-btn"
        UNSAFE_className="theme-switch"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </Switch>
    </View>
  );
};

export default ThemeToggle;