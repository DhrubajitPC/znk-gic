import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { BrowserRouter } from "react-router";
import { beforeEach, describe, expect, test } from "vitest";
import { App } from "./App";
import { employeeMock } from "./fixtures/employeeMock.fixture";
import { setupStore } from "./store/store";
import { server } from "./test-setup";
import { renderWithProviders } from "./test-utils";

const renderApp = (preloadedState = {}) => {
  const store = setupStore(preloadedState);
  return renderWithProviders(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    { store }
  );
};

describe("App", () => {
  beforeEach(() => {
    // Set up the default handler for successful API calls
    server.use(
      http.get("http://localhost:3000/employees", () => {
        return HttpResponse.json(employeeMock);
      })
    );
  });

  test("renders the root layout with header", async () => {
    renderApp();
    await waitFor(() => {
      expect(
        screen.getByText("Employee Management System")
      ).toBeInTheDocument();
    });
  });
  test("handles API errors correctly", async () => {
    // Override the default handler to simulate an error
    server.use(
      http.get("http://localhost:3000/employees", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderApp();

    // Wait for the error modal to appear
    await waitFor(() => {
      expect(screen.getByText("Error fetching employees")).toBeInTheDocument();
    });
  });
});
