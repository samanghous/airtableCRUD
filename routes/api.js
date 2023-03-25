import express from "express";
import { getTable } from "../controllers/getTable.js";
import { addInTable } from "../controllers/addInTable.js";
import { updateTable } from "../controllers/updateTable.js";
import { deleteInTable } from "../controllers/deleteInTable.js";
import { sendMailAPI } from "../controllers/sendMailAPI.js";
import { sendAttachm } from "../controllers/sendAttachm.js";

const router = express.Router();

// airtable
router.get("/getTable", getTable);
router.post("/addInTable", addInTable);
router.post("/updateTable", updateTable);
router.delete("/deleteInTable", deleteInTable);

// send mail
router.get("/sendMailAPI", sendMailAPI);
router.get("/sendAttachm", sendAttachm);

export default router;