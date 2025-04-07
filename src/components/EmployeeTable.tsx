import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Button, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router";
import { Employee } from "../types/Employee";

type EmployeeTableProps = {
  employees: Employee[];
  loading: boolean;
  onDelete: (id: number) => Promise<void>;
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  loading,
  onDelete,
}) => {
  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
      message.success("Employee deleted successfully");
    } catch (error) {
      message.error("Failed to delete employee");
    }
  };

  const columns: ColumnsType<Employee> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      sorter: (a, b) =>
        new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime(),
    },
    {
      title: "Joined Date",
      dataIndex: "joinedDate",
      key: "joinedDate",
      sorter: (a, b) =>
        new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Employee) => (
        <span>
          <Link to={`/employee/edit/${record.id}`}>
            <Button type="link" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this employee?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={employees}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} employees`,
      }}
    />
  );
};
