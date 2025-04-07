import { EditEmployee } from "./pages/employee/edit";
import { EmployeeListing } from "./pages/employee/listing";
import { NewEmployee } from "./pages/employee/new";
import { NotFound } from "./pages/not-found";

export const routes = [
    {
        path: "/",
        element: EmployeeListing
    },
    {
        path: "/employee/new",
        element: NewEmployee
    },
    {
        path: "/employee/edit/:employeeId",
        element: EditEmployee
    },
    {
        path: "/*",
        element: NotFound
    }
]