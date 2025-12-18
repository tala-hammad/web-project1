const ctx = document.getElementById('myChart');
const xValues = ["2018", "2019", "2020", "2021", "2022", "2023"];

new Chart(ctx, {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        label: "Upward",
        data: [65, 68, 72, 75, 78, 80], 
        backgroundColor: "#1d3557",
        borderRadius: 4
      },
      {
        label: "Maintained",
        data: [25, 22, 21, 20, 19, 17],
        backgroundColor: "#e0d372",
        borderRadius: 4
      },
      {
        label: "Downward",
        data: [10, 10, 7, 5, 3, 3], 
        backgroundColor: "#d62828",
        borderRadius: 4
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { usePointStyle: true, padding: 20 }
      },
      title: {
        display: true,
        text: "Social Mobility Outcomes",
        align: 'start',
        font: { size: 18, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: false, 
        title: { display: true, text: "Percentage (%)" }
      },
      x: {
        grid: { display: false },
        title: { display: true, text: "Years" }
      }
    }
  }
});

const xValues2 = ["Educational Programs", "Volunteer Work", "Civic Engagement", "Community Groups", "Mentoring"];
const yValues2 = [72, 68, 60, 55, 45];
const barColors2 = ["red", "green","blue","orange","brown"];

const ctx2 = document.getElementById('myChart2');

new Chart(ctx2, {
  type: "bar",
  data: {
  labels: xValues2,
  datasets: [{
    backgroundColor: barColors2,
    data: yValues2
  }]
},
  options: {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Community Participation Activities",
        font: {size:16}
      }
    },
  }
});
