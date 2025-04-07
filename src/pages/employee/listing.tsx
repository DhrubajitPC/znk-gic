import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router";
import { EmployeeTable } from "../../components/employeeTable/EmployeeTable";
import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "../../features/employee/api/employeeApi";

export const EmployeeListing: React.FC = () => {
  const {
    data: employees = [],
    isLoading: loading,
    error,
  } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  if (error) {
    console.error("Error fetching employees:", error);
  }

  return (
    <>
      <Typography.Title level={2}>Employees' List</Typography.Title>
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        <div>
          <Link to="/employee/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Employee
            </Button>
          </Link>
        </div>

        <EmployeeTable
          employees={employees}
          loading={loading}
          onDelete={async (id: string) => {
            await deleteEmployee(id.toString());
          }}
        />
      </Space>
    </>
  );
};
