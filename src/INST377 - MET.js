// Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcartuwbtpatrimtdkhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYXJ0dXdidHBhdHJpbXRka2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MzUzMTYsImV4cCI6MjA2MDAxMTMxNn0.h5tNsiqqw9AzEnPAqAWXRf3l4wnDVI1uczUNwrg1Q8c';

const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch & Store Asian Art Department
async function fetchAndStoreDepartments() {
    const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments");
    const { departments } = await response.json();

    const asianArtDepartment = departments.find(dept => dept.departmentId === 6); // Ensure departmentId matches
    if (asianArtDepartment) {
        const formattedDepartment = {
            departmentId: asianArtDepartment.departmentId, // Ensure matching column
            displayName: asianArtDepartment.displayName // Ensure matching column
        };

        const { error } = await supabase.from('departments').upsert([formattedDepartment]);
        if (error) console.error("Error storing Asian Art department:", error);
    }
}

// Fetch Objects for Asian Art Department
async function fetchObjectsByAsianArt() {
    const departmentId = 6;
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`);
    const { objectIDs } = await response.json();

    const objectDetails = await Promise.all(objectIDs.slice(0, 20).map(async (id) => {
        const objResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        return objResponse.json();
    }));

    const formattedObjects = objectDetails.map(obj => ({
        objectID: obj.objectID,
        isHighlight: obj.isHighlight || false,
        accessionNumber: obj.accessionNumber || "Unknown",
        accessionYear: obj.accessionYear || "Unknown",
        isPublicDomain: obj.isPublicDomain || false,
        primaryImage: obj.primaryImage || "",
        primaryImageSmall: obj.primaryImageSmall || "",
        additionalImages: obj.additionalImages || [],
        constituents: obj.constituents || [],
        department: obj.department || "Unknown",
        objectName: obj.objectName || "Unknown",
        title: obj.title || "Unknown",
        culture: obj.culture || "Unknown",
        period: obj.period || "Unknown",
        dynasty: obj.dynasty || "Unknown",
        reign: obj.reign || "Unknown",
        portfolio: obj.portfolio || "Unknown",
        artistRole: obj.artistRole || "Unknown",
        artistPrefix: obj.artistPrefix || "Unknown",
        artistDisplayName: obj.artistDisplayName || "Unknown",
        artistDisplayBio: obj.artistDisplayBio || "Unknown",
        artistSuffix: obj.artistSuffix || "Unknown",
        artistAlphaSort: obj.artistAlphaSort || "Unknown",
        artistNationality: obj.artistNationality || "Unknown",
        artistBeginDate: obj.artistBeginDate || "Unknown",
        artistEndDate: obj.artistEndDate || "Unknown",
        artistGender: obj.artistGender || "Unknown",
        artistWikidata_URL: obj.artistWikidata_URL || "",
        artistULAN_URL: obj.artistULAN_URL || "",
        objectDate: obj.objectDate || "Unknown",
        objectBeginDate: obj.objectBeginDate || null,
        objectEndDate: obj.objectEndDate || null,
        medium: obj.medium || "Unknown",
        dimensions: obj.dimensions || "Unknown",
        dimensionsParsed: obj.dimensionsParsed || [],
        measurements: obj.measurements || [],
        creditLine: obj.creditLine || "Unknown",
        geographyType: obj.geographyType || "Unknown",
        city: obj.city || "Unknown",
        state: obj.state || "Unknown",
        county: obj.county || "Unknown",
        country: obj.country || "Unknown",
        region: obj.region || "Unknown",
        subregion: obj.subregion || "Unknown",
        locale: obj.locale || "Unknown",
        locus: obj.locus || "Unknown",
        excavation: obj.excavation || "Unknown",
        river: obj.river || "Unknown",
        classification: obj.classification || "Unknown",
        rightsAndReproduction: obj.rightsAndReproduction || "Unknown",
        linkResource: obj.linkResource || "",
        metadataDate: obj.metadataDate || new Date().toISOString(),
        repository: obj.repository || "Unknown",
        objectURL: obj.objectURL || "",
        tags: obj.tags || [],
        objectWikidata_URL: obj.objectWikidata_URL || "",
        isTimelineWork: obj.isTimelineWork || false,
        galleryNumber: obj.galleryNumber || "Unknown"
    }));

    const { error } = await supabase.from("objects").upsert(formattedObjects);
    if (error) console.error("Error storing objects:", JSON.stringify(error, null, 2));
}


// Run database setup functions
fetchAndStoreDepartments();
fetchObjectsByAsianArt();
