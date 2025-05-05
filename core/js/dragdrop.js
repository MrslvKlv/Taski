// drag-drop.js - Drag and drop functionality

// Drag & Drop functions
function dragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function dragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const badgeId = e.dataTransfer.getData('text/plain');
    const targetRole = e.currentTarget.dataset.role;
    
    // Check if target role has space
    const currentCount = badges.filter(badge => badge.role === targetRole).length;
    if (currentCount >= roles[targetRole].limit) {
        showNotification('This section is full!', 'error');
        return;
    }
    
    // Update badge role and timestamp
    const badgeIndex = badges.findIndex(badge => badge.id === badgeId);
    if (badgeIndex !== -1) {
        badges[badgeIndex].role = targetRole;
        badges[badgeIndex].timestamp = new Date().toISOString();
        
        // Save to localStorage
        saveToLocalStorage();
        
        // Re-render badges
        renderBadges();
        showNotification('Badge moved successfully!', 'success');
    }
}

