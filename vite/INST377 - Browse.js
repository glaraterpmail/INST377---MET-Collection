async function searchAsianArtObjects(query) {
    console.log("Fetching data from Met API...");

    try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&departmentId=6`);
        const { objectIDs } = await response.json();

        return objectIDs || []; // Return empty array if no results
    } catch (error) {
        console.error("Error fetching from Met API:", error);
        return []; // Return empty array on failure
    }
}

async function filterAsianArtworks() {
    const culture = document.getElementById("culture").value;
    const medium = document.getElementById("medium").value;
    const classification = "Prints"; // Restrict results to prints

    const artworksContainer = document.getElementById("artworks-container");
    artworksContainer.innerHTML = `<p>Filtering results for Asian Art:
        <strong>Culture:</strong> ${culture || "All"}, 
        <strong>Medium:</strong> ${medium || "All"}
    </p>`;

    // Try fetching from Met API first
    const searchResults = await searchAsianArtObjects(`${culture} ${medium}`);

    let data = [];

    if (searchResults.length > 0) {
        // Fetch details from Met API
        console.log("Retrieving object details from Met API...");
        data = await Promise.all(searchResults.slice(0, 10).map(async (id) => {
            try {
                const detailsResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                const obj = await detailsResponse.json();
                return { ...obj, objectID: id };
            } catch (error) {
                console.error(`Error fetching object ${id} from Met API`, error);
                return null;
            }
        }));
        
        data = data.filter(obj => obj !== null); // Remove failed API calls
    }

    // If Met API fails or returns no data, query Supabase as backup
    if (data.length === 0) {
        console.log("Fallback: Fetching from Supabase...");
        let { data: supabaseData, error } = await supabase.from("objects")
            .select("*")
            .eq("department", "Asian Art")
            .eq("medium", medium || null)
            .eq("classification", classification) 
            .order("objectID", { ascending: true });

        if (error) {
            console.error("Error fetching from Supabase:", error);
        } else {
            data = supabaseData;
        }
    }

    // Populate results into styled cards
    if (data.length > 0) {
        artworksContainer.innerHTML += `<div class="artworks-grid">${data.map(art => `
            <div class="artwork-card" data-objectid="${art.objectID}">
                <img src="${art.primaryImageSmall || 'placeholder.jpg'}" alt="${art.title}">
                <div class="art-info">
                    <h3>${art.title}</h3>
                    <p><strong>Object ID:</strong> ${art.objectID}</p>
                    <p><strong>Artist:</strong> ${art.artistDisplayName || "Unknown"}</p>
                    <p><strong>Culture:</strong> ${art.culture || "Unknown"}</p>
                    <p><strong>Medium:</strong> ${art.medium || "Unknown"}</p>
                </div>
            </div>
        `).join('')}</div>`;
    } else {
        artworksContainer.innerHTML += `<p>No results found.</p>`;
    }
}

// Attach event listener to search button
document.querySelector("button").addEventListener("click", filterAsianArtworks);
