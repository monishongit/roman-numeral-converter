import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProviderWrapper, ThemeContext } from "../../src/context/ThemeContext";
import React, { useContext } from "react";

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    })
  );
});

afterEach(() => {
  // Clean up mocks after each test
  jest.restoreAllMocks();
});

// Mock component to test ThemeContext
const TestComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div>
      <p data-testid="theme-value">{theme}</p>
      <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
      <button onClick={() => setTheme("light")}>Set Light Theme</button>
    </div>
  );
};

describe("ThemeContext Tests", () => {
  it("should render light theme as the default theme", () => {
    render(
      <ThemeProviderWrapper>
        <TestComponent />
      </ThemeProviderWrapper>
    );

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
  });

  it("should allow toggling the theme to dark", async () => {
    render(
      <ThemeProviderWrapper>
        <TestComponent />
      </ThemeProviderWrapper>
    );

    const darkButton = screen.getByText("Set Dark Theme");

    await act(async () => {
      fireEvent.click(darkButton);
    });

    await screen.findByText("dark");

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");

    // Ensure fetch was called to log the theme change
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/metrics/romannumeral"),
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("should allow toggling the theme back to light", async () => {
    render(
      <ThemeProviderWrapper>
        <TestComponent />
      </ThemeProviderWrapper>
    );

    const darkButton = screen.getByText("Set Dark Theme");
    const lightButton = screen.getByText("Set Light Theme");

    // Switch theme from light to dark
    await act(async () => {
      fireEvent.click(darkButton);
    });

    await screen.findByText("dark");

    // Switch theme from dark to light
    await act(async () => {
      fireEvent.click(lightButton);
    });

    await screen.findByText("light");

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

    // Ensure fetch was called to log both theme changes
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});