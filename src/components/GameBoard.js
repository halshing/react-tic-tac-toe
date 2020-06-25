import React from "react";
import classnames from "classnames";
import getBorderStyling from "../utils/getBorderStyling";
import { PlayerIcon1, PlayerIcon2 } from "./PlayerIcons";
import { PLAYER_KEYS } from "../utils/constants";

const GameBoard = ({ board, clickable, validateMove, winningCells }) => {
  return (
    <div className="board">
      {board.map((col, c) => (
        <div
          key={c}
          className={classnames("col", {
            col1: c === 0,
            col2: c === 1,
            col3: c === 2,
          })}
        >
          {col.map((value, r) => {
            let border = getBorderStyling(c, r);
            return (
              <div
                key={r}
                className={classnames("cell", border, {
                  winner:
                    winningCells &&
                    winningCells.some((cell) => cell[0] === c && cell[1] === r),
                })}
                onClick={() => clickable && validateMove(value, [c, r])}
              >
                {typeof value === "string" &&
                  (value === PLAYER_KEYS.PLAYER1 ? (
                    <PlayerIcon1 />
                  ) : (
                    <PlayerIcon2 />
                  ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
