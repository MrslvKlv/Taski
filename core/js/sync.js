// sync.js - Local to Remote Sync 

        // Sync data with server
        async function syncData() {
            try {
                showNotification('Syncing data...', 'success');
                
                // For demonstration, we're mocking the fetch request
                //  app, will use actual fetch
                
                // Simulate fetching remote data
                const remoteData = await mockFetch(syncUrl);
                
                // Compare timestamps and update
                if (remoteData && remoteData.badges) {
                    // Create new merged badges array
                    let updatedBadges = [...badges];
                    
                    // Check each remote badge
                    remoteData.badges.forEach(remoteBadge => {
                        const localBadgeIndex = updatedBadges.findIndex(b => b.id === remoteBadge.id);
                        
                        if (localBadgeIndex === -1) {
                            // Badge doesn't exist locally, add it
                            updatedBadges.push(remoteBadge);
                        } else {
                            // Badge exists, check timestamps
                            const localTimestamp = new Date(updatedBadges[localBadgeIndex].timestamp);
                            const remoteTimestamp = new Date(remoteBadge.timestamp);
                            
                            // If remote is newer, update local
                            if (remoteTimestamp > localTimestamp) {
                                updatedBadges[localBadgeIndex] = remoteBadge;
                            }
                        }
                    });
                    
                    // Update badges and re-render
                    badges = updatedBadges;
                    
                    // Save to localStorage
                    saveToLocalStorage();
                    
                    renderBadges();
                    
                    // Now post back updated data
                    await mockPost(syncUrl, { badges });
                    
                    showNotification('Data synchronized successfully!', 'success');
                }
            } catch (error) {
                console.error('Sync error:', error);
                showNotification('Sync failed! Check console for details.', 'error');
            }
        }

                // Mock fetch function (replace with real fetch in production)
                async function mockFetch(url) {
                    return new Promise((resolve) => {
                        // Simulate network delay
                        setTimeout(() => {
                            // Mock data from server
                            const mockData = localStorage.getItem('shiftBoardData');
                            resolve(mockData ? JSON.parse(mockData) : { badges: [] });
                        }, 500);
                    });
                }
                
        // Mock post function (replace with real fetch in production)
        async function mockPost(url, data) {
            return new Promise((resolve) => {
                // Simulate network delay
                setTimeout(() => {
                    // Store data in localStorage to simulate server storage
                    localStorage.setItem('shiftBoardData', JSON.stringify(data));
                    resolve({ success: true });
                }, 500);
            });
        }