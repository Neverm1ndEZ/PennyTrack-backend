import { Router } from "express";
import {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/income.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addIncome").post(verifyJWT, createIncome);
router.route("/getIncome").get(verifyJWT, getIncome);
router.route("/updateIncome/:id").patch(verifyJWT, updateIncome);
router.route("/deleteIncome/:id").delete(verifyJWT, deleteIncome);

export default router;
