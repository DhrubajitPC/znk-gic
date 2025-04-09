import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
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
    resetNavigation: (state) => {
      state.preventNavigation = false;
      state.message = "";
      state.nextPath = "";
      state.showNavigationModal = false;
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
  resetNavigation,
} = navigationSlice.actions;

export const { setError, clearError } = errorSlice.actions;

const rootReducer = combineReducers({
  error: errorSlice.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  navigation: navigationSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(employeeApi.middleware),
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
