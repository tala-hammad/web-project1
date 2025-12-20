const fetchanddisplayRefs=async() =>{
    try{
        const response = await fetch ('get-references');
        const data = await response.json();
        const econContainer = document.getElementById('economic-list');
        const eduContainer = document.getElementById('educational-list');  
        const psychoContainer = document.getElementById('psychosocial-list');

    if(econContainer) econContainer.innerHTML='';
    if(eduContainer) eduContainer.innerHTML='';
    if(psychoContainer) psychoContainer.innerHTML='';


            data.forEach(ref =>{
               
                    const card = document.createElement('div');
                    card.className ='reference-card';
                    card.innerHTML=`
                    <div class="card-body">
                    <h3>${ref.Title}</h3>
                    <p class="authors">${ref.Authors}</p>
                    <p class="jornal"><strong>Jornal:</strong>${ref.Jornal}</p>
                    <a href="${ref['URL link']}" target="-blank" class="view-btn">View The Reference</a>
                    </div>
                    `;
                    if (ref.Category=== "Economic Effects"){
                        econContainer.appendChild(card);
                    } else if (ref.Category === "Educational Effects"){
                         eduContainer.appendChild(card);
                    } else if (ref.Category === "Psychosocial Effects") {
                        psychoContainer.appendChild(card);
                    }
                   
            });
                    
   
            } catch (error){
                console.error('Error',error);
            }
            };
            fetchanddisplayRefs();
        