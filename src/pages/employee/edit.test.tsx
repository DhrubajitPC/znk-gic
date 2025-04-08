import { fireEvent, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { employeeMock } from "../../fixtures/employeeMock.fixture";
import { setupStore } from "../../store/store";
import { server } from "../../test-setup";
import { renderWithProviders } from "../../test-utils";
import { EditEmployee } from "./edit";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ employeeId: "1" }),
    useLocation: () => ({
      pathname: "/employee/edit/1",
    }),
  };
});

const store = setupStore();

describe("Edit Employee", () => {
  beforeEach(() => {
    server.use(
      http.get("http://localhost:3000/employees", () => {
        return HttpResponse.json(employeeMock);
      })
    );
  });

  test("renders loading state initially", () => {
    renderWithProviders(<EditEmployee />, { store });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders edit form with employee data", async () => {
    renderWithProviders(<EditEmployee />, { store });

    await waitFor(() => {
      expect(screen.getByText(/update employee details/i)).toBeInTheDocument();
    });

    // Check if form is populated with mock data
    expect(
      screen.getByDisplayValue(employeeMock[0].firstName)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(employeeMock[0].lastName)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(employeeMock[0].email)).toBeInTheDocument();
  });

  test("shows success modal on successful update", async () => {
    server.use(
      http.put("http://localhost:3000/employees/1", () => {
        return HttpResponse.json({
          ...employeeMock[0],
          firstName: "NewName",
        });
      })
    );

    renderWithProviders(<EditEmployee />, { store });

    await waitFor(() => {
      expect(screen.getByText(/update employee details/i)).toBeInTheDocument();
    });

    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: "NewName" } });

    const submitButton = await screen.findByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/employee updated successfully/i)
      ).toBeInTheDocument();
    });
  });
});
