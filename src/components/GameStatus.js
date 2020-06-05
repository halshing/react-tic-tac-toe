import React from "react";
import Players from "./Players";

const GameStatus = ({ currentPlayer, players, winner, draw, resetBoard }) => (
  <div className="status">
    <Players currentPlayer={currentPlayer} players={players} winner={winner} draw={draw} />
    <div className="btn-new-game">
      <button type="button" onClick={() => resetBoard()}>
        Reset Board
      </button>
    </div>
  </div>
);

export default GameStatus;
