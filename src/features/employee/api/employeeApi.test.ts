import { describe, test, expect, beforeEach, mock } from "bun:test";
import { employeeApi } from "./employeeApi";
import { store } from "../../../store/store";
import { Employee } from "../../../types/Employee";

const mockEmployees = [
  {
    id: 1,
    firstName: "first12",
    lastName: "last12",
    email: "first@last.com",
    phoneNumber: "+6588212321",
    gender: "male",
    dateOfBirth: "2000-08-23",
    joinedDate: "2025-04-06",
  },
  {
    id: 2,
    firstName: "first1234",
    lastName: "last 1232",
    email: "first@last.com",
    phoneNumber: "+6588232122",
    gender: "male",
    dateOfBirth: "2025-04-01",
    joinedDate: "2025-04-30",
  },
];

describe("employeeApi", () => {
  beforeEach(() => {
    global.fetch = mock(async (url: string) => {
      if (url.includes("/employees") && !url.includes("/employees/")) {
        return new Response(JSON.stringify(mockEmployees), { status: 200 });
      }
      return new Response(null, { status: 404 });
    });
  });

  test("getEmployees should return employee list", async () => {
    const result = await store.dispatch(
      employeeApi.endpoints.getEmployees.initiate()
    );

    expect(result.data).toEqual(mockEmployees);
    expect(result.isSuccess).toBe(true);
  });

  test("deleteEmployee should handle success", async () => {
    global.fetch = mock(async (url: string) => {
      if (url.includes("/employees/1")) {
        return new Response(null, { status: 200 });
      }
      return new Response(null, { status: 404 });
    });

    const result = await store.dispatch(
      employeeApi.endpoints.deleteEmployee.initiate("1")
    );

    expect(result.isSuccess).toBe(true);
  });

  test("should handle errors", async () => {
    global.fetch = mock(() => Promise.reject(new Error("Network error")));

    const result = await store.dispatch(
      employeeApi.endpoints.getEmployees.initiate()
    );

    expect(result.isError).toBe(true);
  });
});
