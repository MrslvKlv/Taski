// Perform search across badges
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    
    // Clear previous results
    searchResults.innerHTML = '';
    
    if (searchTerm.length < 1) {
        searchResults.classList.add('hidden');
        return;
    }
    
    // Filter badges based on search term
    const filteredBadges = badges.filter(badge => {
        // Basic search fields
        const basicMatch = badge.name.toLowerCase().includes(searchTerm) ||
               badge.id.toLowerCase().includes(searchTerm) ||
               badge.shift.toLowerCase().includes(searchTerm) ||
               roles[badge.role].name.toLowerCase().includes(searchTerm);
        
        // Training search - check if any training matches the search term
        let trainingMatch = false;
        if (badge.training && badge.training.length > 0) {
            trainingMatch = badge.training.some(trainingId => {
                const position = trainingPositions[trainingId];
                return position && position.name.toLowerCase().includes(searchTerm);
            });
        }
        
        return basicMatch || trainingMatch;
    });
    
    // Show search results
    if (filteredBadges.length > 0) {
        // Create header for results
        const header = document.createElement('div');
        header.className = 'px-4 py-2 bg-gray-100 border-b border-gray-200 font-medium text-gray-700';
        header.textContent = `${filteredBadges.length} result${filteredBadges.length !== 1 ? 's' : ''} found`;
        searchResults.appendChild(header);
        
        // Add results
        filteredBadges.forEach(badge => {
            const resultItem = createSearchResultItem(badge);
            searchResults.appendChild(resultItem);
        });
        
        // Show results container
        searchResults.classList.remove('hidden');
    } else if (searchTerm.length > 0) {
        // Show "no results" message
        const noResults = document.createElement('div');
        noResults.className = 'px-4 py-3 text-center text-gray-600';
        noResults.textContent = 'No matching badges found';
        searchResults.appendChild(noResults);
        searchResults.classList.remove('hidden');
    } else {
        searchResults.classList.add('hidden');
    }
}

// Create a search result item
function createSearchResultItem(badge) {
    const role = roles[badge.role];
    const shiftColor = shiftColors[badge.shift] || shiftColors.default;
    const colorClass = shiftColor.split(' ')[0]; // Extract just the background color
    
    // Create training badges HTML if badge has trainings
    let trainingHTML = '';
    if (badge.training && badge.training.length > 0) {
        trainingHTML = `
            <div class="flex flex-wrap mt-1 gap-1">
                ${badge.training.map(trainingId => {
                    const position = trainingPositions[trainingId];
                    if (position) {
                        return `<span class="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs flex items-center">
                            <i class="fa-solid ${position.icon} text-xs mr-1"></i>${position.name}
                        </span>`;
                    }
                    return '';
                }).join('')}
            </div>
        `;
    }
    
    const resultItem = document.createElement('div');
    resultItem.className = 'px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0';
    resultItem.innerHTML = `
        <div class="flex items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center ${colorClass} mr-3">
                <span class="text-gray-800 font-bold">${badge.name.charAt(0).toUpperCase()}</span>
            </div>
            <div class="flex-grow">
                <div class="font-medium text-gray-800">${badge.name}</div>
                <div class="text-xs text-gray-600 flex items-center justify-between">
                    <span>ID: ${badge.id}</span>
                    <div class="flex items-center">
                        <span class="mr-2">${badge.shift}</span>
                        <span class="px-2 py-0.5 rounded-full text-xs ${role.color}">${role.name}</span>
                    </div>
                </div>
                ${trainingHTML}
            </div>
        </div>
    `;
    
    // Add click event to highlight the badge on the board
    resultItem.addEventListener('click', () => {
        highlightBadge(badge.id);
    });
    
    return resultItem;
}

// Show search results on focus
function showSearchResults() {
    if (searchInput.value.trim().length > 0) {
        searchResults.classList.remove('hidden');
    }
}

// Highlight a badge on the board
function highlightBadge(badgeId) {
    // Clear any previous highlights
    document.querySelectorAll('.badge').forEach(el => {
        el.classList.remove('ring-4', 'ring-indigo-500', 'ring-opacity-75', 'animate-pulse');
    });
    
    // Find and highlight the badge
    const badgeElement = document.getElementById(`badge-${badgeId}`);
    if (badgeElement) {
        // Scroll to badge position
        badgeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add highlight effect
        badgeElement.classList.add('ring-4', 'ring-indigo-500', 'ring-opacity-75', 'animate-pulse');
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            badgeElement.classList.remove('ring-4', 'ring-indigo-500', 'ring-opacity-75', 'animate-pulse');
        }, 3000);
        
        // Hide search results
        searchResults.classList.add('hidden');
    }
}

// Export search functions
window.performSearch = performSearch;
window.showSearchResults = showSearchResults;