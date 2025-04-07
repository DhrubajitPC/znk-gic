import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { EmployeeForm } from "../../components/employeeForm/EmployeeForm";
import {
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../features/employee/api/employeeApi";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  setMessage,
  setPreventNavigationWithMessage,
  useAppDispatch,
  useAppSelector,
} from "../../store/store";
import { setPreventNavigation } from "../../store/store";
import { AppLink } from "../../components/appLink/AppLink";

export const EditEmployee: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { data: employeeList, isLoading } = useGetEmployeesQuery();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const employee = employeeList?.find((employee) => employee.id === employeeId);

  const handleSubmit = async (values: any) => {
    try {
      await updateEmployee({ id: employeeId || "", ...values }).unwrap();
      setIsSaved(true);
      setShowModal(true);
      dispatch(setPreventNavigation(false)); // Reset navigation prevention
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <AppLink to="/">
        <Button
          style={{ marginTop: "25px" }}
          type="link"
          icon={<ArrowLeftOutlined />}
        >
          Back to Employee List
        </Button>
      </AppLink>
      <Typography.Title level={2}>Update employee details:</Typography.Title>
      {employee ? (
        <EmployeeForm
          employee={employee}
          onSubmit={handleSubmit}
          onDirtyChange={(isDirty) => {
            if (isDirty) {
              dispatch(
                setPreventNavigationWithMessage({
                  preventNavigation: true,
                  message:
                    "Form has been modified. You will lose your unsaved changes. Are you sure you want to close this form?",
                })
              );
            } else {
              dispatch(
                setPreventNavigationWithMessage({
                  preventNavigation: false,
                  message: "",
                })
              );
            }
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
    </>
  );
};
