import React from "react";
import classnames from "classnames";
import getBorderStyling from "../utils/getBorderStyling";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as Cross } from "@fortawesome/free-solid-svg-icons";
import { faCircle as Circle } from "@fortawesome/free-regular-svg-icons";

const GameBoard = ({ board, validateMove }) => {
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
                className={classnames("cell", border)}
                onClick={() => validateMove(value, [c, r])}
              >
                {typeof value === "boolean" && (
                  <FontAwesomeIcon icon={value === true ? Cross : Circle} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
