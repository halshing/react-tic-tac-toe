import React from "react";
import classnames from "classnames";
import { GAME_TYPES } from "../utils/constants";

const GameType = ({ setGameType, gameType }) => (
  <div className="gameTypes">
    <button
      type="button"
      className={classnames({ selected: gameType === GAME_TYPES.PvP })}
      onClick={() => setGameType(GAME_TYPES.PvP)}
    >
      Local Players
    </button>
    <button
      type="button"
      className={classnames({ selected: gameType === GAME_TYPES.PvC })}
      onClick={() => setGameType(GAME_TYPES.PvC)}
    >
      Player v. Computer
    </button>
    <button
      type="button"
      className={classnames({ selected: gameType === GAME_TYPES.Online })}
      onClick={() => setGameType(GAME_TYPES.Online)}
    >
      Online Players
    </button>
  </div>
);

export default GameType;
