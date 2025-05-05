// models.js - Badge and data model functions

// Store badges data
let badges = [];

// Create new badge
function createBadge(name, id, role, shift, training = [], timestamp = new Date().toISOString()) {
    return {
        id: id,
        name: name,
        role: role,
        shift: shift,
        training: training, // Array of position IDs the employee is trained for
        timestamp: timestamp // For syncing
    };
}

// Format timestamp 
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Delete badge 
function deleteBadge(badgeId) {
    if (confirm("Are you sure you want to delete this badge?")) {
        const badgeIndex = badges.findIndex(badge => badge.id === badgeId);
        if (badgeIndex !== -1) {
            badges.splice(badgeIndex, 1);
            saveToLocalStorage();
            renderBadges();
            showNotification('Badge deleted successfully!', 'success');
        }
    }
}

// Clear all data
function clearAllData() {
    if (confirm("Are you sure you want to clear all badge data? This action cannot be undone.")) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        badges = [];
        renderBadges();
        showNotification('All data has been cleared!', 'success');
    }
}
