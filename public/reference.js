const fetchanddisplayRefs = async () => {
    try {
        
        const response = await fetch('/get-references');
        
        
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        
        if (!Array.isArray(data)) {
            console.error("Data received is not an array:", data);
            return;
        }

        const econContainer = document.getElementById('economic-list');
        const eduContainer = document.getElementById('educational-list');  
        const psychoContainer = document.getElementById('psychosocial-list');

        
        if (econContainer) econContainer.innerHTML = '';
        if (eduContainer) eduContainer.innerHTML = '';
        if (psychoContainer) psychoContainer.innerHTML = '';

        data.forEach(ref => {
            const card = document.createElement('div');
            card.className = 'reference-card';
            
            
            card.innerHTML = `
                <div class="card-body">
                    <h3>${ref.Title || 'No Title'}</h3>
                    <p class="authors">${ref.Authors || 'Unknown Authors'}</p>
                    <p class="jornal"><strong>Journal:</strong> ${ref.Jornal || 'N/A'}</p>
                    <a href="${ref['URL link'] || '#'}" target="_blank" class="view-btn">View The Reference</a>
                </div>
            `;

            
            if (ref.Category === "Economic Effects") {
                if (econContainer) econContainer.appendChild(card);
            } else if (ref.Category === "Educational Effects") {
                if (eduContainer) eduContainer.appendChild(card);
            } else if (ref.Category === "Psychosocial Effects") {
                if (psychoContainer) psychoContainer.appendChild(card);
            }
        });

    } catch (error) {
        
        console.error('Error fetching or displaying data:', error);
    }
};


fetchanddisplayRefs();