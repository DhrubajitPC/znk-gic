import { Modal } from "antd";
import { Route, Routes, useNavigate } from "react-router";
import { RootLayout } from "./layout/RootLayout";
import { routes } from "./routes";
import {
  setNavigation,
  setShowNavigationModal,
  useAppDispatch,
  useAppSelector,
} from "./store/store";

export const App = () => {
  const { showNavigationModal, message, nextPath } = useAppSelector(
    (state) => state.navigation
  );

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
        open={showNavigationModal}
        title="Unsaved Changes"
        okText="OK"
        cancelText="Cancel"
        onOk={() => {
          const path = nextPath;
          dispatch(
            setNavigation({
              preventNavigation: false,
              message: "",
              nextPath: "",
              showNavigationModal: false,
            })
          );
          navigate(path);
        }}
        onCancel={() => dispatch(setShowNavigationModal(false))}
      >
        {message}
      </Modal>
    </RootLayout>
  );
};
