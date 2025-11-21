const API_KEY = process.env.API_KEY;

const generateBtn = document.getElementById('generate_btn');
const theme = document.getElementById('theme');
const zipCode = document.getElementById('zipcode'); // Convert into long/lat coords
const mileLimit = document.getElementById('mile_limit');
const region = document.getElementById('region');
const timeOfDay = document.getElementById('time_of_day');
const dayOfWeek = document.getElementById('dayOfWeek');

const location = document.getElementById('location');
const activity = document.getElementById('activity');
const activityTypeList = document.getElementById('activity_type_list');
const placesList = document.getElementById('places_list');

// Connect button to function
generateBtn.addEventListener('click', generateActivities);

async function generateActivities() {
    console.log("Successfully pressed the button");
    
    const results = {
        theme: 'Ramen Night',
        activity: 'Go-Cart',
        location: 'Norfolk, VA'
    };

     displayResults(results);

    return results
    
    // Show loading state
    placesListElement.innerHTML = '<p>Loading places...</p>';
    
    // try {
    //     const places = await searchPlaces('ramen');
    //     displayPlaces(places);
    // } catch (error) {
    //     console.error('Error:', error);
    //     placesListElement.innerHTML = '<p class="text-danger">Error loading places. Check console.</p>';
    // }
}



async function searchPlaces(query, region, mile_limit) {
    const url = 'https://places.googleapis.com/v1/places:searchText';
    
    const requestBody = {
        textQuery: query,
        regionCode: 'US',
        locationRestriction: {
            rectangle: {
                low: {
                    latitude: 40.477398,
                    longitude: -74.259087
                },
                high: {
                    latitude: 40.91618,
                    longitude: -73.70018
                }
            }
        },
        priceLevels: ['PRICE_LEVEL_INEXPENSIVE', 'PRICE_LEVEL_MODERATE', 'PRICE_LEVEL_EXPENSIVE', 'PRICE_LEVEL_VERY_EXPENSIVE']
    };
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            // 'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.priceLevel'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.places || [];
}

function displayPlaces(places) {
    if (!places || places.length === 0) {
        placesListElement.innerHTML = '<p>No places found.</p>';
        return;
    }
    
    const html = places.map(place => `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${place.displayName?.text || 'Unknown'}</h5>
                <p class="card-text">${place.formattedAddress || 'No address'}</p>
                <p class="card-text">
                    <small class="text-muted">
                        Rating: ${place.rating || 'N/A'} | 
                        Price: ${place.priceLevel || 'N/A'}
                    </small>
                </p>
            </div>
        </div>
    `).join('');
    
    placesListElement.innerHTML = html;
}

// Generic display function - works with any results object
function displayResults(results) {
    Object.keys(results).forEach(key => {
        const element = document.getElementById(key);
        if (element) { 
            element.textContent = results[key].name || results[key];
        }
    });
}