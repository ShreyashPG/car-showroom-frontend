import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { getCountAllTables } from "./AdminApis";

// ... (imports)
import Spinner from './../../components/Spinner';

export const ADashBoard = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const [tableData, setTableData] = useState({
    employees: [],
    sales: [],
  });
  const [loading, setLoading] = useState(false);
  // const getCurrentDate = () => {
  //   const currentDate = new Date();
  //   return currentDate.toISOString().split("T")[0];
  // };
  const employeeMapping = {
    employee_internship_details: "Employee Internship Details",

    employee_certificate_course: "Employee Certificate Course",
 
    employee_event_participated: "Employee Event Participated",
    employee_event_organized: "Employee Event Organized",

  };

  const saleMapping = {

    grants: "Grants",
    consultancy_report: "Consultancy Reports",
   
    sttp_fdp_conference_attended: "STTP/FDP Conference Attended",
   
    industrial_fields_tour: "Industrial Fields Tours",
  
  };

  const fetchAllTablesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getCountAllTables);
      // console.log("Tables response", response.data.data);
      // Update the state with fetched table data
      const employeeTablesData = response?.data?.data?.Employee_Tables || [];
      const saleTablesData = response?.data?.data?.Sale_Tables || [];

      const formattedEmployeeData = employeeTablesData.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        const formattedLabel = employeeMapping[tableName] || tableName; // Use mapping if available, otherwise fallback to original label
        return { label: formattedLabel, value: count };
      });

      const formattedSaleData = saleTablesData.map((table) => {
        const tableName = Object.keys(table)[0];
        const count = table[tableName];
        const formattedLabel = saleMapping[tableName] || tableName;
        return { label: formattedLabel, value: count };
      });
      // console.log("employee:", formattedSaleData);

      setTableData({
        employees: formattedEmployeeData,
        sales: formattedSaleData,
        // Add other roles as needed
      });
      setLoading(false);
      // console.log("Table data:", tableData);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllTablesData();
  }, []);

  return (
    <>
      {loading ? <Spinner /> :
        <>
          <div className="flex flex-col m-1">
            {/* Sale Records Section */}
            <div className="mb-4 ">
              <Typography variant="h4" color="blue-gray" className="mb-2 mx-4">
                Sale Records
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                {tableData?.sales?.map((table, index) => (
                  <div
                    key={index}
                    className="w-full  px-4 py-1 transition duration-300 relative group"
                  >
                    <Card
                      className="w-full h-full rounded-lg p-4"
                      style={{
                        backgroundColor: index % 2 !== 0 ? "#F0F0F0" : "#D6EAF8",
                        transition: "transform 0.3s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <CardBody>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className=" text-center mb-2 break-words"
                        >
                          {table.label}
                        </Typography>
                        <Typography variant="body2" className="text-center">
                          {table.value}
                        </Typography>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Employee Records Section */}
            <div>
              <Typography variant="h4" color="blue-gray" className="mb-2 mx-4">
                Employee Records
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                {tableData?.employees?.map((table, index) => (
                  <div
                    key={index}
                    className="w-full  px-4 py-1 transition duration-300 relative group"
                  >
                    <Card
                      className="w-full h-full rounded-lg p-4"
                      style={{
                        backgroundColor: index % 2 !== 0 ? "#F0F0F0" : "#D6EAF8",
                        transition: "transform 0.3s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <CardBody>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="text-center mb-2 break-words"
                        >
                          {table.label}
                        </Typography>
                        <Typography variant="body2" className="text-center">
                          {table.value}
                        </Typography>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>}
    </>
  );
};
