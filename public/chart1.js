async function renderChart() {
    try {
        // التعديل: استخدام مسار السيرفر في Render
        const response = await fetch('/get-chart-data'); 
        const data = await response.json();

        // تأكدي أن الأسماء (dimension و value) تطابق ما في قاعدة بياناتك (image_2651d2.jpg)
        const labels = data.map(item => item.dimension);
        const values = data.map(item => item.value);

        const ctx = document.getElementById('barchart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Psychological Metrics',
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            }
        });
    } catch (error) {
        console.error('خطأ في جلب بيانات الشارت من السيرفر:', error);
    }
}
renderChart();