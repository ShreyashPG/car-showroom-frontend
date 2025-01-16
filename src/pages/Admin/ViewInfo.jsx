import { useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Card, Typography, Button } from "@material-tailwind/react";
import { DocumentIcon, PencilIcon } from "@heroicons/react/24/solid";
import { BASE_URL } from "../../api";

const ViewInfo = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherId = searchParams.get("teacherId");
  const employeeId = searchParams.get("EmployeeId");
  console.log(employeeId);
  console.log(teacherId);

  const [showModal, setShowModal] = useState(false);
  const [selectedTables, setSelectedTables] = useState({});
  const [userType, setUserType] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  // const [selectAll, setSelectAll] = useState(false);

  const teacherTables = {
   
    industrial_fields_tour: "industrial_fields_tour",
   
    grants: "grants",

    consultancy_report: "consultancy_report",
   
    sttp_fdp_conference_attended: "sttp_fdp_conference_attended",

  };

  const employeeTables = {
    employee_internship_details: "employee_internship_details",

    employee_certificate_course: "employee_certificate_course",
    
    employee_event_participated: "employee_event_participated",
    employee_event_organized: "employee_event_organized",

    // Add more employee tables if needed
  };

  const openModal = (type) => {
    // Show the modal
    setShowModal(true);
    // Set the user type
    setUserType(type);
    // Initialize selectedTables as an empty object
    setSelectedTables({});
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = (tableName) => {
    setSelectedTables((prevSelectedTables) => {
      // Create a new object to avoid mutating state directly
      const newSelectedTables = { ...prevSelectedTables };

      // Toggle the selection state for the clicked table
      newSelectedTables[tableName] = !newSelectedTables[tableName];

      return newSelectedTables;
    });
  };

  const applyChanges = async () => {
    console.log("Applying Changes:", selectedTables);

    const userId = userType === "teacher" ? teacherId : employeeId;

    try {
      const apiUrl = `${BASE_URL}/general/get-user-data?username=${userId}&selectedTables[]=${Object.keys(
        selectedTables
      ).join("&selectedTables[]=")}`;
      const response = await axios.post(apiUrl, {
        selectedTables,
        teacherId,
        employeeId,
      });

      console.log("API Response:", response.data.data);

      setResponseData(response.data.data);
      // Set the selected table to the first one in the list
      setSelectedTable(Object.keys(response.data.data)[0]);
    } catch (error) {
      console.error("Error making API call:", error);
    }

    closeModal();
    // Do not reset selectedTables to display multiple tables
  };

  const renderTable = (tableName, tableData) => {
    console.log("Table name = ", tableName);
    console.log("Table data = ", tableData);

    if (tableData.length === 0) {
      return (
        <Card
          key={tableName}
          color="transparent"
          shadow={false}
          className="border border-gray-300 w-full p-2 my-10 rounded-md"
        >
          <Typography tag="h2" className="text-xl font-bold mb-2 text-center">
            {tableName}
          </Typography>
          <p className="text-center text-gray-600">
            No data available for this table.
          </p>
        </Card>
      );
    }

    return (
      <Card
        key={tableName}
        color="transparent"
        shadow={false}
        className="border border-gray-300 w-full p-2 my-10 rounded-md overflow-x-auto"
      >
        <Typography tag="h2" className="text-xl font-bold mb-2 text-center">
          {tableName}
        </Typography>
        <div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                {Object?.keys(tableData[0])?.map((header, index) => (
                  <th key={index} className="py-2 px-4 border-r">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* {tableData?.map((record, recordIndex) => (
                <tr key={recordIndex} className="text-center border-t">
                  {Object.values(record)?.map((value, valueIndex) => (
                    <td key={valueIndex} className="py-2 px-4 border-r">
                      {value}
                    </td>
                  ))}
                </tr>
              ))} */}
              {tableData.map((record, recordIndex) => (
                <tr key={recordIndex} className="text-center border-t">
                  {Object.entries(record).map(([key, value], valueIndex) => (
                    <td key={valueIndex} className="py-2 px-4 border-r">
                      {key.startsWith("Upload") ? (
                        <DocumentIcon className="w-6 h-6 inline-block text-blue-500" />
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };

  const renderSelectedTables = () => {
    return (
      <div>
        {/* Render all selected tables */}
        {Object.keys(responseData).map((tableName) =>
          selectedTables[tableName]
            ? renderTable(tableName, responseData[tableName])
            : null
        )}
      </div>
    );
  };

  const handleSelectAll = () => {
    // If all tables are currently selected, deselect all; otherwise, select all
    setSelectedTables(
      Object.keys(selectedTables).length ===
        Object.keys(userType === "teacher" ? teacherTables : employeeTables)
          .length
        ? {}
        : userType === "teacher"
          ? teacherTables
          : employeeTables
    );
  };

  return (
    <div>
      <div className="flex justify-center w-full gap-2">
        {teacherId === null ? (
          <>
            <button
              className=" text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              onClick={() => openModal("employee")}
              style={{ backgroundColor: "#1565C0" }}
            >
              Open Employee Table Selection
            </button>
          </>
        ) : (
          <>
            <button
              className=" text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              onClick={() => openModal("teacher")}
              style={{ backgroundColor: "#1565C0" }}
            >
              Open Teacher Table Selection
            </button>
          </>
        )}
      </div>
      {showModal && (
        <div className="fixed z-10 p-6 inset-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="flex flex-col m-3 bg-white p-6 rounded-lg shadow-md w-full max-w-lg overflow-y-auto">
            <h1 className="text-lg font-semibold mb-4">Select Tables</h1>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="checkbox-select-all"
                className="mr-2 h-5 w-5 border-gray-300 focus:ring focus:border-blue-300"
                onChange={handleSelectAll}
                checked={
                  Object.keys(selectedTables).length ===
                  Object.keys(
                    userType === "teacher" ? teacherTables : employeeTables
                  ).length
                }
              />
              <label
                htmlFor="checkbox-select-all"
                className="block mb-2 cursor-pointer"
              >
                Select All
              </label>
            </div>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {userType === "teacher"
                ? Object.keys(teacherTables).map((tableName) => (
                  <div key={tableName} className="mb-2 flex items-center">
                    <input
                      type="checkbox"
                      id={`checkbox-${tableName}`}
                      value={tableName}
                      className="mr-2 h-5 w-5 border-gray-300 focus:ring focus:border-blue-300"
                      onChange={() => handleCheckboxChange(tableName)}
                      checked={selectedTables[tableName]}
                    />
                    <label
                      htmlFor={`checkbox-${tableName}`}
                      className="block mb-2 cursor-pointer"
                    >
                      {teacherTables[tableName]}
                    </label>
                  </div>
                ))
                : userType === "employee"
                  ? Object.keys(employeeTables).map((tableName) => (
                    <div key={tableName} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`checkbox-${tableName}`}
                        value={tableName}
                        className="mr-2 h-5 w-5 border-gray-300 focus:ring focus:border-blue-300"
                        onChange={() => handleCheckboxChange(tableName)}
                        checked={selectedTables[tableName]}
                      />
                      <label
                        htmlFor={`checkbox-${tableName}`}
                        className="block mb-2 cursor-pointer"
                      >
                        {employeeTables[tableName]}
                      </label>
                    </div>
                  ))
                  : null}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                className="bg-red-400 text-white rounded-md px-4 py-2"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                className="rounded-md text-white px-4 py-2"
                onClick={applyChanges}
                style={{ backgroundColor: "#1565C0" }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {responseData && renderSelectedTables()}
    </div>
  );
};

export default ViewInfo;
