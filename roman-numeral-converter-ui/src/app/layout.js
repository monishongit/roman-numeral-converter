"use client";

import { useEffect } from "react";
import { ThemeProviderWrapper } from "../context/ThemeContext";
import ThemeProvider from "../components/ThemeProvider";
import { reportWebVitals } from "../reportWebVitals";
import "@/app/globals.css";  

/**
 * This is the root layout component for this application.
 */
export default function RootLayout({ children }) {
    useEffect(() => {
        reportWebVitals(console.log);
    }, []);

    return (
        <html lang="en">
            <head>
            <title>Roman Numeral Converter</title>
            </head>
            <body>
            <ThemeProviderWrapper>
                <ThemeProvider>{children}</ThemeProvider>
            </ThemeProviderWrapper>
            </body>
        </html>
    );
}
