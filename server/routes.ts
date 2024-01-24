import express from "express";
import sudoku from "../routes/sudoku";
import { API_ROUTES } from "../types";

const router = express.Router();

router.use(`/api/${API_ROUTES.MAIN}`, sudoku);

export default router;
