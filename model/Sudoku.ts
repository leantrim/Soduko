import Joi from "joi";
import { Difficulty, SodukoType } from "../types";

function validateSudoku(sudoku: SodukoType) {
  const schema = Joi.object<SodukoType>({
    difficulty: Joi.number().valid(
      Difficulty.Hard,
      Difficulty.Medium,
      Difficulty.Easy
    ),
    board: Joi.array().items(Joi.array().items(Joi.number())),
    cell: Joi.object({
      board: Joi.array().items(Joi.array().items(Joi.number())).required(),
      row: Joi.number().required(),
      column: Joi.number().required(),
      number: Joi.number().required(),
    }),
  });

  return schema.validate(sudoku);
}

export { validateSudoku };
