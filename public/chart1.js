async function renderChart() {
    try {
        // 1. طلب البيانات من السيرفر (Fetch)
        // هذا السطر يذهب لعنوان السيرفر ويطلب الـ JSON الخاص بالبيانات
        const response = await fetch('http://localhost:5000/get-chart-data');
        
        // تحويل النتيجة إلى قائمة (Array) يمكن للجافا سكريبت فهمها
        const dbData = await response.json();

        // 2. معالجة البيانات (Data Processing)
        // هنا نستخرج القيم فقط من البيانات القادمة من MongoDB
        // إذا كانت القاعدة فارغة، سيستخدم أرقاماً افتراضية [10, 20, ...]
        const chartValues = dbData.length > 0 ? dbData.map(item => Number(item.value)) : [12, 19, 15, 25, 5, 7];

        // 3. رسم الشارت باستخدام البيانات الجديدة
        const ctx = document.getElementById('barchart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
                datasets: [{
                    label: 'Mental Wellbeing (From Database)',
                    data: chartValues, // هنا نضع الأرقام التي جلبناها
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    } catch (error) {
        // إذا فشل السيرفر في الرد، ستظهر هذه الرسالة في الـ Console
        console.error("خطأ في جلب بيانات الشارت من السيرفر:", error);
    }
}

// تشغيل الدالة فور تحميل الملف
renderChart();