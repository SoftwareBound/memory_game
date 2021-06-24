import "./App.css";
import Welcome from "./Welcome";
import React, { useState } from "react";
import Game from "./Game";
import Sidebar from "./Sidebar";

const App = () => {
  const [userName, setUserName] = useState("");
  const [bestScore, setBestScore] = useState(0);
  const [displayGame, setDisplayGame] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);

  return (
    <div className="container">
      {displayGame ? (
        <div className="game_container">
          <Sidebar
            userName={userName}
            bestScore={bestScore}
            scoreHistory={scoreHistory}
          />
          <Game
            userName={userName}
            bestScore={bestScore}
            setBestScore={setBestScore}
            setScoreHistory={setScoreHistory}
          />
        </div>
      ) : (
        <Welcome
          userName={userName}
          setUserName={setUserName}
          setDisplayGame={setDisplayGame}
          className="welcome_container"
        />
      )}
    </div>
  );
};

export default App;
