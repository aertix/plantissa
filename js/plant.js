const catalog = document.getElementById('catalog');
const baseUrl = 'https://corsproxy.io/?https://trefle.io/api/v1/plants?token=tu6Kf7O_QuDPV3IT5W3VRL7sXgzJo9vQnyQh7CUukaI';

document.getElementById("searchButton").addEventListener('click', () => {
    const term = document.getElementById("searchQuery").value.trim();
    console.log(term)
    const searchURL = `${baseUrl}&q=${term}`;
    fetchData(searchURL);
});

async function fetchData(url) {
    const response = await fetch(url);
    const json = await response.json();
    data = json.data;
    displayData(data)
}

function displayData(data) {
    catalog.innerHTML = '';
    let count = 0;
   
    data.forEach(species => {
        if(count>=6){
            return;
        }
        else{
            const speciesDiv = document.createElement('div');
            speciesDiv.innerHTML = `
            <img src="${species.image_url}">
            <section>
                <h2>${species.common_name}</h2>
                <p>${species.scientific_name}</p>
            </section>
            `;
            catalog.appendChild(speciesDiv);
            count++;
        }
    });
}
