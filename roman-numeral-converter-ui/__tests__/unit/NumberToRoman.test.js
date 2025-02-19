import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ConverterForm from "../../src/components/ConverterForm";
import React from "react";

// Mock axios for API testing
jest.mock("axios");

describe("Number to Roman Numeral Converter Tests", () => {
  it("should allow user to input a number", () => {
    render(<ConverterForm />);

    const inputField = screen.getByLabelText(/enter a number/i);
    fireEvent.change(inputField, { target: { value: "10" } });

    // Ensure input updates
    expect(inputField.value).toBe("10"); 
  });

  it("should call API and display response when button is clicked", async () => {
    const responseData = { output: "X" };
    axios.get.mockResolvedValue({ data: responseData });

    render(<ConverterForm />);

    const inputField = screen.getByLabelText(/enter a number/i);
    const submitButton = screen.getByRole("button", { name: /convert to roman numeral/i });

    fireEvent.change(inputField, { target: { value: "10" } });
    fireEvent.click(submitButton);

    // Ensure the response is rendered correctly by checking for exact text that holds the result
    await waitFor(() => {
      expect(screen.getByText("X", { exact: false })).toBeInTheDocument();
    });
  });

  it("should show an error if input is a letter", async () => {
    render(<ConverterForm />);

    const inputField = screen.getByLabelText(/enter a number/i);
    const submitButton = screen.getByRole("button", { name: /convert to roman numeral/i });

    fireEvent.change(inputField, { target: { value: "invalid input" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please enter a number between 1 and 3999.", { exact: false })).toBeInTheDocument();
    });
  });

  it("should show an error if input is more than 3999", async () => {
    render(<ConverterForm />);

    const inputField = screen.getByLabelText(/enter a number/i);
    const submitButton = screen.getByRole("button", { name: /convert to roman numeral/i });

    fireEvent.change(inputField, { target: { value: "4000" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please enter a number between 1 and 3999.", { exact: false })).toBeInTheDocument();
    });
  });

  it("should show an error if input is less than 1", async () => {
    render(<ConverterForm />);

    const inputField = screen.getByLabelText(/enter a number/i);
    const submitButton = screen.getByRole("button", { name: /convert to roman numeral/i });

    fireEvent.change(inputField, { target: { value: "0" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please enter a number between 1 and 3999.", { exact: false })).toBeInTheDocument();
    });
  });

  it("should show an error if input is negative number", async () => {
    render(<ConverterForm />);

    const inputField = screen.getByLabelText(/enter a number/i);
    const submitButton = screen.getByRole("button", { name: /convert to roman numeral/i });

    fireEvent.change(inputField, { target: { value: "-10" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please enter a number between 1 and 3999.", { exact: false })).toBeInTheDocument();
    });
  });

  it("should show an error if input is special characters", async () => {
    render(<ConverterForm />);

    const inputField = screen.getByLabelText(/enter a number/i);
    const submitButton = screen.getByRole("button", { name: /convert to roman numeral/i });

    fireEvent.change(inputField, { target: { value: "%$#$" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Please enter a number between 1 and 3999.", { exact: false })).toBeInTheDocument();
    });
  });
});
