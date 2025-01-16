import Employee from "../Layouts/Employee";
import Data from "../pages/Employee/Data";
import General from "../pages/Employee/General";
// import Achievements from "../pages/Employee/Achievements";
// import CoCurricular from "../pages/Employee/CoCurricular";
// import InternShip from "../pages/Employee/InternShip";
import SDashboard from "../pages/Employee/EDashboard";

export const EmployeeRoutes = {
  path: "e/",
  element: <Employee />,
  // errorElement: <ErrorPage/>,
  children: [
    {
      path: "dashboard",
      element: <SDashboard />,
    },
    {
      path: "general",
      element: <General />,
    },
    {
      path: "data",
      element: <Data />,
    },

    // {
    //   path: "co-curricular",
    //   element: <CoCurricular />,
    // },
  ],
};
