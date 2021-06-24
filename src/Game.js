import React, { useState, useEffect } from "react";
import timeDelay from "./timeDelay";
import Lightbulb from "./Lightbulb";

const Game = ({ userName, bestScore, setBestScore, setScoreHistory }) => {
  const [isOn, setIsOn] = useState(true);
  const bulbList = ["one", "two", "three", "four", "five", "six"];
  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };
  const [isOver, setIsOver] = useState(false);
  const [play, setPlay] = useState(initPlay);
  const [flashColor, setFlashColor] = useState("");

  function startHandle() {
    setIsOn(true);
  }

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = bulbList[Math.floor(Math.random() * 6)];

      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  async function displayColors() {
    await timeDelay(1000);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await timeDelay(500);
      setFlashColor("");
      await timeDelay(500);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];

        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  }

  async function cardClickHandle(color) {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);
      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeDelay(100);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.score + 10,
            userColors: [],
          });
        }
      } else {
        await timeDelay(500);

        setPlay({ ...initPlay, score: play.score });
        setIsOver(true);
      }
      await timeDelay(500);
      setFlashColor("");
    }
  }

  function closeHandle() {
    if (play.score > bestScore) {
      setBestScore(play.score);
    }
    setScoreHistory((prev) => [...prev, play.score]);
    setIsOver(false);
    setIsOn(false);
  }

  return (
    <div className="board_wrapper">
      <div className="user_details">
        <span className="text_size">{userName}</span>

        <span className="text_size">{`Best Score: ${bestScore}`}</span>
      </div>
      <div className="board">
        <div className="lightbulb_wrapper">
          {bulbList &&
            bulbList.map((v, i) => (
              <Lightbulb
                onClick={() => {
                  cardClickHandle(v);
                }}
                flash={flashColor === v}
                color={v}
                key={i}
              ></Lightbulb>
            ))}
        </div>

        {isOn && !play.isDisplay && !play.userPlay && isOver && (
          <div className="lost">
            <div>Final Score: {play.score}</div>
            <button onClick={closeHandle}>Close</button>
          </div>
        )}
        {!isOn && !play.score && (
          <button onClick={startHandle} className="start_button">
            Start
          </button>
        )}
        {isOn && (play.isDisplay || play.userPlay) && (
          <div className="score">{`${play.score}`}</div>
        )}
      </div>
    </div>
  );
};

export default Game;
