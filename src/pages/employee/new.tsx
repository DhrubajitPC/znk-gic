import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router";
import { EmployeeForm } from "../../components/employeeForm/EmployeeForm";
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
      <Link to="/">
        <Button
          style={{ marginTop: "25px" }}
          type="link"
          icon={<ArrowLeftOutlined />}
        >
          Back to Employee List
        </Button>
      </Link>
      <Typography.Title level={2}>
        Please enter new employee details:
      </Typography.Title>
      <EmployeeForm onSubmit={handleSubmit} />
    </>
  );
};
