const path = require('path')
const p = path.join(__dirname, './../uploads')

const XLSX = require('xlsx');

const workbook = XLSX.readFile('./test.xlsx')

var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
console.log(xlData);