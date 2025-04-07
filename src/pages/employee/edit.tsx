import { Typography } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { EmployeeForm } from "../../components/EmployeeForm";
import {
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../features/employee/api/employeeApi";

export const EditEmployee: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { data: employeeList, isLoading } = useGetEmployeesQuery();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const navigate = useNavigate();

  const employee = employeeList?.find((employee) => employee.id === employeeId);

  const handleSubmit = async (values: any) => {
    try {
      await updateEmployee({ id: employeeId || "", ...values }).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Typography.Title level={2}>Update employee details:</Typography.Title>
      {employee ? (
        <EmployeeForm employee={employee} onSubmit={handleSubmit} />
      ) : null}
    </>
  );
};
