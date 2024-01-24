import clsx from "clsx";
import React from "react";

export enum Message_Type {
  Success,
  Error,
}

type Props = {
  message: string;
  type: Message_Type;
};

const Notifier = ({ message, type }: Props) => {
  return (
    message && (
      <div
        className={clsx(
          "w-full text-center bg-white p-2 border-l-4 rounded-sm border-green-500",
          type === Message_Type.Error && "border-red-500"
        )}
      >
        {message}
      </div>
    )
  );
};

export default Notifier;
