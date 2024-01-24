import { Board, Difficulty, EMPTY_VALUE } from "../types";

export function solveSudoku(board: Board): Board | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === EMPTY_VALUE) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

        for (const num of shuffledNumbers) {
          if (isValidMove(board, num, row, col)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
              return board;
            }

            board[row][col] = EMPTY_VALUE;
          }
        }

        return null;
      }
    }
  }

  return board;
}

export function isValidMove(
  board: Board,
  number: number,
  row: number,
  col: number
): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === number || board[i][col] === number) {
      return false;
    }
  }

  const startingRow = Math.floor(row / 3) * 3;
  const startingColumn = Math.floor(col / 3) * 3;

  for (let i = startingRow; i < startingRow + 3; i++) {
    for (let j = startingColumn; j < startingColumn + 3; j++) {
      if (board[i][j] === number) {
        return false;
      }
    }
  }

  return true;
}

export function isBoardSolved(board: Board): boolean {
  let emptyCells = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === EMPTY_VALUE) {
        emptyCells++;
      }
    }
  }
  // This function only gets called on a successfull move  thus we can assume that if there is only one empty cell left, the board is solved.
  if (emptyCells > 1) return false;
  return true;
}

export function generateSoduko(difficulty: Difficulty): Board | null {
  const emptyBoard: Board = Array(9)
    .fill(null)
    .map(() => Array(9).fill(EMPTY_VALUE));

  const board: Board | null = solveSudoku(emptyBoard);
  if (board === null) return null;

  return hideCellsBasedOnDifficulty(board, difficulty);
}

function hideCellsBasedOnDifficulty(board: Board, difficulty: Difficulty) {
  let hidden = 0;

  while (hidden < difficulty) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (board[row][col] !== EMPTY_VALUE) {
      board[row][col] = EMPTY_VALUE;
      hidden++;
    }
  }

  return board;
}
