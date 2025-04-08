import dayjs from "dayjs";
import { z } from "zod";

export const employeeFormSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .min(6, "Minimum 6 characters required")
      .max(10, "Maximum 10 characters allowed"),
    lastName: z
      .string({
        required_error: "Last name is required",
      })
      .min(6, "Minimum 6 characters required")
      .max(10, "Maximum 10 characters allowed"),
    email: z.string({required_error: "Email is required"}).email("Invalid email format"),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .regex(/^[689]\d{7}$/, "Must be a valid Singaporean phone number"),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }),
    dateOfBirth: z
      .custom<dayjs.Dayjs>()
      .refine((val) => val && val.isBefore(dayjs()), {
        message: "Invalid Date of Birth",
      }),
    joinedDate: z
      .custom<dayjs.Dayjs>()
      .refine((val) => val && val.isBefore(dayjs()), {
        message: "Invalid Joined Date",
      }),
  })
  .refine(
    (data) => {
      const { joinedDate, dateOfBirth } = data;
      return dayjs(joinedDate).isAfter(dayjs(dateOfBirth));
    },
    {
      message: "Joined date must be after Date of Birth",
      path: ["joinedDate"],
    }
  );
