import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ConverterForm from "../../src/components/ConverterForm";
import React from "react";

// Mock axios for API testing
jest.mock("axios"); 

describe("Cross-Site Scripting (XSS) Prevention Tests", () => {
  
  // Per current requirement only 4 character input is allowed to enter. 
  // However if requirement change to allow for even more character then 
  // this test would make more sense as the user could try to inject cross-site scripts.

  it("should not render script tags when input contains XSS attack", async () => {
    const xssPayload = "<script>alert('XSS')</script>";
    
    render(<ConverterForm />);

    const inputField = screen.getByLabelText(/enter a number/i);
    const submitButton = screen.getByRole("button", { name: /convert to roman numeral/i });

    fireEvent.change(inputField, { target: { value: xssPayload } });
    fireEvent.click(submitButton);

    // Match the exact error message displayed in the UI
    await waitFor(() => {
      expect(screen.getByText("Please enter a number between 1 and 3999.", { exact: false })).toBeInTheDocument();
      // Ensure the XSS payload is not executed or rendered in the DOM
      expect(screen.queryByText(xssPayload)).not.toBeInTheDocument();
    });
  });
});
