export type Board = number[][];

export const EMPTY_VALUE = 0;

export type SudokuCell = {
  board: Board;
  row: number;
  column: number;
  number: number;
};

export enum Difficulty {
  Hard = 45,
  Medium = 35,
  Easy = 28,
}

export type SodukoType = {
  difficulty: Difficulty;
  board?: Board;
  cell?: SudokuCell;
};

export type LastSuccessType = {
  cell: number;
  row: number;
};

export enum API_ROUTES {
  MAIN = "sudoku",
  NEW_GAME = "new",
  VALIDATE_MOVE = "validateMove",
  VALIDATE_BOARD = "validateBoard",
  GET_SOLVED = "getSolved",
}
