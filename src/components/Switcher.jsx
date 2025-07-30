import React, { useState } from "react";

const Switcher = ({
  isChecked,
  setIsChecked,
  backgroundColor,
  color,
  firstOption = "option-1",
  secondOption = "option-2",
  className,
}) => {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label
      className={`h-10 w-40 bg-black/60 backdrop-blur-sm relative rounded-full select-none cursor-pointer flex overflow-hidden border border-black outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`}
      style={{
        backgroundColor: backgroundColor + "60",
        borderColor: backgroundColor,
      }}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div
        className={`h-full w-20 bg-success rounded-full transition-all absolute left-0 ${
          isChecked && "left-20"
        }`}
        style={{ backgroundColor: backgroundColor }}
      ></div>
      <span
        className="transition relative w-20 h-full flex items-center justify-center text-white"
        style={{ color: color }}
      >
        {firstOption}
      </span>
      <span
        className="transition relative w-20 h-full flex items-center justify-center text-white"
        style={{ color: color }}
      >
        {secondOption}
      </span>
    </label>
  );
};

export default Switcher;
