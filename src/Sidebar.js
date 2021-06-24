import React from "react";

const Sidebar = ({ userName, scoreHistory }) => {
  scoreHistory.sort().reverse();
  return (
    <div className="sidebar">
      <h3>Score History</h3>
      <div>
        <h4>{userName}</h4>
        <div>{Date()}</div>
        <div>
          <h4>Scores</h4>
          {scoreHistory.map((score, i) => (
            <div key={i} className="sidebar_details">{`${
              i + 1
            }. ${score} `}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
