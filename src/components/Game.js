import React, { useState } from "react";
import GameStatus from "./GameStatus";
import GameBoard from "./GameBoard";

const boardLayout = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const Game = () => {
  const [board, setBoard] = useState(boardLayout);
  const [player, setNextPlayer] = useState(true);
  const [winner, setWinner] = useState(null);
  const [moves, countMoves] = useState(9);

  const validateColumn = (col) => {
    return []
      .concat(board[col][0], board[col][1], board[col][2])
      .every((val) => val === player);
  };

  const validateRow = (row) => {
    return []
      .concat(board[0][row], board[1][row], board[2][row])
      .every((val) => val === player);
  };

  const validateCross1 = () => {
    return []
      .concat(board[0][0], board[1][1], board[2][2])
      .every((val) => val === player);
  };

  const validateCross2 = () => {
    return []
      .concat(board[0][2], board[1][1], board[2][0])
      .every((val) => val === player);
  };

  const validateMove = (value, cell) => {
    if (typeof winner === "boolean" || moves === 0) return;

    if (value === null) {
      let col = cell[0];
      let row = cell[1];

      let _board = [...board];
      _board[col][row] = player;

      setBoard(_board);

      switch (true) {
        case col === 0 && row === 0:
          if (validateRow(0) || validateColumn(0) || validateCross1())
            setWinner(player);
          else setNextPlayer(!player);
          break;
        case col === 0 && row === 1:
          if (validateRow(1) || validateColumn(0)) setWinner(player);
          else setNextPlayer(!player);
          break;
        case col === 0 && row === 2:
          if (validateRow(2) || validateColumn(0) || validateCross2())
            setWinner(player);
          else setNextPlayer(!player);
          break;
        case col === 1 && row === 0:
          if (validateRow(0) || validateColumn(1)) setWinner(player);
          else setNextPlayer(!player);
          break;
        case col === 1 && row === 1:
          if (
            validateRow(1) ||
            validateColumn(1) ||
            validateCross1() ||
            validateCross2()
          )
            setWinner(player);
          else setNextPlayer(!player);
          break;
        case col === 1 && row === 2:
          if (validateRow(2) || validateColumn(1)) setWinner(player);
          else setNextPlayer(!player);
          break;
        case col === 2 && row === 0:
          if (validateRow(0) || validateColumn(2) || validateCross2())
            setWinner(player);
          else setNextPlayer(!player);
          break;
        case col === 2 && row === 1:
          if (validateRow(1) || validateColumn(2)) setWinner(player);
          else setNextPlayer(!player);
          break;
        case col === 2 && row === 2:
          if (validateRow(2) || validateColumn(2) || validateCross1())
            setWinner(player);
          else setNextPlayer(!player);
          break;
        default:
          break;
      }

      countMoves(moves - 1);
    }
  };

  return (
    <div className="game">
      <GameStatus player={player} winner={winner} draw={moves === 0} />
      <GameBoard board={board} validateMove={validateMove} />
    </div>
  );
};

export default Game;
