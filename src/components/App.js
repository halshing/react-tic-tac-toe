import React from "react";
import Game from "./Game";
import "../styles/App.scss";

const App = () => {
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Game />
    </div>
  );
};

export default App;
