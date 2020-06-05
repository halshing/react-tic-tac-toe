import React from "react";
import classnames from "classnames";
import { KEYS } from "../utils/player-keys";

const Player = ({ player, turn, winner }) => (
  <div className="player">
    <div className="name">
      <i className={classnames({ turn })}></i>
      {player.name || player.id}
    </div>
    <div className={classnames("wins", { winner })}>{player.wins}</div>
  </div>
);

const Players = ({ currentPlayer, players, winner, draw }) => {
  return (
    <>
      <Player
        player={players.player1}
        turn={currentPlayer === KEYS.PLAYER1}
        winner={winner === KEYS.PLAYER1}
      />
      <Player player={players.draw} winner={draw} />
      <Player
        player={players.player2}
        turn={currentPlayer === KEYS.PLAYER2}
        winner={winner === KEYS.PLAYER2}
      />
    </>
  );
};

export default Players;
