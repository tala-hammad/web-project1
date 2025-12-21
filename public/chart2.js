 const ctx2 = document.getElementById('doughnut').getContext('2d');

   
    const doughnut = new Chart(ctx2, {
      type: 'doughnut', 
      data: {
        
        labels: ['Direct Violence Exposure', 'Media Coverage Witnessing','Children & Youth (Nightmares)' ],
        datasets: [{
          label: 'Psychological Impact Percentage',
          data: [50, 80, 60], 
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1 
        }]
      },
      options: {
        responsive:true,
        plugins:{
          legend:{
            position:'bottom',
          },
          title:{
            display:true,
            text: 'Psychological Impact by Exposure Type (Nablus)',
            font:{size:18}

          }
        }
      }
        
      
    });