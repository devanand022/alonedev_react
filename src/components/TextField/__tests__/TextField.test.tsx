import React from "react";
import TextField from "../TextField";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

let renderComponent: (props?: Record<string, unknown>) => void;

beforeEach(() => {
  renderComponent = (props = {}) => {
    render(<TextField id="name" name="name" {...props} />);
  };
});

test("Should render the TextField component", () => {
  renderComponent({ inputHelper: "Name" });
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
});

test("Checking the required field if the required is true", () => {
  renderComponent({ inputHelper: "Name", required: true });
  const input = screen.getByLabelText("Name *");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "test" } });
  expect(input).toHaveValue("test");
  expect(screen.queryByText("Required Field.")).not.toBeInTheDocument();
  fireEvent.change(input, { target: { value: "" } });
  expect(screen.getByText("Required Field.")).toBeInTheDocument();
});

test("Checking the Email input type", () => {
  renderComponent({ inputHelper: "Email", required: true });
  const input = screen.getByLabelText("Email *");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "test" } });
  expect(
    screen.getByText(
      "Invalid entry. Eamil must be in the format of 'user@example.com'."
    )
  ).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "test@gamil.com" } });
  expect(
    screen.queryByText(
      "Invalid entry. Eamil must be in the format of 'user@example.com'."
    )
  ).not.toBeInTheDocument();
});

test("Checking the Phone input type", () => {
  renderComponent({ inputHelper: "Mobile", required: true });
  const input = screen.getByLabelText("Phone Number *");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "012345" } });
  expect(
    screen.getByText("Invalid entry. Phone number must have 10 digit.")
  ).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "6358987889" } });
   expect(
     screen.queryByText("Invalid entry. Phone number must have 10 digit.")
   ).not.toBeInTheDocument();
});

test("Should fire the external onChange event when the value change", () => {
  const onChangeFunction = jest.fn();
  const events = {
    onChange: () => {
      onChangeFunction();
    }
  }
  renderComponent({inputHelper: "Name", required: true, events: events});
  fireEvent.change(screen.getByLabelText("Name *"), {
    target: {value: "test"}
  });
  expect(onChangeFunction).toHaveBeenCalled();
})
