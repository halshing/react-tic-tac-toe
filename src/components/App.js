import React, { useState, useRef } from "react";
import Game from "./Game";
import GameType from "./GameType";
import { GAME_TYPES } from "../utils/constants";
import "../styles/App.scss";

const App = () => {
  const [gameType, setGameType] = useState(GAME_TYPES.PvC);

  const newGameRef = useRef();

  const resetGame = (value) => {
    setGameType(value);
    newGameRef.current.callback({ gameType: value });
  };

  const newGame = (callback) => {
    newGameRef.current = { callback };
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <GameType setGameType={resetGame} gameType={gameType} />
      <Game gameType={gameType} newGame={newGame} />
    </div>
  );
};

export default App;
