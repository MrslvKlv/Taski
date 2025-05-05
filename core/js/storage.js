// storage.js - Local storage functions

// Save current board setup as JSON file
function saveSetupAsJson() {
    // Prepare data to save
    const setupData = {
        timestamp: new Date().toISOString(),
        badges: badges
    };
    
    // Convert to JSON string
    const jsonString = JSON.stringify(setupData, null, 2);
    
    // Create Json blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary link and trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `shift-board-setup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // Clean up
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    
    showNotification('Board setup saved successfully!', 'success');
}

// Trigger file input for loading JSON
function triggerFileInput() {
    document.getElementById('fileInput').click();
}

// Load board setup from JSON file
function loadSetupFromJson(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const setupData = JSON.parse(e.target.result);
            
            // Validate imported data
            if (!setupData.badges || !Array.isArray(setupData.badges)) {
                throw new Error('Invalid setup file format');
            }
            
            // Check if each badge has required fields [.id , .name , .role!]
            for (const badge of setupData.badges) {
                if (!badge.id || !badge.name || !badge.role) {
                    throw new Error('Invalid badge data in setup file');
                }
            }
            
            // Proceed with loading badges and their position from setup file.
            badges = setupData.badges;
            
            // Apply to localStorage
            saveToLocalStorage();
            
            // Re-render badges
            renderBadges();
            
            showNotification('Board setup loaded successfully!', 'success');
        } catch (error) {
            console.error('Error loading setup:', error);
            showNotification('Failed to load setup. Invalid file format.', 'error');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

// Localstorage [Save]
function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ badges }));
}

// Localstorage [Load]
function loadFromLocalStorage() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        badges = parsedData.badges || [];
    }
}
