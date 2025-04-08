import { act, fireEvent, render, screen } from "@testing-library/react";

import dayjs from "dayjs";
import { BrowserRouter } from "react-router";
import { expect, test, vi } from "vitest";
import { employeeMock } from "../../fixtures/employeeMock.fixture";
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

test.skip("Validates joined date is after date of birth", async () => {
  render(component);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const phoneNumberInput = screen.getByLabelText(/phone number/i);
  const dateOfBirthInput = screen.getByLabelText(/date of birth/i);
  const joinedDateInput = screen.getByLabelText(/joined date/i);
  const femaleGenderRadio = screen.getByRole("radio", { name: "Female" });
  const submitButton = screen.getByRole("button", { name: /submit/i });

  act(() => {
    fireEvent.change(firstNameInput, { target: { value: "Joanathan" } });
    fireEvent.change(lastNameInput, { target: { value: "Renfield" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(phoneNumberInput, { target: { value: "81234567" } });
    fireEvent.click(femaleGenderRadio);

    fireEvent.change(dateOfBirthInput, {
      target: { value: dayjs("1990-01-01") },
    });
    fireEvent.blur(dateOfBirthInput);
    firstNameInput.focus();
    fireEvent.change(joinedDateInput, {
      target: { value: dayjs("1920-01-01") },
    });
    fireEvent.blur(dateOfBirthInput);

    screen.debug(dateOfBirthInput);
    screen.debug(joinedDateInput);
    // fireEvent.change(dateOfBirthInput, employeeData.dateOfBirth);
    // fireEvent.change(joinedDateInput, employeeData.joinedDate);
    fireEvent.click(submitButton);
  });

  expect(await screen.queryByText(/first name is required/i)).toBeFalsy();
  expect(await screen.queryByText(/last name is required/i)).toBeFalsy();
  expect(await screen.queryByText(/email is required/i)).toBeFalsy();
  expect(await screen.queryByText(/phone number is required/i)).toBeFalsy();
  expect(await screen.queryByText(/gender is required/i)).toBeFalsy();
  expect(await screen.queryByText(/date of birth is required/i)).toBeFalsy();
  expect(await screen.queryByText(/joined date is required/i)).toBeFalsy();
  expect(
    await screen.queryByText(/joined date must be after date of birth/i)
  ).toBeInTheDocument();
});

test.skip("Submits form with valid data", async () => {
  const mockSubmit = vi.fn();

  const employee = employeeMock[0] as Employee;
  render(
    <BrowserRouter>
      <EmployeeForm employee={employee} onSubmit={mockSubmit} />
    </BrowserRouter>
  );

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const phoneNumberInput = screen.getByLabelText(/phone number/i);
  const dateOfBirthInput = screen.getByLabelText(/date of birth/i);
  const joinedDateInput = screen.getByLabelText(/joined date/i);
  const femaleGenderRadio = screen.getByRole("radio", { name: "Female" });

  act(() => {
    fireEvent.change(firstNameInput, { target: { value: "Joanathan" } });
    fireEvent.change(lastNameInput, { target: { value: "Renfield" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(phoneNumberInput, { target: { value: "81234567" } });
    fireEvent.click(femaleGenderRadio);

    firstNameInput.focus();
    fireEvent.change(dateOfBirthInput, { target: { value: "2000-01-01" } });
    fireEvent.blur(dateOfBirthInput);
    expect((dateOfBirthInput as HTMLInputElement).value).toBe("2000-01-01");

    joinedDateInput.focus();
    fireEvent.change(joinedDateInput, { target: { value: "2025-01-01" } });
    joinedDateInput.blur();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
  });
  screen.debug(firstNameInput);
  screen.debug(lastNameInput);
  screen.debug(emailInput);
  screen.debug(phoneNumberInput);
  screen.debug(femaleGenderRadio);
  screen.debug(dateOfBirthInput);
  screen.debug(joinedDateInput);

  expect(screen.queryByText(/first name is required/i)).toBeFalsy();
  expect(screen.queryByText(/last name is required/i)).toBeFalsy();
  expect(screen.queryByText(/email is required/i)).toBeFalsy();
  expect(screen.queryByText(/phone number is required/i)).toBeFalsy();
  expect(screen.queryByText(/gender is required/i)).toBeFalsy();
  expect(screen.queryByText(/date of birth is required/i)).toBeFalsy();
  expect(screen.queryByText(/joined date is required/i)).toBeFalsy();

  // screen.debug(await screen.findByText(/date of birth is required/i));
  // expect(screen.queryByText(/first name is required/i)).toBeFalsy();
  // expect(screen.queryByText(/last name is required/i)).toBeFalsy();
  // expect((dateOfBirthInput as HTMLInputElement).value).toBe("2000-01-01");
  // expect(screen.queryByText(/date of birth is required/i)).toBeInTheDocument();
  // expect(screen.queryByText(/joined date is required/i)).toBeFalsy();

  // expect(mockSubmit).toHaveBeenCalled();

  // expect(mockSubmit).toHaveBeenCalledWith({
  //   firstName: "Jonathan",
  //   lastName: "Renfield",
  //   email: "john.doe@example.com",
  //   phoneNumber: "81234567",
  //   gender: "male",
  //   dateOfBirth: "2000-01-01",
  //   joinedDate: "2025-01-01",
  // });
});
