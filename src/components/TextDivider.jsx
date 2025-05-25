import React from "react";

const TextDivider = ({ text = "", className = "" }) => {
  return (
    <div
      className={`text-center border-b border-b-border leading-[0.1em] ${className}`}
    >
      <span className="bg-background px-2.5">{text}</span>
    </div>
  );
};

export default TextDivider;