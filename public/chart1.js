const ctx = document.getElementById('barchart').getContext('2d');
const barchart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
        datasets: [{
            label: 'Mental Wellbeing by Age Group',
            data: [12.0, 14.2, 15.5, 16.8, 18.3,17.5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio:false,
        scales: {
            y: {
                beginAtZero: true,
                max:20,
                title:{
                    display:true,
                    text:'Wellbeing Score (Higher is Better)',
                    font:{size:14,weight:'bold'}
                }

            },
            x:{
                title:{
                    display:true,
                    text:'Age Groups (Years)',
                    font:{size:14,weight:'bold'}
                }
            }
        },
        plugins:{
            title:{
                display:true,
                text:'Mental Wellbeing by Age Group in Palestine',
                font:{size:18}
            }
        }
    }
});