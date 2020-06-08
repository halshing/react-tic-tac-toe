import React from "react";
import { GAME_TYPES } from "../utils/constants";

const GameType = ({ setGameType }) => (
  <div>
    <button type="button" onClick={() => setGameType(GAME_TYPES.PvP)}>
      Local Players
    </button>
    <button type="button" onClick={() => setGameType(GAME_TYPES.PvC)}>
      Player v. Computer
    </button>
    <button type="button" onClick={() => setGameType(GAME_TYPES.Online)}>
      Online Players
    </button>
  </div>
);

export default GameType;
