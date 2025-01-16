import { useEffect, useState } from "react";
import Header from "../../components/AModule/Header";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Input } from "@material-tailwind/react";
import { getAllEmployee } from "./AdminApis";

// export default function Employees() {
export default function Employee() {

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [EmployeeId, setEmployeeId] = useState("");

  const handleButtonClick = () => {
    EmployeeId === ""
      ? alert("Enter EmployeeID...")
      : navigate(`/a/viewInfo?EmployeeId=${EmployeeId}`);
  };

  const getAllEmployees = async () => {
    try {
      const response = await axios.get(getAllEmployee, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setEmployees(response.data.data);
      // console.log("Employees are : ", employees);
    } catch (error) {
      console.error("Error fetching  car sales:", error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div className="container ">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mx-2">
        <div>
          <Header category="Page" title="Employee" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between p-0 gap-4">
          <Input
            label="Enter Employee ID"
            variant="outlined"
            value={EmployeeId}
            className="w-80 py-0"
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="w-full"
            onClick={handleButtonClick}
            endIcon={<SendIcon />}
          >
            View Employee Data
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto mx-4">
        <table className="mt-4 w-70 min-w-max table-auto text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-dark-700"
                >
                  Name
                </Typography>
              </th>
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-dark-700"
                >
                  Email
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee) => (
              <tr key={employee.Username} className="hover:bg-light-blue-50">
                <td className="py-2 px-4 border-b">{employee.Name}</td>
                <td className="py-2 px-4 border-b">{employee.Username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
