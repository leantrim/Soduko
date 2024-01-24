import React from "react";
import Notifier, { Message_Type } from "./common/Notifier";

const Solved = () => {
  return (
    <Notifier
      message="Sudoku was succefully solved! Press one of the difficulty buttons to start a new game."
      type={Message_Type.Success}
    />
  );
};

export default Solved;
