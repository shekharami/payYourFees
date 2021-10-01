import Chart from 'chart.js/auto';
import XLSX from 'xlsx';
const defaultData = require('../utils/default.json');
if (document.location.pathname === '/institute/dashboard') {
  const pieChartCanvas = document.getElementById('summary');
  if (pieChartCanvas) {
    const pieChartContext = pieChartCanvas.getContext('2d');
    const pieChart = new Chart(pieChartContext, {
      type: 'pie',
      data: {
        labels: ['Paid', 'Due'],
        datasets: [
          {
            label: 'Total',
            data: [500, 300],
            backgroundColor: ['rgb(144,238,144)', 'rgb(255,0,0)'],
            hoverOffset: 4
          }
        ]
      }
    });
  }

  const data = {
    labels: ['LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
    datasets: [
      {
        label: 'Total Students',
        data: [50, 60, 70, 40, 50, 60, 70, 40, 50, 60, 70, 40],
        borderColor: 'skyblue',
        backgroundColor: 'skyblue'
      },
      {
        label: 'Paid',
        data: [10, 20, 30, 20, 20, 20, 20, 20, 20, 20, 20, 20],
        borderColor: 'seagreen',
        backgroundColor: 'seagreen'
      },
      {
        label: 'Due',
        data: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        borderColor: 'red',
        backgroundColor: 'red'
      }
    ]
  };
  const today = new Date();
  const month = Object.keys(defaultData.months)[today.getMonth()];
  const year = today.getUTCFullYear();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `Stats for ${month + '-' + year}`
      }
    }
  };
  const ctx = document.getElementById('insti-month-wise-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options
  });
  const exportXlsx = document.getElementById('exportXlsx');
  if (exportXlsx) {
    exportXlsx.onclick = () => {
      const wb = XLSX.utils.book_new();
      var ws_name = 'SheetJS';

      const ws_data = [
        ['S', 'h', 'e', 'e', 't', 'J', 'S'],
        [1, 2, 3, 4, 5]
      ];
      const ws = XLSX.utils.aoa_to_sheet(ws_data);

      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      XLSX.writeFile(wb, 'out.xlsx');
    };
  }
}
