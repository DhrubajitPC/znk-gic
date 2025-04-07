import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { EmployeeForm } from "../../components/employeeForm/EmployeeForm";
import {
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../features/employee/api/employeeApi";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const EditEmployee: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { data: employeeList, isLoading } = useGetEmployeesQuery();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);

  const employee = employeeList?.find((employee) => employee.id === employeeId);

  const handleSubmit = async (values: any) => {
    try {
      await updateEmployee({ id: employeeId || "", ...values }).unwrap();
      setIsSaved(true);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Link to="/">
        <Button
          style={{ marginTop: "25px" }}
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={(e) => {
            if (isDirty) {
              e.preventDefault();
              setShowUnsavedChangesModal(true);
            }
          }}
        >
          Back to Employee List
        </Button>
      </Link>
      <Typography.Title level={2}>Update employee details:</Typography.Title>
      {employee ? (
        <EmployeeForm
          employee={employee}
          onSubmit={handleSubmit}
          onDirtyChange={(isDirty) => {
            setIsDirty(isDirty);
          }}
        />
      ) : null}
      {isSaved && (
        <Modal
          open={showModal}
          maskClosable={true}
          title="Employee Updated Successfully"
          okText="Go to Homepage"
          onOk={() => navigate("/")}
          onCancel={() => setShowModal(false)}
        >
          The Employee details have been saved
        </Modal>
      )}
      {showUnsavedChangesModal && (
        <Modal
          open={showUnsavedChangesModal}
          maskClosable={true}
          title="Unsaved Changes"
          okText="OK"
          cancelText="Cancel"
          onOk={() => {
            setShowUnsavedChangesModal(false);
            navigate("/");
          }}
          onCancel={() => setShowUnsavedChangesModal(false)}
        >
          Form has been modified. You will lose your unsaved changes. Are you
          sure you want to close this form?
        </Modal>
      )}
    </>
  );
};
