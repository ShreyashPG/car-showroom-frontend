import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  ProfitLoss,

  StockReport,
 
  MonthlySales,
  LeadConversions,
 
} from "../../components/SModule";

import { useLocation, useNavigate } from "react-router-dom";

export default function General() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialTableName = queryParams.get("tableName") || "Book Publication";

  const [selectedOption, setSelectedOption] = useState(initialTableName);

  useEffect(() => {
    setSelectedOption(initialTableName);
  }, [initialTableName]);

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
   
    MonthlySales: MonthlySales,
    "Stock Report": StockReport,
   
    "Profit/Loss/Report": ProfitLoss,
   
    "Lead Conversions": LeadConversions,
   
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    // navigate(`/data/general?tableName=${selectedOption.value}`);
    navigate(`/t/general?tableName=${selectedOption.value}`);

  };

  return (
    <div className="h-full" style={{ padding: "5px" }}>
      <div className="w-full mt-4 flex flex-col items-center justify-center space-y-2">
        <h2 className="text-slate-900 text-xl font-bold">Select your choice :</h2>
        <Select
          value={options.find((option) => option.value === selectedOption)}
          onChange={handleOptionChange}
          options={options}
          className="w-2/3"
        />
      </div>
      {selectedOption ? (
        <div className="w-full mt-4">
          {React.createElement(optionComponents[selectedOption])}
        </div>
      ) : (
        <MonthlySales />
      )}
    </div>
  );
}
