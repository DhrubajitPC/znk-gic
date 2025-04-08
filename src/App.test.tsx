import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, test } from "vitest";
import { App } from "./App";
import { employeeMock } from "./fixtures/employeeMock.fixture";
import { setupStore } from "./store/store";
import { server } from "./test-setup";
import { renderWithProviders } from "./test-utils";

const store = setupStore();

const renderApp = () => {
  return renderWithProviders(<App />, { store });
};

describe("App", () => {
  beforeEach(() => {
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
});
