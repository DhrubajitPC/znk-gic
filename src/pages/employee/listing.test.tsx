import { render, screen } from "@testing-library/react";
import { EmployeeListing } from "./listing";
import { test, expect } from "bun:test";

test("Renders employee listing page", () => {
  render(<EmployeeListing />);
  expect(screen.getByText(/employees' list/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /add employee/i })
  ).toBeInTheDocument();
});
