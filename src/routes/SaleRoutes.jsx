import Sale from "../Layouts/Sale";
import General from "../pages/Sale/General";
import Data from "../pages/Sale/Data";
import SDashboard from "../pages/Sale/SDashboard";
import Report from "../pages/Sale/Report";

export const SaleRoutes = {
  path: "t/",
  element: <Sale />,
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
    {
      path: "report",
      element: <Report/>
    }
  ],
};
