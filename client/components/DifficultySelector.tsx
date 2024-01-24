"use client";
import React from "react";
import Button, { BUTTON_TYPE } from "./common/Button";
import { Difficulty } from "../../types";

type Props = {
  setDifficulty: (type: Difficulty) => void;
};

const DifficultySelector = ({ setDifficulty }: Props) => {
  return (
    <div className="flex gap-4">
      <Button
        onClickButton={() => setDifficulty(Difficulty.Easy)}
        title="Easy"
        type={BUTTON_TYPE.neutral}
      />
      <Button
        onClickButton={() => setDifficulty(Difficulty.Medium)}
        title="Medium"
        type={BUTTON_TYPE.neutral}
      />
      <Button
        onClickButton={() => setDifficulty(Difficulty.Hard)}
        title="Hard"
        type={BUTTON_TYPE.neutral}
      />
    </div>
  );
};

export default DifficultySelector;
