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

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/


async function uploadFile() {
  try {

    const response = await drive.files.create({
      requestBody: {
        name: 'samplepdfDriveName.pdf', //This can be name of your choice
        mimeType: 'application/pdf',
      },
      media: {
        mimeType: 'application/pdf',
        body: fs.createReadStream(filePath),
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
}


export const uploadDrive = async (req, res) => {
    try{
        uploadFile()
            .then(
                (result) => {
                    console.log(result)
                    res.status(200).json({ success: true, message: "file uploaded" })
                }
            )
            .catch(
                (error) => {
                    console.log(error.message)
                    res.status(500).json({ success: false, message: "file not uploaded" })
                }
            );
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
