import React from "react";
import { Link, LinkProps } from "react-router";
import {
  setNavigation,
  useAppDispatch,
  useAppSelector,
} from "../../store/store";

export const AppLink: React.FC<LinkProps> = (props) => {
  const { preventNavigation, message } = useAppSelector(
    (state) => state.navigation
  );
  const dispatch = useAppDispatch();

  return (
    <Link
      {...props}
      onClick={(e) => {
        if (preventNavigation) {
          e.preventDefault();
          dispatch(
            setNavigation({
              preventNavigation: preventNavigation,
              message,
              nextPath: props.to as string,
              showNavigationModal: true,
            })
          );
        }
      }}
    >
      {props.children}
    </Link>
  );
};
