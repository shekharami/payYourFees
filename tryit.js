const path = require('path')
const { unlinkSync } = require('fs');
const cron = require('node-cron');

// const XLSX = require('xlsx');

// const workbook = XLSX.readFile('./test.xlsx')

// var sheet_name_list = workbook.SheetNames;
// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// console.log(xlData);

const p = path.join(__dirname, './untitled.png' )
// console.log(p)

cron.schedule('1 * * * * *' ,()=>{
    console.log('Cron scheduler')
})