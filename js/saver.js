const catalog = document.getElementById('catalog');
// Correct the base URL (Note: this proxy URL is just for example purposes)
const baseUrl = 'https://trefle.io/api/v1/plants?token=tu6Kf7O_QuDPV3IT5W3VRL7sXgzJo9vQnyQh7CUukaI';

// Event listener for the search button
document.getElementById("searchButton").addEventListener('click', () => {
    const term = document.getElementById("searchQuery").value; // Corrected to get the value
    const urlWithQuery = `https://corsproxy.io/?${encodeURIComponent(baseUrl + '&q=' + term)}`;
    fetchData(urlWithQuery, term);
});

async function fetchData(url, term) {
    const cacheKey = term ? `plants_${term}` : 'plants_all'; // Generate a cache key based on the term
    const cachedData = sessionStorage.getItem(cacheKey);
    let data;

    if (cachedData) {
        console.log("Currently using browser cache");
        data = JSON.parse(cachedData);
    } else {
        const response = await fetch(url);
        const json = await response.json();
        data = json.data;
        sessionStorage.setItem(cacheKey, JSON.stringify(data)); // Cache with the right key
    }

    displayData(data);
}

function displayData(data) {
    catalog.innerHTML = ``;
    let counter = 0;
    data.forEach(species => {
        if (counter >= 30) return;

        const speciesDiv = document.createElement('div');
        speciesDiv.innerHTML = `
        <img src="${species.image_url}">
        <section>
        <h2>${species.common_name}
        </h2><p>${species.scientific_name}</p>
        </section>
        `
     ;
        catalog.appendChild(speciesDiv);
        counter++;
    });
}