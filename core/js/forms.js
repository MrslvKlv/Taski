// Handle edit form sub
function handleEditFormSubmit(e) {
    e.preventDefault();
    
    const badgeId = document.getElementById('editBadgeId').value;
    const name = document.getElementById('editBadgeName').value;
    const role = document.getElementById('editRole').value;
    
    // Get selected shift
    let selectedShift = '';
    document.querySelectorAll('.edit-shift-checkbox').forEach(cb => {
        if (cb.checked) {
            selectedShift = cb.value;
        }
    });
    
    if (!selectedShift) {
        showNotification('Please select a shift!', 'error');
        return;
    }
    
    // Get training selections
    const training = [];
    document.querySelectorAll('#editBadgeForm .training-checkbox').forEach(cb => {
        if (cb.checked) {
            training.push(cb.value);
        }
    });
    
    // Find badge in array
    const badgeIndex = badges.findIndex(badge => badge.id === badgeId);
    if (badgeIndex !== -1) {
        // Check if new role has space (if role changed)
        const oldRole = badges[badgeIndex].role;
        if (oldRole !== role) {
            const currentCount = badges.filter(badge => badge.role === role).length;
            if (currentCount >= roles[role].limit) {
                showNotification(`${roles[role].name} section is full!`, 'error');
                return;
            }
        }
        
        // Update badge
        badges[badgeIndex].name = name;
        badges[badgeIndex].role = role;
        badges[badgeIndex].shift = selectedShift;
        badges[badgeIndex].training = training;
        badges[badgeIndex].timestamp = new Date().toISOString();
        
        // Save and re-render
        saveToLocalStorage();
        renderBadges();
        closeEditModal();
        showNotification('Badge updated successfully!', 'success');
    }
}



// BadgeformUpdate for training
function updateBadgeFormSubmitHandler() {
    badgeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('badgeName').value;
        const id = document.getElementById('badgeId').value;
        const role = document.getElementById('initialRole').value;
        
        // Get selected shift
        const shiftCheckboxes = document.querySelectorAll('.shift-checkbox');
        let selectedShift = '';
        shiftCheckboxes.forEach(cb => {
            if (cb.checked) {
                selectedShift = cb.value;
            }
        });

        if (!selectedShift) {
            showNotification('Please select a shift!', 'error');
            return;
        }
        
        // Get training selections
        const training = [];
        document.querySelectorAll('#trainingSection .training-checkbox').forEach(cb => {
            if (cb.checked) {
                training.push(cb.value);
            }
        });

        // Check if role has space
        const currentCount = badges.filter(badge => badge.role === role).length;
        if (currentCount >= roles[role].limit) {
            showNotification(`${roles[role].name} section is full!`, 'error');
            return;
        }
        
        // Check if ID already exists
        if (badges.some(badge => badge.id === id)) {
            showNotification('Employee ID already exists!', 'error');
            return;
        }
        
        // Create new badge with training data
        const newBadge = createBadge(name, id, role, selectedShift, training);
        badges.push(newBadge);
        
        // Save to localStorage
        saveToLocalStorage();
        
        // Re-render and close modal
        renderBadges();
        closeModalFunc();
        showNotification('Badge created successfully!', 'success');
    });
}