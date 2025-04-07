import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { useLocation } from "react-router";
import { Employee } from "../../types/Employee";
import { employeeFormSchema } from "./employeeFormSchema";

export const EmployeeForm: React.FC<{
  employee?: Employee;
  onSubmit?: (data: Omit<Employee, "id">) => void;
  onDirtyChange?: (isDirty: boolean) => void;
}> = ({ employee: employee, onSubmit, onDirtyChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      ...employee,
      dateOfBirth: dayjs(employee?.dateOfBirth),
      joinedDate: dayjs(employee?.joinedDate),
    },
    resolver: zodResolver(employeeFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(undefined, { keepValues: true });
    }
  }, [isSubmitSuccessful, reset]);

  const location = useLocation();
  const isEditRoute = location.pathname.includes("edit");

  return (
    <>
      <Form
        layout="vertical"
        onFinish={handleSubmit((data) => {
          const transformedData = {
            ...data,
            dateOfBirth: data.dateOfBirth.format("YYYY-MM-DD"),
            joinedDate: data.joinedDate.format("YYYY-MM-DD"),
          };
          onSubmit?.(transformedData);
        })}
      >
        <FormItem label="First Name" control={control} name="firstName">
          <Input />
        </FormItem>

        <FormItem label="Last Name" control={control} name="lastName">
          <Input />
        </FormItem>

        <FormItem label="Email" control={control} name="email">
          <Input />
        </FormItem>

        <FormItem label="Phone Number" control={control} name="phoneNumber">
          <Input />
        </FormItem>

        <FormItem label="Gender" control={control} name="gender">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="male">Male</Radio.Button>
            <Radio.Button value="female">Female</Radio.Button>
          </Radio.Group>
        </FormItem>

        <FormItem
          label="Date of Birth"
          control={control}
          name="dateOfBirth"
          help={errors.dateOfBirth?.message}
        >
          <DatePicker format="YYYY-MM-DD" />
        </FormItem>

        <FormItem
          label="Joined Date"
          control={control}
          name="joinedDate"
          help={errors.joinedDate?.message}
        >
          <DatePicker format="YYYY-MM-DD" />
        </FormItem>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEditRoute ? "Save" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
      <DevTool control={control} placement="bottom-right" />
    </>
  );
};
