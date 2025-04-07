import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React from "react";
import { AppLink } from "../../components/appLink/AppLink";
import { EmployeeTable } from "../../components/employeeTable/EmployeeTable";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../../features/employee/api/employeeApi";
import { setError, useAppDispatch } from "../../store/store";

export const EmployeeListing: React.FC = () => {
  const {
    data: employees = [],
    isLoading: loading,
    error,
  } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const dispatch = useAppDispatch();
  if (error) {
    dispatch(
      setError({ showError: true, errorMessage: "Error fetching employees" })
    );
  }

  return (
    <>
      <Typography.Title level={2}>Employees' List</Typography.Title>
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        <div>
          <AppLink to="/employee/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Employee
            </Button>
          </AppLink>
        </div>

        <EmployeeTable
          employees={employees}
          loading={loading}
          onDelete={async (id: string) => {
            try {
              await deleteEmployee(id.toString()).unwrap();
            } catch (e) {
              dispatch(
                setError({
                  showError: true,
                  errorMessage: "Error deleting employee",
                })
              );
            }
          }}
        />
      </Space>
    </>
  );
};
