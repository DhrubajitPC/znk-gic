import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router";
import data from "../../../db.json";
import { EmployeeTable } from "../../components/EmployeeTable";
import { Employee } from "../../types/Employee";

const employees: Employee[] = data.employees;

export const EmployeeListing: React.FC = () => {
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
          loading={false}
          onDelete={() => Promise.resolve()}
        />
      </Space>
    </>
  );
};
