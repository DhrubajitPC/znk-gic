import { render, screen } from "@testing-library/react";
import { EmployeeListing } from "./listing";
import { test, expect, beforeEach, describe } from "vitest";
import { setupStore } from "../../store/store";
import { server } from "../../test-setup";
import { http, HttpResponse } from "msw";
import { employeeMock } from "../../fixtures/employeeMock.fixture";
import { renderWithProviders } from "../../test-utils";

const store = setupStore();

describe("Employee Listing", () => {
  beforeEach(() => {
    server.use(
      http.get("http://localhost:3000/employees", () => {
        return HttpResponse.json(employeeMock);
      })
    );
  });
  test("renders the employee listing page", () => {
    renderWithProviders(<EmployeeListing />, { store });
    expect(screen.getByText(/employees' list/i)).toBeInTheDocument();
  });

  test("should load employees", async () => {
    renderWithProviders(<EmployeeListing />, { store });
    expect(
      await screen.findByText(employeeMock[0].firstName)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(employeeMock[1].firstName)
    ).toBeInTheDocument();
  });

  test("should show add employee button", () => {
    renderWithProviders(<EmployeeListing />, { store });
    expect(screen.getByText(/add employee/i)).toBeInTheDocument();
  });
});
