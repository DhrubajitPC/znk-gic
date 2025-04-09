import { Modal, Typography } from "antd";
import { Route, Routes, useNavigate } from "react-router";
import { RootLayout } from "./layout/RootLayout";
import { routes } from "./routes";
import {
  clearError,
  resetNavigation,
  setNavigation,
  setShowNavigationModal,
  useAppDispatch,
  useAppSelector,
} from "./store/store";

export const App = () => {
  const { showNavigationModal, message, nextPath, showError, errorMessage } =
    useAppSelector((state) => {
      return {
        ...state.navigation,
        ...state.error,
      };
    });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <RootLayout>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
      <Modal
        data-testid="navigation-modal"
        open={showNavigationModal}
        title="Unsaved Changes"
        okText="OK"
        cancelText="Cancel"
        onOk={() => {
          const path = nextPath;
          dispatch(resetNavigation());
          navigate(path);
        }}
        onCancel={() => dispatch(setShowNavigationModal(false))}
      >
        {message}
      </Modal>
      <Modal
        open={showError}
        title={<Typography.Title level={3}>Uh Oh!</Typography.Title>}
        okText="OK"
        onOk={() => {
          dispatch(clearError());
        }}
      >
        {errorMessage}
      </Modal>
    </RootLayout>
  );
};
