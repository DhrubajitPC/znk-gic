import "@testing-library/jest-dom";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import { employeeMock } from "./fixtures/employeeMock.fixture";
import { setupStore } from "./store/store";
import { renderWithProviders } from "./test-utils";
import { employeeApi } from "./features/employee/api/employeeApi";

// Create an initial store with mocked API endpoints
const createStoreWithApi = (preloadedState = {}) => {
  const store = setupStore(preloadedState);
  
  // Inject mocked endpoints
  store.dispatch(
    employeeApi.util.upsertQueryData("getEmployees", undefined, employeeMock)
  );
  
  return store;
};

const renderApp = (preloadedState = {}) => {
  const store = createStoreWithApi(preloadedState);
  return renderWithProviders(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    { store }
  );
};

describe("App", () => {
  test("renders the root layout with header", async () => {
    renderApp();
    await waitFor(() => {
      expect(
        screen.getByText("Employee Management System")
      ).toBeInTheDocument();
    });
  });

  test("shows navigation modal when there are unsaved changes", async () => {
    const { store } = renderApp();

    store.dispatch({
      type: "navigation/setNavigation",
      payload: {
        preventNavigation: true,
        message: "You have unsaved changes",
        nextPath: "/some-path",
        showNavigationModal: true,
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Unsaved Changes")).toBeInTheDocument();
      expect(screen.getByText("You have unsaved changes")).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText("OK"));
    await waitFor(() => {
      expect(screen.queryByText("Unsaved Changes")).not.toBeInTheDocument();
    });
  });

  test("shows error modal when there is an error", async () => {
    const { store } = renderApp();

    store.dispatch({
      type: "error/setError",
      payload: {
        showError: true,
        errorMessage: "Something went wrong",
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Uh Oh!")).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText("OK"));
    await waitFor(() => {
      expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
    });
  });

  test("handles API errors correctly", async () => {
    const store = setupStore();
    
    // Simulate error state directly
    store.dispatch({
      type: `${employeeApi.reducerPath}/executeQuery/rejected`,
      meta: {
        arg: {
          endpointName: "getEmployees",
          originalArgs: undefined,
        },
      },
      payload: { status: 500, data: null },
      error: { message: "Error fetching employees" },
    });

    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      { store }
    );

    await waitFor(() => {
      expect(screen.getByText("Error fetching employees")).toBeInTheDocument();
    });
  });
});
