import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from "./layout/RootLayout.tsx";
import { routes } from "./routes.ts";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RootLayout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </RootLayout>
    </BrowserRouter>
  </StrictMode>
);
