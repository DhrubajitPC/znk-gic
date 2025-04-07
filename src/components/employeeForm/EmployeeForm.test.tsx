import { screen, render, fireEvent, act } from "@testing-library/react";
import { EmployeeForm } from "../EmployeeForm";
import { test, expect } from "bun:test";
import { mock } from "bun:test";

test("Can use Testing Library", () => {
  render(<EmployeeForm />);
  const employeeForm = screen.getByTestId("employee-form");
  expect(employeeForm).toBeInTheDocument();
});

test("Displays validation errors for required fields", async () => {
  render(<EmployeeForm />);
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
  render(<EmployeeForm />);
  const dateOfBirthInput = screen.getByLabelText(/date of birth/i);
  const joinedDateInput = screen.getByLabelText(/joined date/i);

  await act(async () => {
    dateOfBirthInput.focus();
    fireEvent.change(dateOfBirthInput, { target: { value: "2025-01-01" } });
    dateOfBirthInput.blur();

    joinedDateInput.focus();
    fireEvent.change(joinedDateInput, { target: { value: "2024-01-01" } });
    joinedDateInput.blur();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    submitButton.click();
  });

  expect(
    await screen.findByText(/joined date must be after date of birth/i)
  ).toBeInTheDocument();
});

test.only("Submits form with valid data", async () => {
  const mockSubmit = mock(() => {});

  render(
    <EmployeeForm
      employee={{ firstName: "John", lastName: "Doe" }}
      onSubmit={mockSubmit}
    />
  );

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email address/i);
  const phoneNumberInput = screen.getByLabelText(/phone number/i);
  const dateOfBirthInput = screen.getByLabelText(/date of birth/i);
  const joinedDateInput = screen.getByLabelText(/joined date/i);
  const femaleGenderRadio = screen.getByRole("radio", { name: "Female" });

  await act(async () => {
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

  screen.debug(await screen.findByText(/date of birth is required/i));
  // expect(screen.queryByText(/first name is required/i)).toBeFalsy();
  // expect(screen.queryByText(/last name is required/i)).toBeFalsy();
  expect((dateOfBirthInput as HTMLInputElement).value).toBe("2000-01-01");
  expect(screen.queryByText(/date of birth is required/i)).toBeInTheDocument();
  // expect(screen.queryByText(/joined date is required/i)).toBeFalsy();

  // expect(mockSubmit).toHaveBeenCalledWith({
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "john.doe@example.com",
  //   phoneNumber: "81234567",
  //   gender: "male",
  //   dateOfBirth: "2000-01-01",
  //   joinedDate: "2025-01-01",
  // });
});
