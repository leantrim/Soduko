import { useEffect, useState } from "react";
import { Board, Difficulty, LastSuccessType } from "../../types";
import sudokuService from "@/services/sudokuService";

interface SudokuState {
  board: Board;
  isSolved: boolean;
  fetchError: string;
  difficulty: Difficulty;
  handleChangeDifficulty: (difficulty: Difficulty) => void;
  handleCellChange: (
    value: string,
    rowIndex: number,
    cellIndex: number
  ) => void;
  moveError: string;
  solveSudoku: (board: Board) => void;
  lastSuccessfullMove: LastSuccessType;
}

const useSudoku = (): SudokuState => {
  const [board, setBoard] = useState<Board>([]);
  const [fetchError, setFetchError] = useState<string>("");
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [moveError, setMoveError] = useState<string>("");
  const [lastSuccessfullMove, setLastSuccessfullMove] =
    useState<LastSuccessType>({
      cell: -1,
      row: -1,
    });

  useEffect(() => {
    getNewGame(difficulty);
  }, []);

  const handleChangeDifficulty = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    getNewGame(difficulty);
  };

  const getNewGame = async (difficulty: Difficulty) => {
    resetValues();
    await sudokuService
      .fetchNewGame(difficulty)
      .then((res) => {
        setBoard(res.data);
        setLastSuccessfullMove({ cell: -1, row: -1 });
      })
      .catch((err) => {
        setFetchError(err.response.data ?? err.message);
      });
  };

  const solveSudoku = async () => {
    await sudokuService
      .solveSudoku(board)
      .then((res) => {
        setBoard(res.data);
      })
      .catch((err) => {
        setFetchError(err.response.data ?? err.message);
      });
  };

  const handleCellChange = async (
    value: string,
    rowIndex: number,
    cellIndex: number
  ) => {
    const parsedValue = parseInt(value);
    await sudokuService
      .isLastMoveValid(parsedValue, rowIndex, cellIndex, board)
      .then((res) => {
        if (res.data) {
          if (res.data.moveValid === true) {
            const newBoard = [...board];
            newBoard[rowIndex][cellIndex] = parsedValue;
            setBoard(newBoard);
            setLastSuccessfullMove({ cell: cellIndex, row: rowIndex });
            if (res.data.solved === true) {
              setIsSolved(true);
            }
            setMoveError("");
          }
        } else {
          setMoveError(`${value} is not a valid number.`);
        }
      })
      .catch((err) => {
        setFetchError(err.response.data ?? err.message);
      });
  };

  const resetValues = () => {
    setFetchError("");
    setIsSolved(false);
    setDifficulty(Difficulty.Easy);
    setMoveError("");
    setLastSuccessfullMove({ cell: -1, row: -1 });
  };

  return {
    board,
    isSolved,
    fetchError,
    difficulty,
    handleChangeDifficulty,
    handleCellChange,
    moveError,
    solveSudoku,
    lastSuccessfullMove,
  };
};

export default useSudoku;
