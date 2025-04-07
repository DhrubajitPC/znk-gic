import { Typography } from "antd";
import React from "react";
import { EmployeeForm } from "../../components/EmployeeForm";

export const EditEmployee: React.FC = () => {
  return (
    <>
      <Typography.Title level={2}>Update employee details:</Typography.Title>
      <EmployeeForm />
    </>
  );
};
