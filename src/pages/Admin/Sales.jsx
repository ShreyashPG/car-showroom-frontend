/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/AModule/Header";
import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  IconButton,
  Tooltip,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { removeSpecificColumns } from "./AdminApis";
import { BASE_URL } from "../../api";

const SimpleModal = ({
  saleUsername,
  saleAccess,
  onRemoveAccess,
  onClose,
  specialAccessSaleTables,
  specialAccessEmployeeTables,
}) => {
  const handleRemoveAccess = () => {
    onRemoveAccess(saleUsername);
  };

  const saleTableOptions =
    specialAccessSaleTables?.map((option) => ({
      value: option,
      label: option,
    })) || [];

  const employeeTableOptions =
    specialAccessEmployeeTables?.map((option) => ({
      value: option,
      label: option,
    })) || [];

  return (
    <div className="simple-modal m-2 shadow-md border-2 p-3 ">
      <div className="modal-content">
        <Typography color="blue" className="text-xl font-bold">
          Remove Access for {saleUsername}
        </Typography>

        <div className="mt-4">
          <label className="block text-gray-700">Sale Tables:</label>
          <Select
            options={saleTableOptions}
            isMulti
            value={
              saleAccess?.saleTables?.map((option) => ({
                value: option,
                label: option,
              })) || []
            }
            disabled
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Employee Tables:</label>
          <Select
            options={employeeTableOptions}
            isMulti
            value={
              saleAccess?.employeeTables?.map((option) => ({
                value: option,
                label: option,
              })) || []
            }
            disabled
          />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button color="red" onClick={handleRemoveAccess}>
            Remove Access
          </Button>
          <Button color="blue" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Sales() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [editingEmail, setEditingEmail] = useState(null);
  const [selectedSaleAccess, setSelectedSaleAccess] = useState([]);
  const [selectedEmployeeAccess, setSelectedEmployeeAccess] = useState([]);
  const [saleTableAccess, setSaleTableAccess] = useState([]);
  const [employeeTableAccess, setEmployeeTableAccess] = useState([]);
  const [saleId, setSaleId] = useState("");
  const [removingAccessSale, setRemovingAccessSale] = useState(null);
  const [removingAccess, setRemovingAccess] = useState({
    saleTables: [],
    employeeTables: [],
  });
  const [specialAccessSaleTables, setSpecialAccessSaleTables] = useState(
    []
  );
  const [specialAccessEmployeeTables, setSpecialAccessEmployeeTables] = useState(
    []
  );

  const handleButtonClick = () => {
    saleId === ""
      ? alert("Enter SaleID...")
      : navigate(`/a/viewInfo?saleId=${saleId}`);
  };

  const getAllSales = async () => {
    try {
      const apiurl = `${BASE_URL}/auth/getAllSale`;
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSales(response.data.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const getAllTables = async () => {
    try {
      const tablesUrl =
        `${BASE_URL}/sale/gettables/tables-stud-fact`;
      const response = await axios.get(tablesUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response);

      const { Sale_Tables, Employee_Tables } = response.data.data;

      // Set the regular sale and employee table access arrays
      setSaleTableAccess(Sale_Tables || []);
      setEmployeeTableAccess(Employee_Tables || []);

      // Set the special access sale and employee table arrays
      setSpecialAccessSaleTables(Sale_Tables || []);
      setSpecialAccessEmployeeTables(Employee_Tables || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    getAllSales();
    getAllTables();
  }, []);

  const handleEditClick = (Username) => {
    const sale = sales.find((sale) => sale.Username === Username);

    // Set the initial selected values based on the data from the backend
    setSelectedSaleAccess(sale.SpecialAccessSale || []);
    setSelectedEmployeeAccess(sale.SpecialAccessEmployee || []);

    setEditingEmail(Username);
  };

  const handleSaveClick = async (Username) => {
    try {
      const updateApiurl = `${BASE_URL}/general/update-fields`;
      console.log(updateApiurl)

      // Modify the data to be sent to the backend
      const data = {
        username: Username,
        saleTables: selectedSaleAccess,
        employeeTables: selectedemployeeAccess,
      };

      await axios.post(updateApiurl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(`Access updated for ${Username}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setEditingEmail(null);

      // Update the state with the modified value
      setSales((prevSales) =>
        prevSales.map((sale) =>
          sale.Username === Username
            ? {
                ...sale,
                SpecialAccessSale: selectedSaleAccess,
                SpecialAccessEmployee: selectedEmployeeAccess,
              }
            : sale
        )
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating sale:", error);
    }
  };

  const handleSpecialAccessSelectChange = (value, type) => {
    if (type === "sale") {
      setSelectedSaleAccess(value.map((option) => option.value));
    } else if (type === "employee") {
      setSelectedEmployeeAccess(value.map((option) => option.value));
    }
  };

  const getSaleAccess = async (Username) => {
    try {
      // Fetch the current special access for the user
      const accessUrl = `${BASE_URL}/general/get-spec-cols?username=${Username}`;
      // console.log(accessUrl);
      const accessResponse = await axios.post(accessUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("AccessReponse", accessResponse);

      // Set the special access tables in the removingAccess state
      setRemovingAccess({
        saleTables: accessResponse.data.data.SpecialAccess_Sale || [],
        employeeTables: accessResponse.data.data.SpecialAccess_Employee || [],
      });

      setRemovingAccessSale(Username);
    } catch (error) {
      console.error("Error fetching sale access:", error);
    }
  };

  const handleRemoveAccessClick = async (Username) => {
    try {
      console.log(
        "Before removing access - Sale Tables:",
        removingAccess.saleTables
      );
      console.log(
        "Before removing access - Employee Tables:",
        removingAccess.employeeTables
      );
      const removeAccessApiurl = removeSpecificColumns;

      // Modify the data to be sent to the backend
      const data = {
        username: Username,
        saleTables: removingAccess.saleTables,
        employeeTables: removingAccess.employeeTables,
      };

      await axios.post(removeAccessApiurl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Access removed successfully!");

      toast.success(`Access removed for ${Username}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Close the remove access modal
      setRemovingAccessSale(null);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error removing access:", error);
    }
  };

  return (
    <div className="container ">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between  mx-2">
        <div>
          <Header category="Page" title="Sale" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center p-0  gap-4">
          <Input
            label="Enter Sale ID"
            variant="outlined"
            value={saleId}
            className="w-80 py-0"
            onChange={(e) => setSaleId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="w-full"
            onClick={handleButtonClick}
            endIcon={<SendIcon />}
          >
            View Sale Data
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto mx-2">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2 leading-none opacity-70 font-bold text-dark-700"
                >
                  Special Access
                </Typography>
              </th>
              <th className="py-2 px-4 border-b">
                <Typography
                  variant="medium"
                  color="blue"
                  className="flex items-center justify-between gap-2  leading-none opacity-70 font-bold text-dark-700"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {sales?.map((sale) => (
              <tr key={sale.Username} className="hover:bg-light-blue-50">
                <td className="py-2 px-4 border-b">{sale.Name}</td>
                <td className="py-2 px-4 border-b">{sale.Username}</td>
                <td
                  className={`py-2 px-4 border-b ${
                    editingEmail === sale.Username ? "editable" : ""
                  }`}
                >
                  {editingEmail === sale.Username ? (
                    <>
                      <div className="mb-2">
                        <label>Special Access Sale:</label>
                        <Select
                          isMulti
                          options={specialAccessSaleTables.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          value={selectedSaleAccess.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          onChange={(value) =>
                            handleSpecialAccessSelectChange(value, "sale")
                          }
                        />
                      </div>
                      <div>
                        <label>Special Access Employee:</label>
                        <Select
                          isMulti
                          options={specialAccessEmployeeTables.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          value={selectedEmployeeAccess.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          onChange={(value) =>
                            handleSpecialAccessSelectChange(value, "employee")
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <strong>Faculty:</strong>{" "}
                      {sale.SpecialAccess_Sale
                        ? sale.SpecialAccess_Sale
                        : ""}
                      <br />
                      <strong>Employee:</strong>{" "}
                      {sale.SpecialAccess_Employee
                        ? sale.SpecialAccess_Employee
                        : ""}
                    </>
                  )}
                </td>
                <td className="py-2 px-4 border-b flex items-center">
                  {editingEmail === sale.Username ? (
                    <Tooltip content="Save Changes">
                      <IconButton
                        onClick={() => handleSaveClick(sale.Username)}
                        variant="text"
                      >
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip content="Edit Data">
                        <IconButton
                          onClick={() => handleEditClick(sale.Username)}
                          variant="text"
                        >
                          <PencilIcon className="h-4 w-4 text-blue-500" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Remove Access">
                        <IconButton
                          onClick={() => getSaleAccess(sale.Username)}
                          variant="text"
                        >
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {removingAccessSale && (
        <SimpleModal
          saleUsername={removingAccessSale}
          saleAccess={removingAccess} // Pass removingAccess instead of saleAccess
          onRemoveAccess={handleRemoveAccessClick}
          onClose={() => setRemovingAccessSale(null)}
          specialAccessSaleTables={specialAccessSaleTables}
          specialAccessEmployeeTables={specialAccessEmployeeTables}
        />
      )}
    </div>
  );
}
