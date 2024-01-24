import React from "react";
import { Board, LastSuccessType } from "../../types";
import { EMPTY } from "./Suduko";
import clsx from "clsx";

type Props = {
  board: Board;
  handleCellChange: (
    value: string,
    rowIndex: number,
    cellIndex: number
  ) => void;
  lastSuccessfullMove: LastSuccessType;
};

const SudokuBoard = (props: Props) => {
  const { board, handleCellChange, lastSuccessfullMove } = props;

  return (
    <div className="grid grid-cols-3 sm:h-screen max-w-xl max-h-[576px] rounded-md bg-blue-200">
      {board?.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-3 border-2 border-gray-500 text-center"
        >
          {row.map((cell, cellIndex) => {
            return (
              <input
                key={cellIndex}
                type="tel"
                min="1"
                max="9"
                className={clsx(
                  {
                    "bg-green-300":
                      lastSuccessfullMove?.row === rowIndex &&
                      lastSuccessfullMove?.cell === cellIndex,
                  },
                  "border-black border-2 text-center hide-input-arrows sm:text-4xl bg-white"
                )}
                value={cell === EMPTY ? "" : cell}
                onChange={(e) => {
                  handleCellChange(e.target.value, rowIndex, cellIndex);
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
