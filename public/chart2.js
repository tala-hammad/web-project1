 const ctx2 = document.getElementById('doughnut').getContext('2d');

   
    const doughnut = new Chart(ctx2, {
      type: 'doughnut', 
      data: {
        
        labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
        datasets: [{
          label: 'Mental Wellbeing by Age Group',
          data: [12, 19, 10, 25, 8, 4], 
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(192, 199, 67, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1 
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true 
          }
        }
      }
    });