import React from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes as Cross,
  faEquals as Draw,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as Circle } from "@fortawesome/free-regular-svg-icons";

const GameStatus = ({ player, winner, draw }) => (
  <div className="status">
    {draw ? (
      <>
        <div>Draw:</div>
        <FontAwesomeIcon icon={Draw} />
      </>
    ) : typeof winner === "boolean" ? (
      <>
        <div>Winner:</div>
        <FontAwesomeIcon icon={winner === true ? Cross : Circle} />
      </>
    ) : (
      <>
        <div>Current Player:</div>
        <FontAwesomeIcon icon={player === true ? Cross : Circle} />
      </>
    )}
  </div>
);

export default GameStatus;
