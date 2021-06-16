import { jsPDF } from 'jspdf';

function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 50,
        align: "center",
        padding: 0
      });
    }
    return result;
  }

const downloadBtn = document.getElementById('export');
if(downloadBtn){
    // Default export is a4 paper, portrait, using millimeters for units
    downloadBtn.onclick = () => {
        let trs = [...document.getElementsByTagName('tr')].filter(tr => tr.style.display === '')
        trs = trs.splice(1, trs.length)
        const students = trs.map(tr => { 
            const  dataset =  [...tr.children].map(td => td.textContent)
            return { 'Roll No.': dataset[0] , 'Section' : dataset[3], 'Name': dataset[1], 'Fees Paid Upto' : dataset[4]}
         })  
        const headers = createHeaders([ 'Roll No.' , 'Section', 'Name', 'Fees Paid Upto']);
        const doc = new jsPDF();
        doc.table(10, 
            10, 
            students,
            headers
            ,
            {
                printHeaders : true
            },
            { 
                autoSize : true
            }
        )
        doc.save(`example.pdf`)
    }
}


// add downloading of pdf file after payment by a user in this file only