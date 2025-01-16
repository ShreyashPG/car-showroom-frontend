import Admin from "../Layouts/Admin";
import Calendar from "../pages/Admin/Calender";
import Report from "../pages/Admin/Report";
import Employees from "../pages/Admin/Employees";

import Teachers from "../pages/Admin/Teachers";
import ViewInfo from "../pages/Admin/ViewInfo";
import { ADashBoard } from "./../pages/Admin/ADashboard";

export const AdminRoutes = {
  path: "a/",
  element: <Admin />,
  // errorElement: <ErrorPage/>,
  children: [
    {
      path: "dashboard",
      element: <ADashBoard />,
    },
    {
      path: "teachers",
      element: <Teachers />,
    },
    {
      path: "employees",
      element: <Employees />,
    },
    {
      path: "report",
      element: <Report />,
    },
    {
      path: "viewInfo",
      element: <ViewInfo />,
    },
    {
      path: "calender",
      element: <Calendar />,
    },
  ],
};
