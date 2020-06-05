import React from "react";
import Players from "./Players";

const GameStatus = ({ players, resetBoard }) => (
  <div className="status">
    <Players players={players} />
    <div className="btn-new-game">
      <button type="button" onClick={() => resetBoard()}>
        Reset Board
      </button>
    </div>
  </div>
);

export default GameStatus;
