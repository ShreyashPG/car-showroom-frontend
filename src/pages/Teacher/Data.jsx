import React, { useState } from "react";
import Select from "react-select";
import TableData from "./../../components/TModule/Table Data/TableData";
import { useLocation, useNavigate } from "react-router-dom";

export default function Data() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialTableName =  "Book Publication";
  
  const [selectedOption, setSelectedOption] = useState(initialTableName);
  // const navigate = useNavigate();
  console.log('selected in data: ',selectedOption);
  const options = [
    
    { value: "Grants", label: "Grants" },
    { value: "Consultancy Report", label: "Consultancy Report" },
    
    {
      value: "STTP/FDP/Workshop/Conference Attended",
      label: "STTP/FDP/Workshop/Conference Attended",
    },
    
    
    {
      value: "Industrial Visits / Tours / Field Trip",
      label: "Industrial Visits / Tours / Field Trip",
    },
    
  ];

  const optionComponents = {
  
    Grants: TableData,
    "Consultancy Report": TableData,
    
    "STTP/FDP/Workshop/Conference Attended": TableData,
   
    "Industrial Visits / Tours / Field Trip": TableData,
   
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);

  };
  return (
    <>
      <div className="w-full mt-4 flex flex-col items-center justify-center gap-2 ">
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
    </>
  );
}
