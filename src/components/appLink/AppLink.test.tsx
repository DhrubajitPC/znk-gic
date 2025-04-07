import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppLink } from "./AppLink";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { test, expect } from "bun:test";
import { setNavigation } from "../../store/store";

const mockStore = configureStore([]);

const mockDispatch = Bun.mock.fn();

beforeEach(() => {
  mockDispatch.mockClear();
});

test("Renders AppLink with children", () => {
  const store = mockStore({
    navigation: {
      preventNavigation: false,
      message: "",
      nextPath: "",
      showNavigationModal: false,
    },
  });

  store.dispatch = mockDispatch;

  render(
    <Provider store={store}>
      <AppLink to="/test">Test Link</AppLink>
    </Provider>
  );

  expect(screen.getByText(/Test Link/i)).toBeTruthy();
});

test("Prevents navigation and dispatches action when preventNavigation is true", () => {
  const store = mockStore({
    navigation: {
      preventNavigation: true,
      message: "Navigation is prevented",
      nextPath: "",
      showNavigationModal: false,
    },
  });

  store.dispatch = mockDispatch;

  render(
    <Provider store={store}>
      <AppLink to="/test">Test Link</AppLink>
    </Provider>
  );

  const link = screen.getByText(/Test Link/i);
  fireEvent.click(link);

  expect(mockDispatch.mock.calls[0][0]).toEqual(
    setNavigation({
      preventNavigation: true,
      message: "Navigation is prevented",
      nextPath: "/test",
      showNavigationModal: true,
    })
  );
});
