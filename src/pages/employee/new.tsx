import { Typography } from "antd";
import React from "react";
import { EmployeeForm } from "../../components/EmployeeForm";

export const NewEmployee: React.FC = () => {
  return (
    <>
      <Typography.Title level={2}>
        Please enter new employee details:
      </Typography.Title>
      <EmployeeForm />
    </>
  );
};
