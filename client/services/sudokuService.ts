import axios from "axios";
import { API_ROUTES, Board, Difficulty } from "../../types";

const isDev = process.env.NEXT_PUBLIC_NODE_ENV === "development";

const BACKEND_URL = isDev
  ? "http://localhost:8000/api"
  : "https://leanprivate.ew.r.appspot.com/api";

function fetchNewGame(difficulty: Difficulty) {
  return axios.post(
    `${BACKEND_URL}/${API_ROUTES.MAIN}/${API_ROUTES.NEW_GAME}`,
    { difficulty: difficulty }
  );
}

function solveSudoku(board: Board) {
  return axios.post(
    `${BACKEND_URL}/${API_ROUTES.MAIN}/${API_ROUTES.GET_SOLVED}`,
    { board }
  );
}

function isLastMoveValid(
  number: number,
  row: number,
  col: number,
  board: Board
) {
  return axios.post(
    `${BACKEND_URL}/${API_ROUTES.MAIN}/${API_ROUTES.VALIDATE_MOVE}`,
    {
      cell: {
        number: number,
        row: row,
        column: col,
        board: board,
      },
    }
  );
}

const exportedObject = {
  fetchNewGame,
  isLastMoveValid,
  solveSudoku,
};

export default exportedObject;
