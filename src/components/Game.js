import React, { useState } from "react";
import GameStatus from "./GameStatus";
import GameBoard from "./GameBoard";
import Players from "./Players";
import { KEYS } from "../utils/player-keys";

const Game = () => {
  const boardLayout = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const playerModel = { name: "", wins: 0 };

  const [players, setPlayers] = useState({
    player1: { id: "Player 1", ...playerModel },
    draw: { id: "Tie", ...playerModel },
    player2: { id: "Player 2", ...playerModel },
  });
  const [board, setBoard] = useState(boardLayout);
  const [player, setNextPlayer] = useState(KEYS.PLAYER1);
  const [winner, setWinner] = useState(null);
  const [moves, countMoves] = useState(9);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const newGame = () => {
    setBoard(boardLayout);
    setNextPlayer(gamesPlayed % 2 === 0 ? KEYS.PLAYER1 : KEYS.PLAYER2);
    setWinner(null);
    countMoves(9);
  };

  const endGame = () => {
    setWinner(player);
    setGamesPlayed((prev) => prev + 1);
    setPlayers((prev) => ({
      ...prev,
      [player]: { ...prev[player], wins: prev[player].wins + 1 },
    }));
  };

  const keepPlaying = () => {
    setNextPlayer((prev) =>
      prev === KEYS.PLAYER1 ? KEYS.PLAYER2 : KEYS.PLAYER1
    );
    if (moves === 1)
      setPlayers((prev) => ({
        ...prev,
        draw: { ...prev.draw, wins: prev.draw.wins + 1 },
      }));
  };

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
    if (winner !== null || moves === 0) return;

    if (value === null) {
      let col = cell[0];
      let row = cell[1];

      let _board = [...board];
      _board[col][row] = player;

      setBoard(_board);

      switch (true) {
        case col === 0 && row === 0:
          if (validateRow(0) || validateColumn(0) || validateCross1())
            endGame();
          else keepPlaying();
          break;
        case col === 0 && row === 1:
          if (validateRow(1) || validateColumn(0)) endGame();
          else keepPlaying();
          break;
        case col === 0 && row === 2:
          if (validateRow(2) || validateColumn(0) || validateCross2())
            endGame();
          else keepPlaying();
          break;
        case col === 1 && row === 0:
          if (validateRow(0) || validateColumn(1)) endGame();
          else keepPlaying();
          break;
        case col === 1 && row === 1:
          if (
            validateRow(1) ||
            validateColumn(1) ||
            validateCross1() ||
            validateCross2()
          )
            endGame();
          else keepPlaying();
          break;
        case col === 1 && row === 2:
          if (validateRow(2) || validateColumn(1)) endGame();
          else keepPlaying();
          break;
        case col === 2 && row === 0:
          if (validateRow(0) || validateColumn(2) || validateCross2())
            endGame();
          else keepPlaying();
          break;
        case col === 2 && row === 1:
          if (validateRow(1) || validateColumn(2)) endGame();
          else keepPlaying();
          break;
        case col === 2 && row === 2:
          if (validateRow(2) || validateColumn(2) || validateCross1())
            endGame();
          else keepPlaying();
          break;
        default:
          break;
      }
      countMoves((prev) => prev - 1);
    }
  };

  return (
    <div className="game">
      <div>
        <GameBoard board={board} validateMove={validateMove} />
        <GameStatus newGame={newGame} />
      </div>
      <div>
        <Players players={players} />
      </div>
    </div>
  );
};

export default Game;
