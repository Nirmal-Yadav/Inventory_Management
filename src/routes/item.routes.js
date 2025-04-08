import express from "express";
import { addItems, updateItem } from "../controllers/item.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";

const router = express.Router();

router.route("/add").post(verifyJwt, addItems);
router.route("/update").post(verifyJwt, updateItem);

export default router;
