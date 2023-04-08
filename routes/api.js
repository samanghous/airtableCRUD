import express from "express";
import { getTable } from "../controllers/getTable.js";
import { addInTable } from "../controllers/addInTable.js";
import { updateTable } from "../controllers/updateTable.js";
import { deleteInTable } from "../controllers/deleteInTable.js";
import { sendMailAPI } from "../controllers/sendMailAPI.js";
import { sendAttachm } from "../controllers/sendAttachm.js";
import { uploadDrive } from "../controllers/uploadDrive.js";
import { createFolderDrive } from "../controllers/createFolderDrive.js";
import { uploadDriveFolder } from "../controllers/uploadDriveFolder.js";
import { deleteFileDrive } from "../controllers/deleteFileDrive.js";
// puppeteer
import { extractHTML } from "../controllers/puppeteer/extractHTML.js";
// pdf reader
import { pdfRead } from "../controllers/pdf/pdfRead.js";
import { pdfTask2 } from "../controllers/pdf/pdfTask2.js";

const router = express.Router();

// airtable
router.get("/getTable", getTable);
router.post("/addInTable", addInTable);
router.post("/updateTable", updateTable);
router.delete("/deleteInTable", deleteInTable);

// send mail
router.get("/sendMailAPI", sendMailAPI);
router.get("/sendAttachm", sendAttachm);

// drive api
router.get("/uploadDrive", uploadDrive);
router.get("/createFolderDrive", createFolderDrive);
router.get("/uploadDriveFolder", uploadDriveFolder);
router.get("/deleteFileDrive", deleteFileDrive);

// puppeteer
router.get("/extractHTML", extractHTML);

// pdf read
router.get("/pdfRead", pdfRead);
router.get("/pdfTask2",pdfTask2);

export default router;