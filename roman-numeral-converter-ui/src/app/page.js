"use client";

import ConverterForm from "../components/ConverterForm";
import ThemeToggle from "../components/ThemeToggle";
import { View } from "@adobe/react-spectrum";

/**
 * The main home page component for this application that renders 
 * theme toggle and numeral conversion form.
 */
export default function Home() {
    return (
    <View padding="size-200">
        <ThemeToggle />
        <ConverterForm />
    </View>
    );
}
