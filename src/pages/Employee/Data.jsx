import React, { useState } from "react";
import Select from "react-select";
import TableData from "../../components/EModule/Table Data/TableData";

export default function Data() {
  const [selectedOption, setSelectedOption] = useState("Internship");

  const options = [
    { value: "Internship", label: "Internship Details" },
  
  
    {
      value: "Certificate Course Attended",
      label: "Certificate Course Attended",
    },

    { value: "Event Participated", label: "Event Participated" },
    { value: "Event Organized", label: "Event Organized" },

  ];

  console.log("options:", options);

  const optionComponents = {
    Internship: TableData,
  
    "Certificate Course Attended": TableData,
   
    "Event Participated": TableData,
    "Event Organized": TableData,
    
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.value);
    console.log(event.value);
  };

  return (
    <>
      <div className="h-screen " style={{ padding: "15px" }}>
        <div className="w-full mt-4 flex flex-col items-center justify-center space-y-2">
          <h2 className="text-slate-900 text-xl font-bold">
            Select your choice:
          </h2>
          <Select
            value={options.find((option) => option.value === selectedOption)}
            onChange={handleOptionChange}
            options={options}
            className="w-2/3 "
          />
        </div>

        {selectedOption && optionComponents[selectedOption] ? (
          <div className="w-full mt-4 ">
            {React.createElement(optionComponents[selectedOption], {
              tableName: selectedOption,
            })}
          </div>
        ) : (
          <div>Component not found</div>
        )}
      </div>
    </>
  );
}
