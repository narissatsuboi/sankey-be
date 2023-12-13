const path = require('path');
const { config } = require('dotenv');
const { authorize } = require('./gapiClient');
const { google } = require('googleapis');

config({ path: path.resolve(__dirname, './.env') });

async function batchGet(sheetId, ranges) {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const res = await sheets.spreadsheets.values.batchGet({
            ranges,
            spreadsheetId: sheetId,
            valueRenderOption: 'FORMATTED-VALUE',
        });

        const valueRanges = res.data.valueRanges;

        if (!valueRanges || valueRanges.length === 0) {
            console.log('No data found.');
            return;
        }

        const allRows = valueRanges.flatMap(({ values }) => values);
        const filteredRows = allRows.filter((row) => row.length > 1);
        return filteredRows;

    } catch (error) {
        console.error('Error in batchGet:', error);
        throw error;
    }
}

async function nodeFrequencyMap(nodes) {
    const freqs = {};

    for (const node of nodes) {
        const key = node.join();

        if (freqs[key]) {
            freqs[key]++;
        } else {
            freqs[key] = 1;
        }
    }
    return freqs;
}
exports.fetchData = batchGet;
exports.nodeFrequencyMap = nodeFrequencyMap;