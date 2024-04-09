const catalog = document.getElementById('catalog');
const baseUrl = 'https://corsproxy.io/?https://trefle.io/api/v1/plants/search?token=tu6Kf7O_QuDPV3IT5W3VRL7sXgzJo9vQnyQh7CUukaI';
let count = 0;
let currentamt = 6;
let data = []; 
const loadBtn = document.getElementById("load")
document.getElementById("searchButton").addEventListener('click', async () => {
    count = 0;
    currentamt = 6;
    catalog.innerHTML = ``;
    loadBtn.style.display = `flex`;
    const term = document.getElementById("searchQuery").value.trim();
    console.log(term)
    const searchURL = `${baseUrl}&q=${term}`;
    await fetchData(searchURL); 
    displayData(); 
});

async function fetchData(url) {
    console.log("Fetching data from URL:", url); 
    const response = await fetch(url);
    const json = await response.json();
    data = json.data; 
    console.log("Data received:", data); 
    
}

function displayData() {
    const displayData = data.slice(count, currentamt);
    displayData.forEach(species => {
        const speciesDiv = document.createElement('div');
        speciesDiv.innerHTML = `
        <img src="${species.image_url}">
        <section>
            <h2>${species.common_name}</h2>
            <p>${species.scientific_name}</p>
        </section>
        `;
        catalog.appendChild(speciesDiv);
    });
    count = currentamt; 
    currentamt += 6; 
}

loadBtn.addEventListener('click', () => {
    displayData(); 
});
