var express = require('express');
var router = express.Router();
const path = require('path');
const { fetchData, getNodeRows } = require('../gsheetsService');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Auth */
router.get('/auth', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/auth.html'));
});

/* Local Data Sankey Diagram */
router.get('/sankey', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/sankey.html'));
});

/* Sheets GET */
router.get('/sheets', async function (req, res, next) {
  const valueRanges = await fetchData(process.env.SPREADSHEET_ID, ['Sheet1!F2:G66', 'Sheet1!G2:H66', 'Sheet1!H2:I66', 'Sheet1!I2:J66']);
  const nodeFrequencies = await getNodeRows(valueRanges);
  console.log(nodeFrequencies);
})

module.exports = router;