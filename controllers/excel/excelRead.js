import Excel from 'exceljs';
import fs from 'fs';
import { google } from 'googleapis';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SHEET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SHEET;



export const excelRead = async (req, res) => {
    try {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile('./files/excelTask.xlsx');

        const sheetName = 'Sheet1';
        const worksheet = workbook.getWorksheet(sheetName);

        let values = [];
        worksheet.eachRow((row, rowNumber) => {
            const col1 = row.getCell('A').value;
            const col2 = row.getCell('B').value;
            const col3 = row.getCell('C').value;
            const col4 = row.getCell('D').value;
            const col5 = row.getCell('E').value;
            const col6 = row.getCell('F').value;
            const col7 = row.getCell('G').value;
            const col8 = row.getCell('H').value;
            const col9 = row.getCell('I').value;
            const col10 = row.getCell('J').value;
            const col11 = row.getCell('K').value;
            const col12 = row.getCell('L').value;
            const col13 = row.getCell('M').value;
            const col14 = row.getCell('N').value;
            let thisrow = [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12, col13, col14];
            values.push(thisrow);
        });


        const auth = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );

        auth.setCredentials({
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN,
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = '1k8nV2p2b-cmfsPWe9q7GoyV8wjmoQchTxeH243zZf2o';
        const range = 'Sheet1!A1:N250';
        const newValue = values;

        sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: newValue,
            },
        }, (err, res1) => {
            if (err) {
                res.status(400).json({ success: false, message: err });
                return;
            }
            console.log(res1.data);
            res.status(200).json({ success: true, message: "Data extracted" })
        });

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};