import React, { useState } from "react";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
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

  const resetBoard = () => {
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
          if (validateColumn(0) || validateRow(0) || validateCross1())
            endGame();
          else keepPlaying();
          break;
        case col === 0 && row === 1:
          if (validateColumn(0) || validateRow(1)) endGame();
          else keepPlaying();
          break;
        case col === 0 && row === 2:
          if (validateColumn(0) || validateRow(2) || validateCross2())
            endGame();
          else keepPlaying();
          break;
        case col === 1 && row === 0:
          if (validateColumn(1) || validateRow(0)) endGame();
          else keepPlaying();
          break;
        case col === 1 && row === 1:
          if (
            validateColumn(1) ||
            validateRow(1) ||
            validateCross1() ||
            validateCross2()
          )
            endGame();
          else keepPlaying();
          break;
        case col === 1 && row === 2:
          if (validateColumn(1) || validateRow(2)) endGame();
          else keepPlaying();
          break;
        case col === 2 && row === 0:
          if (validateColumn(2) || validateRow(0) || validateCross2())
            endGame();
          else keepPlaying();
          break;
        case col === 2 && row === 1:
          if (validateColumn(2) || validateRow(1)) endGame();
          else keepPlaying();
          break;
        case col === 2 && row === 2:
          if (validateColumn(2) || validateRow(2) || validateCross1())
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
      <GameBoard board={board} validateMove={validateMove} />
      <GameStatus players={players} resetBoard={resetBoard} />
    </div>
  );
};

export default Game;
