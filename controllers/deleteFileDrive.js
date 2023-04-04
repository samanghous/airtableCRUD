import dotenv from 'dotenv'
dotenv.config()
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../files/samplefile1.pdf');

const CLIENT_ID = process.env.CLIENT_ID ;
const CLIENT_SECRET = process.env.CLIENT_SECRET ;
const REDIRECT_URI = process.env.REDIRECT_URI ;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_DRIVE ;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});



async function deleteFile(fileId) {
  try {

    const response = await  drive.files.delete({
        'fileId': fileId
    });

    return response.data;
  } catch (error) {
    return error;
  }
}


export const deleteFileDrive = async (req, res) => {
    try{
        const fileId = req.body.fileId;
        deleteFile(fileId)
            .then(
                (result) => {
                    console.log(result)
                    res.status(200).json({ success: true, message: "file deleted" })
                }
            )
            .catch(
                (error) => {
                    console.log(error.message)
                    res.status(500).json({ success: false, message: "file not deleted" })
                }
            );
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};