import React from "react";
import Select from "react-select";

import "./customSelect.css";

export const customStyles = {
  control: (provided, { selectProps: { haveBorder } }) => ({
    ...provided,
    minHeight: "36px",
    padding: "7px 10px",
    borderColor: haveBorder ? "#B0B0B0" : "transparent",
    boxShadow: "",
    "&:hover": {
      borderColor: "#848487",
    },
    borderRadius: "0",
    backgroundColor: "white",
    marginBottom: "10px",
  }),
  placeholder: (provided) => ({
    ...provided,
    textAlign: "left",
    fontFamily: `"Poppins", sans-serif`,
    color: "#373b7b",
    fontWeight: 400,
  }),
  singleValue: (provided) => ({
    ...provided,
    textAlign: "left",
    color: "#373b7b",
    fontWeight: 400,
    fontFamily: `"Poppins", sans-serif`,
  }),
};
function CustomSelect({
  options,
  haveBorder,
  placeholder,
  handleSelection,
  value,
  name,
}) {
  return (
    <div className="container">
      <Select
        value={value}
        onChange={(option) => handleSelection(option, name)}
        options={options}
        className="selectContainer"
        placeholder={placeholder}
        styles={customStyles}
        haveBorder={haveBorder}
        instanceId={placeholder}
      />
    </div>
  );
}

export default CustomSelect;
