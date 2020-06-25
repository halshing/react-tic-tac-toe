import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
import playComputer from "../utils/playComputer";
import { PLAYER_KEYS, GAME_TYPES } from "../utils/constants";

const Game = ({ gameType, newGame }) => {
  const boardLayout = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const playerModel = { name: "", wins: 0 };

  const setInitialPlayers = (props) => ({
    player1: { id: "Player 1", ...playerModel },
    draw: { id: "Tie", ...playerModel },
    player2: {
      id: "Player 2",
      ...playerModel,
      name: props.gameType === GAME_TYPES.PvC ? "Computer" : "",
    },
  });

  const initialPlayers = setInitialPlayers({ gameType });

  const [players, setPlayers] = useState(initialPlayers);
  const [board, setBoard] = useState(boardLayout);
  const [player, setNextPlayer] = useState(PLAYER_KEYS.PLAYER1);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState(null);
  const [moves, countMoves] = useState(9);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    if (gameType === GAME_TYPES.PvC && player === PLAYER_KEYS.PLAYER2) {
      const timer = setTimeout(() => {
        playComputer({ board, validateMove });
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  useEffect(() => {
    newGame(resetGame);
  });

  const resetGame = (props) => {
    resetBoard();
    setPlayers(setInitialPlayers({ gameType: props.gameType }));
  };

  const resetBoard = () => {
    setBoard(boardLayout);
    setNextPlayer(
      gamesPlayed % 2 === 0 ? PLAYER_KEYS.PLAYER1 : PLAYER_KEYS.PLAYER2
    );
    setWinner(null);
    countMoves(9);
    setWinningCells(null);
  };

  const endGame = (cells) => {
    setWinner(player);
    setGamesPlayed((prev) => prev + 1);
    setPlayers((prev) => ({
      ...prev,
      [player]: { ...prev[player], wins: prev[player].wins + 1 },
    }));
    setWinningCells(cells);
  };

  const keepPlaying = () => {
    setNextPlayer((prev) =>
      prev === PLAYER_KEYS.PLAYER1 ? PLAYER_KEYS.PLAYER2 : PLAYER_KEYS.PLAYER1
    );
    if (moves === 1) {
      setPlayers((prev) => ({
        ...prev,
        draw: { ...prev.draw, wins: prev.draw.wins + 1 },
      }));
      setGamesPlayed((prev) => prev + 1);
    }
  };

  const validateColumn = (col) => {
    return []
      .concat(board[col][0], board[col][1], board[col][2])
      .every((val) => val === player)
      ? [
          [col, 0],
          [col, 1],
          [col, 2],
        ]
      : false;
  };

  const validateRow = (row) => {
    return []
      .concat(board[0][row], board[1][row], board[2][row])
      .every((val) => val === player)
      ? [
          [0, row],
          [1, row],
          [2, row],
        ]
      : false;
  };

  const validateCross1 = () => {
    return []
      .concat(board[0][0], board[1][1], board[2][2])
      .every((val) => val === player)
      ? [
          [0, 0],
          [1, 1],
          [2, 2],
        ]
      : false;
  };

  const validateCross2 = () => {
    return []
      .concat(board[0][2], board[1][1], board[2][0])
      .every((val) => val === player)
      ? [
          [0, 2],
          [1, 1],
          [2, 0],
        ]
      : false;
  };

  const validateMove = (value, cell) => {
    if (winner !== null || moves === 0) return;

    if (value === null) {
      let col = cell[0];
      let row = cell[1];

      let _board = [...board];
      _board[col][row] = player;

      setBoard(_board);

      let cells;

      switch (true) {
        case col === 0 && row === 0:
          cells = validateColumn(0) || validateRow(0) || validateCross1();
          if (Array.isArray(cells)) endGame(cells);
          else keepPlaying();
          break;
        case col === 0 && row === 1:
          cells = validateColumn(0) || validateRow(1);
          if (Array.isArray(cells)) endGame(cells);
          else keepPlaying();
          break;
        case col === 0 && row === 2:
          cells = validateColumn(0) || validateRow(2) || validateCross2();
          if (Array.isArray(cells)) endGame(cells);
          else keepPlaying();
          break;
        case col === 1 && row === 0:
          cells = validateColumn(1) || validateRow(0);
          if (Array.isArray(cells)) endGame(cells);
          else keepPlaying();
          break;
        case col === 1 && row === 1:
          cells =
            validateColumn(1) ||
            validateRow(1) ||
            validateCross1() ||
            validateCross2();
          if (Array.isArray(cells)) endGame(cells);
          else keepPlaying();
          break;
        case col === 1 && row === 2:
          cells = validateColumn(1) || validateRow(2);
          if (Array.isArray(cells)) endGame(cells);
          else keepPlaying();
          break;
        case col === 2 && row === 0:
          cells = validateColumn(2) || validateRow(0) || validateCross2();
          if (Array.isArray(cells)) endGame(cells);
          else keepPlaying();
          break;
        case col === 2 && row === 1:
          cells = validateColumn(2) || validateRow(1);
          if (Array.isArray(cells)) endGame(cells);
          else keepPlaying();
          break;
        case col === 2 && row === 2:
          cells = validateColumn(2) || validateRow(2) || validateCross1();
          if (Array.isArray(cells)) endGame(cells);
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
      <GameBoard
        board={board}
        clickable={
          gameType === GAME_TYPES.PvP ||
          (gameType === GAME_TYPES.PvC && player === PLAYER_KEYS.PLAYER1)
        }
        validateMove={validateMove}
        winningCells={winningCells}
      />
      <GameStatus
        currentPlayer={player}
        players={players}
        resetBoard={resetBoard}
        winner={winner}
        draw={winner === null && moves === 0}
      />
    </div>
  );
};

export default Game;
