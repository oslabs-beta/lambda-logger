import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Credentials from "../client/components/Credentials";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Credentials />", () => {
  const mockSetAccessKey = jest.fn();
  const mockSetSecretKey = jest.fn();
  const mockProps = {
    setAccessKey: mockSetAccessKey,
    setSecretKey: mockSetSecretKey,
  };

  it("renders without crashing", () => {
    const { getByTestId } = render(
      <Router>
        <Credentials {...mockProps} />
      </Router>
    );
    expect(getByTestId("Region Options")).toBeInTheDocument();
  });

  it("updates access key on change", () => {
    const { getByLabelText } = render(
      <Router>
        <Credentials {...mockProps} />
      </Router>
    );
    fireEvent.change(getByLabelText(/Access Key/i), {
      target: { value: "test-access-key" },
    });
    expect(mockSetAccessKey).toHaveBeenCalledWith("test-access-key");
  });
});
