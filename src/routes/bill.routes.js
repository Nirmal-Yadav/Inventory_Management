import express from "express";
import { createBill } from "../controllers/bill.controllers.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";

const router = express.Router();

router.post("/create", verifyJwt, createBill);

export default router;
