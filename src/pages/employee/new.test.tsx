import { fireEvent, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { renderWithProviders } from "../../test-utils";
import { Employee } from "../../types/Employee";
import { NewEmployee } from "./new";

const newEmployee: Omit<Employee, "id"> = {
  firstName: "Jonathan",
  lastName: "Smithson",
  dateOfBirth: "1990-01-01",
  gender: "female",
  email: "john@example.com",
  joinedDate: "2023-01-01",
  phoneNumber: "62331123",
};

const server = setupServer(
  http.post("/api/employees", async () => {
    return HttpResponse.json();
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("NewEmployee", () => {
  test("renders the form correctly", () => {
    renderWithProviders(<NewEmployee />);

    expect(
      screen.getByText("Please enter new employee details:")
    ).toBeInTheDocument();
    expect(screen.getByText("Back to Employee List")).toBeInTheDocument();
  });

  test("handles successful employee creation", async () => {
    renderWithProviders(<NewEmployee />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const dateOfBirthInput = screen.getByLabelText(/date of birth/i);
    const femaleGenderRadio = screen.getByLabelText(/female/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneNumberInput = screen.getByLabelText(/phone number/i);
    const joinedDateInput = screen.getByLabelText(/joined date/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(firstNameInput, newEmployee.firstName);
    fireEvent.change(lastNameInput, newEmployee.lastName);
    fireEvent.change(dateOfBirthInput, newEmployee.dateOfBirth);
    fireEvent.click(femaleGenderRadio);
    fireEvent.change(emailInput, newEmployee.email);
    fireEvent.change(phoneNumberInput, newEmployee.phoneNumber);
    fireEvent.change(joinedDateInput, newEmployee.joinedDate);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(location.pathname).toBe("/");
    });
  });
});
