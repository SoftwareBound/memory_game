import React from "react";

const Welcome = ({ userName, setUserName, setDisplayGame }) => {
  const handleChange = (e) => {
    setUserName(e.target.value);
  };
  const handleClick = () => {
    if (userName === "") {
      alert("Please provide name");
    } else {
      setDisplayGame(true);
    }
  };
  return (
    <div className="welcome_container">
      <h1>Nice Game</h1>
      <input
        placeholder="Enter your name"
        onChange={handleChange}
        value={userName}
        className="text_size"
      />
      <button onClick={handleClick} className="text_size">
        Start
      </button>
    </div>
  );
};

export default Welcome;
