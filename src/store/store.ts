import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { employeeApi } from "../features/employee/api/employeeApi";

// Slice to manage error state
const errorSlice = createSlice({
  name: "error",
  initialState: {
    showError: false,
    errorMessage: "Oops! Something went wrong. Please try again",
  },
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ showError: boolean; errorMessage: string }>
    ) => {
      state.showError = action.payload.showError;
      state.errorMessage = action.payload.errorMessage;
    },
    clearError: (state) => {
      state.showError = false;
      state.errorMessage = "";
    },
  },
});

// Slice to manage navigation prevention state
const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    showNavigationModal: false,
    preventNavigation: false,
    message: "",
    nextPath: "",
  },
  reducers: {
    setPreventNavigation: (state, action: PayloadAction<boolean>) => {
      state.preventNavigation = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setNextPath: (state, action: PayloadAction<string>) => {
      state.nextPath = action.payload;
    },
    setPreventNavigationWithMessage: (
      state,
      action: PayloadAction<{ preventNavigation: boolean; message: string }>
    ) => {
      state.preventNavigation = action.payload.preventNavigation;
      state.message = action.payload.message;
    },
    setShowNavigationModal: (state, action: PayloadAction<boolean>) => {
      state.showNavigationModal = action.payload;
    },
    setNavigation: (
      state,
      action: PayloadAction<{
        preventNavigation: boolean;
        message: string;
        nextPath: string;
        showNavigationModal: boolean;
      }>
    ) => {
      state.preventNavigation = action.payload.preventNavigation;
      state.message = action.payload.message;
      state.nextPath = action.payload.nextPath;
      state.showNavigationModal = action.payload.showNavigationModal;
    },
  },
});

export const {
  setShowNavigationModal,
  setPreventNavigation,
  setMessage,
  setNextPath,
  setPreventNavigationWithMessage,
  setNavigation,
} = navigationSlice.actions;

export const { setError, clearError } = errorSlice.actions;

export const store = configureStore({
  reducer: {
    error: errorSlice.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    navigation: navigationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
