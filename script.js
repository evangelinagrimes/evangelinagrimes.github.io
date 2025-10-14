
const button = document.getElementById('generateBtn');
const themeElement = document.getElementById('theme');
const itemElement = document.getElementById('item');
const activityElement = document.getElementById('activity');
const locationElement = document.getElementById('location');
const priceElement = document.getElementById('price');

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

// Function that runs when button is clicked
function generateGirlsNight() {
    const randomTheme = getRandomItem(themes);
    const randomItem = getRandomItem(items);
    const randomActivity = getRandomItem(activities);
    const randomLocation = getRandomItem(locations);
    
    // Calculate total cost
    const totalCost = randomActivity.cost + randomLocation.cost;

    // Convert to $ symbols for display
    const displayCost = convertCostToSymbols(totalCost);
    
    // Update HTML display
    themeElement.textContent = randomTheme;
    itemElement.textContent = randomItem;
    activityElement.textContent = randomActivity.name;
    locationElement.textContent = randomLocation.name;
    priceElement.textContent = displayCost;
    
    console.log("Generated:", randomTheme, randomItem, randomActivity.name, randomLocation.name, totalCost);
}

