import { Button, DatePicker, Form, Input, Radio } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Employee } from "../types/Employee";

type EmployeeFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: dayjs.Dayjs | null;
  joinedDate: dayjs.Dayjs | null;
};

export const EmployeeForm: React.FC<{
  defaultValues?: Partial<EmployeeFormValues>;
  onSubmit?: (data: Omit<Employee, "id">) => void;
}> = ({ defaultValues = {}, onSubmit }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: null,
      joinedDate: null,
      ...defaultValues,
    },
  });

  const dateOfBirth = watch("dateOfBirth");

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit((data: EmployeeFormValues) => {
        console.log("Form Data:", data);
        const transformedData = {
          ...data,
          dateOfBirth: data.dateOfBirth?.format("YYYY-MM-DD") || "",
          joinedDate: data.joinedDate?.format("YYYY-MM-DD") || "",
        };
        onSubmit?.(transformedData);
      })}
      data-testid="employee-form"
    >
      <Form.Item
        label="First Name"
        validateStatus={errors.firstName ? "error" : ""}
        htmlFor="firstName"
        help={errors.firstName?.message}
      >
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: "First name is required",
            minLength: { value: 6, message: "Minimum 6 characters required" },
            maxLength: { value: 10, message: "Maximum 10 characters allowed" },
          }}
          render={({ field }) => <Input {...field} id="firstName" />}
        />
      </Form.Item>

      <Form.Item
        label="Last Name"
        validateStatus={errors.lastName ? "error" : ""}
        htmlFor="lastName"
        help={errors.lastName?.message}
      >
        <Controller
          name="lastName"
          control={control}
          rules={{
            required: "Last name is required",
            minLength: { value: 6, message: "Minimum 6 characters required" },
            maxLength: { value: 10, message: "Maximum 10 characters allowed" },
          }}
          render={({ field }) => <Input {...field} id="lastName" />}
        />
      </Form.Item>

      <Form.Item
        label="Email Address"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
        htmlFor="email"
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => <Input {...field} id="email" />}
        />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        validateStatus={errors.phoneNumber ? "error" : ""}
        htmlFor="phoneNumber"
        help={errors.phoneNumber?.message}
      >
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[689]\d{7}$/,
              message: "Invalid phone number",
            },
          }}
          render={({ field }) => <Input {...field} id="phoneNumber" />}
        />
      </Form.Item>

      <Form.Item
        // label="Gender"
        label={<label id="gender">Gender</label>}
        validateStatus={errors.gender ? "error" : ""}
        help={errors.gender?.message}
        htmlFor="gender"
      >
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <Radio.Group
              {...field}
              buttonStyle="solid"
              aria-labelledby="gender"
            >
              <Radio.Button value="male">Male</Radio.Button>
              <Radio.Button value="female">Female</Radio.Button>
            </Radio.Group>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        validateStatus={errors.dateOfBirth ? "error" : ""}
        help={errors.dateOfBirth?.message}
        htmlFor="dateOfBirth"
      >
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ required: "Date of Birth is required" }}
          render={({ field }) => (
            <DatePicker {...field} format="YYYY-MM-DD" id="dateOfBirth" />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Joined Date"
        htmlFor="joinedDate"
        validateStatus={errors.joinedDate ? "error" : ""}
        help={errors.joinedDate?.message}
      >
        <Controller
          name="joinedDate"
          control={control}
          rules={{
            required: "Joined Date is required",
            validate: (value) =>
              value && dateOfBirth && value.isAfter(dateOfBirth)
                ? true
                : "Joined date must be after Date of Birth",
          }}
          render={({ field }) => (
            <DatePicker {...field} format="YYYY-MM-DD" id="joinedDate" />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
