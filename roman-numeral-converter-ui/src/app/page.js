"use client";

import ConverterForm from "../components/ConverterForm";
import ThemeToggle from "../components/ThemeToggle";
import { View } from "@adobe/react-spectrum";

export default function Home() {
  return (
    <View padding="size-200">
      <ThemeToggle />
      <ConverterForm />
    </View>
  );
}
