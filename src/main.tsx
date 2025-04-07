import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from "./layout/RootLayout.tsx";
import { routes } from "./routes.ts";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RootLayout>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
