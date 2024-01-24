import express, { Request, Response } from "express";
import { validateSudoku } from "../model/Sudoku";
import {
  generateSoduko,
  isBoardSolved,
  solveSudoku,
} from "../lib/sudokuHelper";
import { API_ROUTES, SudokuCell } from "../types";

const router = express.Router();

router.post(`/${API_ROUTES.NEW_GAME}`, async (req: Request, res: Response) => {
  const { error } = validateSudoku(req.body);

  if (error) return res.status(404).send(error.message);

  const board = generateSoduko(req.body.difficulty);

  res.status(200).send(board);
});

router.post(
  `/${API_ROUTES.VALIDATE_MOVE}`,
  async (req: Request, res: Response) => {
    const { error } = validateSudoku(req.body);
    if (error) return res.status(404).send(error.message);

    const {
      board: originalBoard,
      column,
      number,
      row,
    } = req.body.cell as SudokuCell;

    const board = JSON.parse(JSON.stringify(originalBoard));

    const solvedBoard = solveSudoku(board);

    if (!solvedBoard) return res.status(404).send("Board is not valid.");

    if (solvedBoard[row][column] === number) {
      if (isBoardSolved(originalBoard)) {
        res.status(200).send({ solved: true, moveValid: true });
      } else {
        res.status(200).send({ solved: false, moveValid: true });
      }
    } else {
      res.status(200).send(false);
    }
  }
);

router.post(
  `/${API_ROUTES.GET_SOLVED}`,
  async (req: Request, res: Response) => {
    const { error } = validateSudoku(req.body);

    if (error) return res.status(404).send(error.message);

    const solvedBoard = solveSudoku(req.body.board);

    res.status(200).send(solvedBoard);
  }
);

export default router;
