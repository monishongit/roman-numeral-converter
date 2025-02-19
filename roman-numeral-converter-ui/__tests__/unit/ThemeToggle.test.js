import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeContext } from "../../src/context/ThemeContext"; 
import ThemeToggle from "../../src/components/ThemeToggle";
import React from "react";

describe("Theme Toggle Button Tests", () => {
  it("should switch to dark theme when dark mode button is clicked", () => {
    const mockThemeContext = {
      theme: "light",
      // Mock the setTheme function
      setTheme: jest.fn(),
    };

    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    // Select correct button by its actual label
    const darkModeButton = screen.getByRole("switch", { name: /dark mode/i });
    fireEvent.click(darkModeButton);

    expect(mockThemeContext.setTheme).toHaveBeenCalledWith("dark"); 
  });

  it("should switch to light theme when light mode button is clicked", () => {
    const mockThemeContext = {
      theme: "dark",
      setTheme: jest.fn(),
    };

    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    // Select correct button by its actual label
    const lightModeButton = screen.getByRole("switch", { name: /light mode/i });
    fireEvent.click(lightModeButton);

    expect(mockThemeContext.setTheme).toHaveBeenCalledWith("light");
  });
});