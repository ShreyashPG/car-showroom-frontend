import React, { useState } from "react";
import Select from "react-select";
import {
  Internship,
 
  Certificate,
  
  EventParticipated,
  EventOrganized,

} from "../../components/EModule";

export default function General() {
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

  // A mapping of option values to their corresponding components
  const optionComponents = {
    Internship: Internship,
   
    "Certificate Course Attended": Certificate,
   
    "Event Participated": EventParticipated,
    "Event Organized": EventOrganized,
    
  };

  // Function to handle the option selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.value);
    console.log(event.value);
  };

  return (
    // <h1>Employee General</h1>
    <div className="h-full  " style={{ padding: "5px" }}>
      <div className="w-full mt-4 flex flex-col items-center justify-center space-y-2">
        <h2 className="text-slate-900 text-xl font-bold">
          Select your choice :
        </h2>
        <Select
          value={options.find((option) => option.value === selectedOption)}
          onChange={handleOptionChange}
          options={options}
          className="w-2/3"
        />
      </div>
      {selectedOption ? (
        // Render the selected component if an option is selected
        <div className="w-full mt-4 ">
          {React.createElement(optionComponents[selectedOption])}
        </div>
      ) : (
        <Internship />
      )}
    </div>
  );
}