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
  teacherUsername,
  teacherAccess,
  onRemoveAccess,
  onClose,
  specialAccessTeacherTables,
  specialAccessEmployeeTables,
}) => {
  const handleRemoveAccess = () => {
    onRemoveAccess(teacherUsername);
  };

  const teacherTableOptions =
    specialAccessTeacherTables?.map((option) => ({
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
          Remove Access for {teacherUsername}
        </Typography>

        <div className="mt-4">
          <label className="block text-gray-700">Teacher Tables:</label>
          <Select
            options={teacherTableOptions}
            isMulti
            value={
              teacherAccess?.teacherTables?.map((option) => ({
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
              teacherAccess?.employeeTables?.map((option) => ({
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

export default function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [editingEmail, setEditingEmail] = useState(null);
  const [selectedTeacherAccess, setSelectedTeacherAccess] = useState([]);
  const [selectedEmployeeAccess, setSelectedEmployeeAccess] = useState([]);
  const [teacherTableAccess, setTeacherTableAccess] = useState([]);
  const [employeeTableAccess, setEmployeeTableAccess] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [removingAccessTeacher, setRemovingAccessTeacher] = useState(null);
  const [removingAccess, setRemovingAccess] = useState({
    teacherTables: [],
    employeeTables: [],
  });
  const [specialAccessTeacherTables, setSpecialAccessTeacherTables] = useState(
    []
  );
  const [specialAccessEmployeeTables, setSpecialAccessEmployeeTables] = useState(
    []
  );

  const handleButtonClick = () => {
    teacherId === ""
      ? alert("Enter TeacherID...")
      : navigate(`/a/viewInfo?teacherId=${teacherId}`);
  };

  const getAllTeachers = async () => {
    try {
      const apiurl = `${BASE_URL}/auth/getAllTeacher`;
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const getAllTables = async () => {
    try {
      const tablesUrl =
        `${BASE_URL}/teacher/gettables/tables-stud-fact`;
      const response = await axios.get(tablesUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response);

      const { Teacher_Tables, Employee_Tables } = response.data.data;

      // Set the regular teacher and employee table access arrays
      setTeacherTableAccess(Teacher_Tables || []);
      setEmployeeTableAccess(Employee_Tables || []);

      // Set the special access teacher and employee table arrays
      setSpecialAccessTeacherTables(Teacher_Tables || []);
      setSpecialAccessEmployeeTables(Employee_Tables || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    getAllTeachers();
    getAllTables();
  }, []);

  const handleEditClick = (Username) => {
    const teacher = teachers.find((teacher) => teacher.Username === Username);

    // Set the initial selected values based on the data from the backend
    setSelectedTeacherAccess(teacher.SpecialAccessTeacher || []);
    setSelectedEmployeeAccess(teacher.SpecialAccessEmployee || []);

    setEditingEmail(Username);
  };

  const handleSaveClick = async (Username) => {
    try {
      const updateApiurl = `${BASE_URL}/general/update-fields`;
      console.log(updateApiurl)

      // Modify the data to be sent to the backend
      const data = {
        username: Username,
        teacherTables: selectedTeacherAccess,
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
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.Username === Username
            ? {
                ...teacher,
                SpecialAccessTeacher: selectedTeacherAccess,
                SpecialAccessEmployee: selectedEmployeeAccess,
              }
            : teacher
        )
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleSpecialAccessSelectChange = (value, type) => {
    if (type === "teacher") {
      setSelectedTeacherAccess(value.map((option) => option.value));
    } else if (type === "employee") {
      setSelectedEmployeeAccess(value.map((option) => option.value));
    }
  };

  const getTeacherAccess = async (Username) => {
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
        teacherTables: accessResponse.data.data.SpecialAccess_Teacher || [],
        employeeTables: accessResponse.data.data.SpecialAccess_Employee || [],
      });

      setRemovingAccessTeacher(Username);
    } catch (error) {
      console.error("Error fetching teacher access:", error);
    }
  };

  const handleRemoveAccessClick = async (Username) => {
    try {
      console.log(
        "Before removing access - Teacher Tables:",
        removingAccess.teacherTables
      );
      console.log(
        "Before removing access - Employee Tables:",
        removingAccess.employeeTables
      );
      const removeAccessApiurl = removeSpecificColumns;

      // Modify the data to be sent to the backend
      const data = {
        username: Username,
        teacherTables: removingAccess.teacherTables,
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
      setRemovingAccessTeacher(null);
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
          <Header category="Page" title="Teacher" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center p-0  gap-4">
          <Input
            label="Enter Teacher ID"
            variant="outlined"
            value={teacherId}
            className="w-80 py-0"
            onChange={(e) => setTeacherId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="w-full"
            onClick={handleButtonClick}
            endIcon={<SendIcon />}
          >
            View Teacher Data
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
            {teachers?.map((teacher) => (
              <tr key={teacher.Username} className="hover:bg-light-blue-50">
                <td className="py-2 px-4 border-b">{teacher.Name}</td>
                <td className="py-2 px-4 border-b">{teacher.Username}</td>
                <td
                  className={`py-2 px-4 border-b ${
                    editingEmail === teacher.Username ? "editable" : ""
                  }`}
                >
                  {editingEmail === teacher.Username ? (
                    <>
                      <div className="mb-2">
                        <label>Special Access Teacher:</label>
                        <Select
                          isMulti
                          options={specialAccessTeacherTables.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          value={selectedTeacherAccess.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          onChange={(value) =>
                            handleSpecialAccessSelectChange(value, "teacher")
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
                      {teacher.SpecialAccess_Teacher
                        ? teacher.SpecialAccess_Teacher
                        : ""}
                      <br />
                      <strong>Employee:</strong>{" "}
                      {teacher.SpecialAccess_Employee
                        ? teacher.SpecialAccess_Employee
                        : ""}
                    </>
                  )}
                </td>
                <td className="py-2 px-4 border-b flex items-center">
                  {editingEmail === teacher.Username ? (
                    <Tooltip content="Save Changes">
                      <IconButton
                        onClick={() => handleSaveClick(teacher.Username)}
                        variant="text"
                      >
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip content="Edit Data">
                        <IconButton
                          onClick={() => handleEditClick(teacher.Username)}
                          variant="text"
                        >
                          <PencilIcon className="h-4 w-4 text-blue-500" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Remove Access">
                        <IconButton
                          onClick={() => getTeacherAccess(teacher.Username)}
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
      {removingAccessTeacher && (
        <SimpleModal
          teacherUsername={removingAccessTeacher}
          teacherAccess={removingAccess} // Pass removingAccess instead of teacherAccess
          onRemoveAccess={handleRemoveAccessClick}
          onClose={() => setRemovingAccessTeacher(null)}
          specialAccessTeacherTables={specialAccessTeacherTables}
          specialAccessEmployeeTables={specialAccessEmployeeTables}
        />
      )}
    </div>
  );
}
