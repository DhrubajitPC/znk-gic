export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  joinedDate: string;
};
export type EmployeeFormData = Omit<Employee, "id">;

export type ValidationError = {
  field: keyof Employee;
  message: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  success: boolean;
};
