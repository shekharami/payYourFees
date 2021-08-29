// const { Chart, BarController }  = require('chart.js');
import Chart from 'chart.js/auto';
// Chart.register(BarController)
const chartId = document.getElementById('insti-month-wise-chart').getContext('2d');

const data = {
    labels: ['LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X'],
    datasets: [
    {
        label: 'Total Students',
        data: [50,60,70,40,50,60,70,40,50,60,70,40],
        borderColor: 'skyblue',
        backgroundColor:  'skyblue' ,
        },
        {
        label: 'Paid',
        data: [10,20,30,20,20,20,20,20,20,20,20,20],
        borderColor: 'seagreen',
        backgroundColor: 'seagreen',
        },
        {
        label: 'Due',
        data:[6,6,6,6,6,6,6,6,6,6,6,6] ,
        borderColor: 'red',
        backgroundColor: 'red',
        }
    ]
};

const myChart = new Chart(chartId, {

    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Payment count for AUG 2021'
        }
        }
    },
});