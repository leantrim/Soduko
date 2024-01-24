import React from "react";
import Notifier, { Message_Type } from "./common/Notifier";
import { Board, Difficulty } from "../../types";
import Button, { BUTTON_TYPE } from "./common/Button";
import DifficultySelector from "./DifficultySelector";

type Props = {
  fetchError: string;
  handleChangeDifficulty: (type: Difficulty) => void;
  solveSudoku: (board: Board) => void;
  board: Board;
  isSolved: boolean;
};

const Header = (props: Props) => {
  const { board, fetchError, handleChangeDifficulty, isSolved, solveSudoku } =
    props;

  return (
    <div className="text-center flex flex-col gap-4 w-full">
      <h1 className="text-6xl font-semibold pt-4 text-gray-800">Sudoku</h1>
      <Notifier message={fetchError} type={Message_Type.Error} />
      <div className="flex justify-between w-full px-4 items-center gap-4 ">
        <DifficultySelector setDifficulty={handleChangeDifficulty} />
        <Button
          onClickButton={() => solveSudoku(board)}
          title="Solve"
          type={BUTTON_TYPE.primary}
          disabled={isSolved}
        />
      </div>
    </div>
  );
};

export default Header;
