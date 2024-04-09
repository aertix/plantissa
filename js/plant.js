const catalog = document.getElementById('catalog');
const baseUrl = 'https://corsproxy.io/?https://trefle.io/api/v1/plants/search?token=tu6Kf7O_QuDPV3IT5W3VRL7sXgzJo9vQnyQh7CUukaI';
let count = 0;
let currentamt = 6;
let data = []; // Moved outside to be accessible by both load and search functionalities
const loadBtn = document.getElementById("load")
document.getElementById("searchButton").addEventListener('click', async () => {
    count = 0;
    currentamt = 6;
    catalog.innerHTML = ``;
    loadBtn.style.display = `flex`;
    const term = document.getElementById("searchQuery").value.trim();
    console.log(term)
    const searchURL = `${baseUrl}&q=${term}`;
    await fetchData(searchURL); // Make sure to await fetchData so data is loaded before trying to display it
    displayData(); // Adjusted to not require parameters
});

async function fetchData(url) {
    console.log("Fetching data from URL:", url); // Debug log
    const response = await fetch(url);
    const json = await response.json();
    data = json.data; // Assign the fetched data to the global data variable
    console.log("Data received:", data); // Debug log
    // Removed call to displayData here, as we want to control it from the button clicks
}

function displayData() {
    // Use slice to get the subset of data to display, based on count and currentamt
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
    count = currentamt; // Update count to match the current amount displayed
    currentamt += 6; // Prepare currentamt for the next set of data to display
}

loadBtn.addEventListener('click', () => {
    displayData(); // Simply call displayData again to display the next set
});
