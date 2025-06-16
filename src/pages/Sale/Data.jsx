import React, { useState } from "react";
import Select from "react-select";
import TableData from "./../../components/SModule/Table Data/TableData";
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
    
    { value: "MonthlySales", label: "MonthlySales" },
    { value: "Stock Report", label: "Stock Report" },
    
    {
      value: "Profit/Loss/Report",
      label: "Profit/Loss/Report",
    },
    
    
    {
      value: "Lead Conversions",
      label: "Lead Conversions",
    },
    
  ];

  const optionComponents = {
  
    MonthlySales: TableData,
    "Stock Report": TableData,
    
    "Profit/Loss/Report": TableData,
   
    "Lead Conversions": TableData,
   
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
