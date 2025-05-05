// modals.js - Modal dialogs and forms

// Add edit modal HTML to page
function addEditModalToPage() {
    // Create modal element if it doesn't exist
    if (!document.getElementById('editBadgeModal')) {
        const editModal = document.createElement('div');
        editModal.id = 'editBadgeModal';
        editModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-50 hidden z-50 flex items-center justify-center';
        editModal.innerHTML = `
            <div class="modal-content bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
                <div class="bg-blue-600 px-6 py-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold text-white">Edit Badge</h2>
                    <button id="closeEditModal" class="text-white hover:text-blue-200 transition-colors">
                        <i class="fa-solid fa-times text-xl"></i>
                    </button>
                </div>
                <form id="editBadgeForm" class="p-6">
                    <input type="hidden" id="editBadgeId">
                    <div class="mb-4">
                        <label for="editBadgeName" class="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                        <input type="text" id="editBadgeName" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div class="mb-4">
                        <label for="editEmployeeId" class="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                        <input type="text" id="editEmployeeId" required disabled
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none">
                    </div>
                    <div class="mb-4">
                        <label for="editRole" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select id="editRole"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="unassigned">Unassigned</option>
                            <option value="teamLead">Team Lead</option>
                            <option value="palletPuller">Pallet Puller</option>
                            <option value="palletize">Palletize</option>
                            <option value="binding">Binding</option>
                            <option value="shooting">Shooting</option>
                            <option value="tawiOperators">Tawi Operators</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                        <div class="flex flex-wrap gap-2">
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="editShift" value="NB3" class="edit-shift-checkbox">
                                <span>NB3</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="editShift" value="NA5" class="edit-shift-checkbox">
                                <span>NA5</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="editShift" value="Donut" class="edit-shift-checkbox">
                                <span>Donut</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="editShift" value="NF6" class="edit-shift-checkbox">
                                <span>NF6</span>
                            </label>
                        </div>
                    </div>
                    <div class="mb-5">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Training</label>
                        <div class="grid grid-cols-2 gap-2 border border-gray-200 rounded-md p-3">
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="training" value="teamLead" class="training-checkbox">
                                <span>Team Lead</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="training" value="palletPuller" class="training-checkbox">
                                <span>Pallet Puller</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="training" value="palletize" class="training-checkbox">
                                <span>Palletize</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="training" value="binding" class="training-checkbox">
                                <span>Binding</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="training" value="shooting" class="training-checkbox">
                                <span>Shooting</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" name="training" value="tawiOperators" class="training-checkbox">
                                <span>Tawi Operators</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" 
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Update Badge
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(editModal);
        
        // Add event listeners
        document.getElementById('closeEditModal').addEventListener('click', closeEditModal);
        document.getElementById('editBadgeForm').addEventListener('submit', handleEditFormSubmit);
        
        // Close modal when click outside it
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                closeEditModal();
            }
        });
    }
}

function updateCreateBadgeModal() {
    const badgeForm = document.getElementById('badgeForm');
    
    // Check if training section already exists
    if (!document.getElementById('trainingSection')) {
        const trainingDiv = document.createElement('div');
        trainingDiv.id = 'trainingSection';
        trainingDiv.className = 'mb-5';
        trainingDiv.innerHTML = `
            <label class="block text-sm font-medium text-gray-700 mb-1">Training</label>
            <div class="grid grid-cols-2 gap-2 border border-gray-200 rounded-md p-3">
                <label class="flex items-center space-x-2">
                    <input type="checkbox" name="training" value="teamLead" class="training-checkbox">
                    <span>Team Lead</span>
                </label>
                <label class="flex items-center space-x-2">
                    <input type="checkbox" name="training" value="palletPuller" class="training-checkbox">
                    <span>Pallet Puller</span>
                </label>
                <label class="flex items-center space-x-2">
                    <input type="checkbox" name="training" value="palletize" class="training-checkbox">
                    <span>Palletize</span>
                </label>
                <label class="flex items-center space-x-2">
                    <input type="checkbox" name="training" value="binding" class="training-checkbox">
                    <span>Binding</span>
                </label>
                <label class="flex items-center space-x-2">
                    <input type="checkbox" name="training" value="shooting" class="training-checkbox">
                    <span>Shooting</span>
                </label>
                <label class="flex items-center space-x-2">
                    <input type="checkbox" name="training" value="tawiOperators" class="training-checkbox">
                    <span>Tawi Operators</span>
                </label>
            </div>
        `;
        
        // Insert before submit button
        const submitButton = badgeForm.querySelector('button[type="submit"]');
        badgeForm.insertBefore(trainingDiv, submitButton);
    }
}

// Open edit modal with badge data
function openEditModal(badgeId) {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return;
    
    // Make sure edit modal exists
    addEditModalToPage();
    
    // Show modal
    document.getElementById('editBadgeModal').classList.remove('hidden');
    
    // Populate form with badge data
    document.getElementById('editBadgeId').value = badge.id;
    document.getElementById('editBadgeName').value = badge.name;
    document.getElementById('editEmployeeId').value = badge.id;
    document.getElementById('editRole').value = badge.role;
    
    // Set shift
    const shiftCheckboxes = document.querySelectorAll('.edit-shift-checkbox');
    shiftCheckboxes.forEach(cb => {
        cb.checked = cb.value === badge.shift;
    });
    
    // Set training checkboxes
    const trainingCheckboxes = document.querySelectorAll('#editBadgeForm .training-checkbox');
    trainingCheckboxes.forEach(cb => {
        cb.checked = badge.training && badge.training.includes(cb.value);
    });
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editBadgeModal').classList.add('hidden');
}
// Initialize edit/delete functionality on page load
function initializeEditDelete() {
    // Add edit modal to page
    addEditModalToPage();
    
    // Update create badge modal
    updateCreateBadgeModal();
    
    // Update badge form submit handler
    updateBadgeFormSubmitHandler();
}
        

        

        

        // Modal functions
        function openModal() {
            badgeModal.classList.remove('hidden');
        }
        
        function closeModalFunc() {
            badgeModal.classList.add('hidden');
            badgeForm.reset();
        }