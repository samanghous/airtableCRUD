import express from "express";
import { getTable } from "../controllers/getTable.js";
import { addInTable } from "../controllers/addInTable.js";
import { updateTable } from "../controllers/updateTable.js";
import { deleteInTable } from "../controllers/deleteInTable.js";

const router = express.Router();


router.get("/getTable", getTable);
router.post("/addInTable", addInTable);
router.post("/updateTable", updateTable);
router.delete("/deleteInTable", deleteInTable);

export default router;