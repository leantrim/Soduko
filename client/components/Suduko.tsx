"use client";
import React from "react";
import DifficultySelector from "./DifficultySelector";
import useSudoku from "@/hooks/useSudoku";
import Button, { BUTTON_TYPE } from "./common/Button";
import SudokuBoard from "./SudokuBoard";
import Notifier, { Message_Type } from "./common/Notifier";
import Solved from "./SolvedNotice";
import Header from "./Header";

export const EMPTY = 0;

const Suduko = () => {
  const {
    board,
    fetchError,
    handleChangeDifficulty,
    handleCellChange,
    moveError,
    solveSudoku,
    lastSuccessfullMove,
    isSolved,
  } = useSudoku();

  return (
    <div className="flex items-center flex-col gap-4 h-full">
      <Header
        board={board}
        fetchError={fetchError}
        handleChangeDifficulty={handleChangeDifficulty}
        isSolved={isSolved}
        solveSudoku={solveSudoku}
      />
      <Notifier message={moveError} type={Message_Type.Error} />
      {isSolved ? (
        <Solved />
      ) : (
        <SudokuBoard
          board={board}
          handleCellChange={handleCellChange}
          lastSuccessfullMove={lastSuccessfullMove}
        />
      )}
    </div>
  );
};

export default Suduko;
