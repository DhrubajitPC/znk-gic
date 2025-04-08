import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../../test-utils";
import { AppLink } from "./AppLink";

describe("AppLink", () => {
  test("renders AppLink with children", () => {
    renderWithProviders(<AppLink to="/test">Test Link</AppLink>);
    expect(screen.getByText(/Test Link/i)).toBeInTheDocument();
  });

  test("prevents navigation and dispatches action when preventNavigation is true", () => {
    const { store } = renderWithProviders(
      <AppLink to="/test">Test Link</AppLink>,
      {
        preloadedState: {
          navigation: {
            preventNavigation: true,
            message: "Navigation is prevented",
            nextPath: "",
            showNavigationModal: false,
          },
        },
      }
    );

    const link = screen.getByText(/Test Link/i);
    fireEvent.click(link);

    const actions = store.getState().navigation;
    expect(actions).toEqual({
      preventNavigation: true,
      message: "Navigation is prevented",
      nextPath: "/test",
      showNavigationModal: true,
    });
  });

  test("allows navigation when preventNavigation is false", () => {
    const { store } = renderWithProviders(
      <AppLink to="/test">Test Link</AppLink>,
      {
        preloadedState: {
          navigation: {
            preventNavigation: false,
            message: "",
            nextPath: "",
            showNavigationModal: false,
          },
        },
      }
    );

    const link = screen.getByText(/Test Link/i);
    fireEvent.click(link);

    const actions = store.getState().navigation;
    expect(actions.showNavigationModal).toBe(false);
  });
});
