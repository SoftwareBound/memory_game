import React from "react";

const Lightbulb = ({ color, onClick, flash }) => {
  return (
    <div
      onClick={onClick}
      className={`lightbulb ${color} ${flash ? "flash" : ""}`}
    ></div>
  );
};

export default Lightbulb;
