import { Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { EmployeeForm } from "../../components/EmployeeForm";
import { useCreateEmployeeMutation } from "../../features/employee/api/employeeApi";

export const NewEmployee: React.FC = () => {
  const navigate = useNavigate();

  const [createEmployee] = useCreateEmployeeMutation();

  const handleSubmit = async (values: any) => {
    try {
      await createEmployee(values).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  return (
    <>
      <Typography.Title level={2}>
        Please enter new employee details:
      </Typography.Title>
      <EmployeeForm onSubmit={handleSubmit} />
    </>
  );
};
