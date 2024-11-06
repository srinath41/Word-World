// Function to store search term in localStorage
function storeSearchTerm(searchTerm) {
    // Get existing history from localStorage or create a new array if none exists
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Add the new search term at the beginning of the array
    if (!searchHistory.includes(searchTerm)) { // Avoid duplicates
        searchHistory.unshift(searchTerm);
    }

    // Limit history to the last 5 searches (or any number you choose)
    searchHistory = searchHistory.slice(0, 5);

    // Store updated history back in localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    // Update the display of recent searches
    displaySearchHistory();
}

// Function to display recent searches on the page
function displaySearchHistory() {
    const historyContainer = document.getElementById('recentSearches');
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Clear the current history display
    historyContainer.innerHTML = '';

    // Create buttons for each search term in the history
    searchHistory.forEach((term) => {
        const button = document.createElement("button");
        button.textContent = term; // Set button text
        button.classList.add("recent-search-button"); // Add class for styling

        // Add click event to the button
        button.addEventListener("click", function() {
            document.getElementById("searchInput").value = term; // Set input to the clicked search
            searchWord(); // Call search function
        });

        historyContainer.appendChild(button); // Add button to the container
    });
}

// Function to search for a word
function searchWord() {
    var searchInput = document.getElementById("searchInput").value.trim(); // Get input value
    var searchResult = document.getElementById("searchResult");

    // Clear previous result text and reset style
    searchResult.classList.remove("result"); // Remove any previous result styling
    searchResult.classList.add("placeholder"); // Add placeholder class for styling
    searchResult.textContent = "Searching..."; // Temporary loading text

    if (searchInput) {
        storeSearchTerm(searchInput); // Store the search term
        fetch('/search/?q=' + searchInput) // Fetch results from server
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    searchResult.textContent = data.result; // Set result text
                    searchResult.classList.remove("placeholder"); // Remove placeholder class
                    searchResult.classList.add("result"); // Add result class for styling
                } else {
                    searchResult.textContent = "Word not found."; // Handle word not found
                    searchResult.classList.remove("placeholder"); // Remove placeholder class
                    searchResult.classList.add("result"); // Add result class for styling
                }
                displaySearchHistory(); // Display the updated search history after the search
            })
            .catch(error => {
                console.error("An error occurred:", error);
                searchResult.textContent = "An error occurred while searching."; // Error message
                searchResult.classList.remove("placeholder");
                searchResult.classList.add("result");
            });
    } else {
        searchResult.textContent = "Please enter a word to search."; // Message for empty input
        searchResult.classList.add("placeholder"); // Keep placeholder class
    }
}

// Prevent form submission and call the searchWord function
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    searchWord(); // Call search function
});

// JavaScript to clear recent searches
document.getElementById('clearHistoryButton').addEventListener('click', function() {
    localStorage.removeItem('searchHistory'); // Clear history from localStorage
    displaySearchHistory(); // Update display
});

// Display search history on page load
document.addEventListener('DOMContentLoaded', displaySearchHistory);
