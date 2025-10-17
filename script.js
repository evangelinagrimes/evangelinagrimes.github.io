const button = document.getElementById('generateBtn');

// Listen for button clicks
button.addEventListener('click', generateGirlsNight);

// Helper function to get random item from array
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Helper function to convert number to $ symbols
function convertCostToSymbols(costNumber) {
    if (costNumber === 0) return "-";
    return "$".repeat(costNumber);
}

// Main generator function - uses any data structure
function generateGirlsNight() {
    const results = {
        theme: getRandomItem(themes),
        item: getRandomItem(items),
        activity: getRandomItem(activities),
        location: getRandomItem(locations)
    };

    // Calculate total cost
    const totalCost = results.activity.cost + results.location.cost;
    results.price = convertCostToSymbols(totalCost);

    // Update HTML dynamically based on results object keys
    displayResults(results);
    
    return results;
}

// Generic display function - works with any results object
function displayResults(results) {
    Object.keys(results).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            // Handle objects with .name property, otherwise use value directly
            element.textContent = results[key].name || results[key];
        }
    });
}