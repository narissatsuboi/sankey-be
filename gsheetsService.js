var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env')});
const { log } = require('console');
const { authorize } = require('./gapiClient');
const { google } = require('googleapis');

async function fetchData(sheetId, ranges) {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const res = await sheets.spreadsheets.values.batchGet({
            ranges: ranges,
            spreadsheetId: sheetId,
            valueRenderOption: 'FORMATTED-VALUE',
        });
        const rows = res.data.valueRanges;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}
const sheetId = process.env.SPREADSHEET_ID;
fetchData(sheetId, ['Sheet1!F2:G66', 'Sheet1!G2:H66']);