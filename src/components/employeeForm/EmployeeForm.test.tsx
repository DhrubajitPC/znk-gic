import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { expect, test, vi } from "vitest";
import { Employee } from "../../types/Employee";
import { EmployeeForm } from "./EmployeeForm";

const employeeData: Omit<Employee, "id"> = {
  firstName: "Jonathan",
  lastName: "Smithson",
  dateOfBirth: "1990-01-01",
  gender: "female",
  email: "john@example.com",
  joinedDate: "1980-01-01",
  phoneNumber: "88213322",
};

const component = (
  <BrowserRouter>
    <EmployeeForm />
  </BrowserRouter>
);
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: () => ({ employeeId: "1" }),
    useLocation: () => ({
      pathname: "/employee/new",
    }),
  };
});
test("Can render form", () => {
  render(component);
  const employeeForm = screen.getByTestId("employee-form");
  expect(employeeForm).toBeInTheDocument();
});

test("Displays validation errors for required fields", async () => {
  render(component);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  submitButton.click();

  expect(
    await screen.findByText(/first name is required/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  expect(
    await screen.findByText(/phone number is required/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/gender is required/i)).toBeInTheDocument();
  expect(
    await screen.findByText(/date of birth is required/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/joined date is required/i)
  ).toBeInTheDocument();
});

test("Validates joined date is after date of birth", async () => {
  render(
    <BrowserRouter>
      <EmployeeForm employee={{ ...employeeData, id: "" }} />
    </BrowserRouter>
  );
  const submitButton = screen.getByRole("button", { name: /submit/i });
  fireEvent.click(submitButton);
  expect(
    await screen.findByText(/joined date must be after date of birth/i)
  ).toBeInTheDocument();
});
