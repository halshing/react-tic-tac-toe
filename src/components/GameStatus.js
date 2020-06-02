import React from "react";

const GameStatus = ({ newGame }) => (
  <div className="status">
    <div className="btn-new-game">
      <button type="button" onClick={() => newGame()}>
        New Game
      </button>
    </div>
    <div className=""></div>
  </div>
);

export default GameStatus;
