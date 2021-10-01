import { jsPDF } from 'jspdf';

function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 50,
      align: 'center',
      padding: 0
    });
  }
  return result;
}

const exportBtn = document.getElementById('export');
if (exportBtn) {
  // Default export is a4 paper, portrait, using millimeters for units
  exportBtn.onclick = () => {
    let trs = [...document.getElementsByTagName('tr')].filter((tr) => tr.style.display === '');
    trs = trs.splice(1, trs.length);
    const students = trs.map((tr) => {
      const dataset = [...tr.children].map((td) => td.textContent);
      return {
        'Roll No.': dataset[0],
        Section: dataset[3],
        Name: dataset[1],
        'Fees Paid Upto': dataset[4]
      };
    });
    const headers = createHeaders(['Roll No.', 'Section', 'Name', 'Fees Paid Upto']);
    const doc = new jsPDF();
    doc.table(
      10,
      10,
      students,
      headers,
      {
        printHeaders: true
      },
      {
        autoSize: true
      }
    );
    doc.save(`example.pdf`);
  };
}

// For user : paymnet-history download reciept buttons
const downloadBtn = document.getElementsByName('past-pay-dnld');
if (downloadBtn.length) {
  downloadBtn.forEach((btn) => {
    btn.onclick = () => {
      const details = [
        { 'Paid For': 'Amit Shekhar', Amount: '500', Status: 'Success', 'Paid on': '2-July-2021' }
      ];
      const headers = createHeaders(['Paid For', 'Amount', 'Status', 'Paid on']);
      const doc = new jsPDF();
      doc.table(
        10,
        10,
        details,
        headers,
        {
          printHeaders: true
        },
        {
          autoSize: true
        }
      );
      doc.save(`reciept.pdf`);
    };
  });
}

//Add downloading of fees reciept just after the paymnet has been made
