// ui.js - UI rendering functions

// Initialize board
function initializeShiftBoard() {
    // Clear level containers
    document.getElementById('level1Container').innerHTML = '';
    document.getElementById('level2Container').innerHTML = '';
    document.getElementById('level3Container').innerHTML = '';
    document.getElementById('level4Container').innerHTML = '';
    
    // Create role sections
    Object.keys(roles).forEach(roleId => {
        const role = roles[roleId];
        const levelContainer = document.getElementById(`level${role.level}Container`);
        
        const roleSection = document.createElement('div');
        roleSection.className = 'bg-white rounded-xl shadow-sm overflow-hidden';
        
        const roleHeader = document.createElement('div');
        roleHeader.className = 'flex items-center justify-between p-4 border-b border-gray-100';
        roleHeader.innerHTML = `
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center ${role.color.split(' ')[0]} mr-3">
                    <i class="${role.iconClass} text-${role.color.split('-')[1]}-600"></i>
                </div>
                <h3 class="font-semibold text-gray-800">${role.name}</h3>
            </div>
            <span id="${roleId}-count" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                0/${role.limit === Infinity ? '∞' : role.limit}
            </span>
        `;
        
        const roleSlots = document.createElement('div');
        roleSlots.className = 'role-slots p-4 min-h-[140px] grid grid-cols-2 sm:grid-cols-3 gap-3';
        roleSlots.id = roleId;
        roleSlots.dataset.role = roleId;
        
        // Drag and drop event listeners
        roleSlots.addEventListener('dragover', dragOver);
        roleSlots.addEventListener('dragenter', dragEnter);
        roleSlots.addEventListener('dragleave', dragLeave);
        roleSlots.addEventListener('drop', drop);
        
        roleSection.appendChild(roleHeader);
        roleSection.appendChild(roleSlots);
        levelContainer.appendChild(roleSection);
    });
    
    // Load data from localStorage
    loadFromLocalStorage();
    
    // Render badges
    renderBadges();
}

// Render all badges
function renderBadges() {
    // Clear all role slots
    Object.keys(roles).forEach(roleId => {
        const roleSlots = document.getElementById(roleId);
        roleSlots.innerHTML = '';
    });
    
    // Render badges in their roles
    badges.forEach(badge => {
        const badgeElement = createBadgeElement(badge);
        document.getElementById(badge.role).appendChild(badgeElement);
    });
    
    // Update slot counts
    updateSlotCounts();
}

function createBadgeElement(badge) {
    const role = roles[badge.role];
    const avatarUrl = `${avatarBaseUrl}${encodeURIComponent(badge.name)}`;
    const shiftColor = shiftColors[badge.shift] || shiftColors.default;

    const badgeElement = document.createElement('div');
    badgeElement.className = `badge ${shiftColor} border-2 rounded-lg shadow hover:shadow-md overflow-hidden`;
    badgeElement.draggable = true;
    badgeElement.id = `badge-${badge.id}`;
    badgeElement.dataset.id = badge.id;
    const badgeControls = `
        <div class="absolute top-1 right-1 flex space-x-1">
            <button class="edit-badge p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none" 
                    title="Edit badge" data-id="${badge.id}">
                <i class="fa-solid fa-pencil text-xs"></i>
            </button>
            <button class="delete-badge p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none" 
                    title="Delete badge" data-id="${badge.id}">
                <i class="fa-solid fa-trash text-xs"></i>
            </button>
        </div>
    `;
    let trainingIconsHTML = '';
    if (badge.training && badge.training.length > 0) {
        trainingIconsHTML = `
            <div class="flex flex-wrap justify-center gap-1 mt-1 mb-1">
                ${badge.training.map(positionId => {
                    const position = trainingPositions[positionId];
                    if (position) {
                        return `<div class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center" 
                                    title="Trained: ${position.name}">
                                    <i class="fa-solid ${position.icon} text-xs text-gray-700"></i>
                                </div>`;
                    }
                    return '';
                }).join('')}
            </div>
        `;
    }
    // Create init placeholder
    badgeElement.innerHTML = `
        <div class="flex flex-col items-center w-full">
            ${badgeControls}
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-1" id="avatar-container-${badge.id}">
                <span class="text-gray-600 font-bold text-xl">${badge.name.charAt(0).toUpperCase()}</span>
            </div>
            <div class="font-semibold text-gray-800 text-center text-sm">${badge.name}</div>
            ${trainingIconsHTML}
            <div class="barcode-container mt-1">
                <svg class="barcode" id="barcode-${badge.id}"></svg>
            </div>
        </div>
    `;

    // Preload image and replace placeholder when loaded
    const avatarImg = new Image();
    avatarImg.onload = function() {
        const avatarContainer = document.getElementById(`avatar-container-${badge.id}`);
        if (avatarContainer) {
            avatarContainer.innerHTML = '';
            avatarContainer.className = 'w-12 h-12 rounded-full mb-1 overflow-hidden';
            
            const img = document.createElement('img');
            img.src = avatarUrl;
            img.alt = badge.name;
            img.className = 'w-full h-full object-cover';
            img.draggable = false;
            
            avatarContainer.appendChild(img);
        }
    };
    // Set source after defining the onload handler
    avatarImg.src = avatarUrl;

    badgeElement.addEventListener('dragstart', dragStart);
    badgeElement.addEventListener('dragend', dragEnd);
    
    // Add event listeners for edit and delete buttons
    setTimeout(() => {
        const editBtn = badgeElement.querySelector('.edit-badge');
        const deleteBtn = badgeElement.querySelector('.delete-badge');
        
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openEditModal(badge.id);
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteBadge(badge.id);
            });
        }
        
        // Generate barcode
        try {
            JsBarcode(`#barcode-${badge.id}`, badge.id, {
                format: "CODE128",
                width: 1.5,
                height: 20,
                displayValue: false,
                margin: 0
            });
        } catch (error) {
            console.error("Failed to generate barcode:", error);
        }
    }, 0);

    return badgeElement;
}

// Update all roles slot counts 
function updateSlotCounts() {
    Object.keys(roles).forEach(roleId => {
        const count = badges.filter(badge => badge.role === roleId).length;
        const limit = roles[roleId].limit;
        document.getElementById(`${roleId}-count`).textContent = `${count}/${limit === Infinity ? '∞' : limit}`;
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    
    if (type === 'success') {
        notification.className = 'notification fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-green-500 z-50';
        notificationIcon.className = 'fa-solid fa-check-circle mr-3 text-white';
    } else {
        notification.className = 'notification fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-red-500 z-50';
        notificationIcon.className = 'fa-solid fa-exclamation-circle mr-3 text-white';
    }
    
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const icon = themeToggleBtn.querySelector('i');
    const text = themeToggleBtn.querySelector('span');
    
    // Check if there is a set theme preference by default
    const savedTheme = localStorage.getItem('taskiTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.className = 'fa-solid fa-sun';
        text.textContent = 'Light Mode';
    }
    
    // Toggle theme when button clicked
    themeToggleBtn.addEventListener('click', () => {
        // Toggle dark mode class on body
        document.body.classList.toggle('dark-mode');
        
        // Update icon / text
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fa-solid fa-sun';
            text.textContent = 'Light Mode';
            localStorage.setItem('taskiTheme', 'dark');
        } else {
            icon.className = 'fa-solid fa-moon';
            text.textContent = 'Dark Mode';
            localStorage.setItem('taskiTheme', 'light');
        }
    });
}
