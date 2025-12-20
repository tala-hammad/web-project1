const fetchanddisplayRefs = async () => {
    try {
        // استخدمي الرابط المباشر لضمان الاتصال بالسيرفر في Render
        const response = await fetch('/get-references');
        
        // التحقق مما إذا كان السيرفر يعمل بشكل صحيح (تجنب خطأ 500)
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        // التأكد أن البيانات القادمة هي مصفوفة (Array) لمنع خطأ image_27980c.png
        if (!Array.isArray(data)) {
            console.error("Data received is not an array:", data);
            return;
        }

        const econContainer = document.getElementById('economic-list');
        const eduContainer = document.getElementById('educational-list');  
        const psychoContainer = document.getElementById('psychosocial-list');

        // تنظيف القوائم
        if (econContainer) econContainer.innerHTML = '';
        if (eduContainer) eduContainer.innerHTML = '';
        if (psychoContainer) psychoContainer.innerHTML = '';

        data.forEach(ref => {
            const card = document.createElement('div');
            card.className = 'reference-card';
            
            // استخدام الأسماء المطابقة لبياناتك في MongoDB Atlas (image_263eb5.png)
            card.innerHTML = `
                <div class="card-body">
                    <h3>${ref.Title || 'No Title'}</h3>
                    <p class="authors">${ref.Authors || 'Unknown Authors'}</p>
                    <p class="jornal"><strong>Journal:</strong> ${ref.Jornal || 'N/A'}</p>
                    <a href="${ref['URL link'] || '#'}" target="_blank" class="view-btn">View The Reference</a>
                </div>
            `;

            // توزيع الكروت بناءً على التصنيف (Category)
            if (ref.Category === "Economic Effects") {
                if (econContainer) econContainer.appendChild(card);
            } else if (ref.Category === "Educational Effects") {
                if (eduContainer) eduContainer.appendChild(card);
            } else if (ref.Category === "Psychosocial Effects") {
                if (psychoContainer) psychoContainer.appendChild(card);
            }
        });

    } catch (error) {
        // إظهار رسالة خطأ واضحة في الـ Console إذا لم تظهر البيانات
        console.error('Error fetching or displaying data:', error);
    }
};

// استدعاء الدالة عند تحميل الصفحة
fetchanddisplayRefs();