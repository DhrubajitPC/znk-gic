import { render, screen } from "@testing-library/react";
import { EmployeeTable } from "./EmployeeTable";
import { test, expect } from "bun:test";
import { mock } from "bun:test";

const mockEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "81234567",
    gender: "male",
    dateOfBirth: "2000-01-01",
    joinedDate: "2025-01-01",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phoneNumber: "81234568",
    gender: "female",
    dateOfBirth: "1995-01-01",
    joinedDate: "2020-01-01",
  },
];

test("Renders employee table with data", () => {
  render(
    <EmployeeTable
      employees={mockEmployees}
      loading={false}
      onDelete={mock()}
    />
  );
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Jane")).toBeInTheDocument();
});

test("Displays loading state", () => {
  render(<EmployeeTable employees={[]} loading={true} onDelete={mock()} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
