"use client";
import clsx from "clsx";
import React from "react";

export enum BUTTON_TYPE {
  primary,
  secondary,
  neutral,
}

const Button = ({
  title,
  onClickButton,
  type = BUTTON_TYPE.primary,
  disabled = false,
}: {
  title: string;
  onClickButton: () => void;
  type: BUTTON_TYPE;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClickButton}
      className={clsx(
        "p-1 px-2 rounded-xl",
        type === BUTTON_TYPE.primary && "bg-green-500 text-white",
        type === BUTTON_TYPE.secondary && "bg-green-500 text-black",
        type === BUTTON_TYPE.neutral && "bg-gray-300 text-black"
      )}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
