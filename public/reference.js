const fetchanddisplayRefs = async () => {
    try {
        // استخدام المسار الصحيح للسيرفر
        const response = await fetch('https://nablus-sumud.onrender.com/get-references');
        const data = await response.json();
        
        // جلب الحاويات بناءً على الـ IDs الموجودة في ملف الـ HTML الخاص بكِ
        const econContainer = document.getElementById('economic-list');
        const eduContainer = document.getElementById('educational-list');  
        const psychoContainer = document.getElementById('psychosocial-list');

        // تنظيف القوائم قبل إضافة البيانات الجديدة
        if (econContainer) econContainer.innerHTML = '';
        if (eduContainer) eduContainer.innerHTML = '';
        if (psychoContainer) psychoContainer.innerHTML = '';

        data.forEach(ref => {
            const card = document.createElement('div');
            card.className = 'reference-card';
            
            // استخدام الأسماء المطابقة لقاعدة بياناتك (image_263eb5.png)
            card.innerHTML = `
                <div class="card-body">
                    <h3>${ref.Title || 'No Title'}</h3>
                    <p class="authors">${ref.Authors || 'Unknown Authors'}</p>
                    <p class="journal"><strong>Journal:</strong> ${ref.Jornal || 'N/A'}</p>
                    <a href="${ref['URL link'] || '#'}" target="_blank" class="view-btn">View The Reference</a>
                </div>
            `;

            // التعديل الجوهري: مطابقة التصنيف الموجود في قاعدة بياناتك بالـ Container الصحيح
            if (ref.Category === "Economic Effects") {
                if (econContainer) econContainer.appendChild(card);
            } else if (ref.Category === "Educational Effects") {
                if (eduContainer) eduContainer.appendChild(card);
            } else if (ref.Category === "Psychosocial Effects") {
                if (psychoContainer) psychoContainer.appendChild(card);
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchanddisplayRefs();