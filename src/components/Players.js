import React from "react";

const Player = ({ player }) => (
  <div className="player">
    <div className="name">{player.name || player.id}</div>
    <div className="wins">{player.wins}</div>
  </div>
);

const Players = ({ players }) => {
  return (
    <div>
      <Player player={players.player1} />
      <Player player={players.draw} />
      <Player player={players.player2} />
    </div>
  );
};

export default Players;
