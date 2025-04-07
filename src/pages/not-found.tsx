import React from "react";
import { Link } from "react-router";

export const NotFound: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link
        to="/"
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Go to Home
      </Link>
    </div>
  );
};
