// config.js - Configuration and constants for the shift board application

// Training positions configuration
const trainingPositions = {
    teamLead: { name: "Team Lead", icon: "fa-user-tie" },
    palletPuller: { name: "Pallet Puller", icon: "fa-dolly" },
    palletize: { name: "Palletize", icon: "fa-box" },
    binding: { name: "Binding", icon: "fa-link" },
    shooting: { name: "Shooting", icon: "fa-camera" },
    tawiOperators: { name: "Tawi Operators", icon: "fa-cog" }
};

// Role configuration
const roles = {
    teamLead: { 
        name: "Team Lead", 
        limit: 2, 
        level: 1,  
        color: "bg-red-100 border-red-500",
        iconClass: "fa-solid fa-user-tie"
    },
    shooting: { 
        name: "Shooting", 
        limit: 3, 
        level: 1,  
        color: "bg-purple-100 border-purple-500",
        iconClass: "fa-solid fa-camera"
    },
    binding: { 
        name: "Binding", 
        limit: 3, 
        level: 1,  
        color: "bg-yellow-100 border-yellow-500",
        iconClass: "fa-solid fa-link"
    },
    tawiOperators: { 
        name: "Tawi Operators", 
        limit: 6, 
        level: 2,  
        color: "bg-blue-100 border-blue-500",
        iconClass: "fa-solid fa-cog"
    },
    palletPuller: { 
        name: "Pallet Puller", 
        limit: 4, 
        level: 2,  
        color: "bg-green-100 border-green-500",
        iconClass: "fa-solid fa-dolly"
    },
    palletize: { 
        name: "Palletize", 
        limit: 20, 
        level: 3, 
        color: "bg-orange-100 border-orange-500",
        iconClass: "fa-solid fa-box"
    },
    unassigned: { 
        name: "Unassigned", 
        limit: Infinity, 
        level: 4,  
        color: "bg-gray-100 border-gray-400",
        iconClass: "fa-solid fa-user"
    }
};

// Shift color configuration
const shiftColors = {
    NB3: 'bg-blue-200 border-blue-500',
    NA5: 'bg-green-200 border-green-500',
    Donut: 'bg-pink-200 border-pink-500',
    NF6: 'bg-yellow-200 border-yellow-500',
    default: 'bg-gray-200 border-gray-400'
};

// URL for syncing [Work In Progress]
const syncUrl = "https://share.amazon.com/sites/ibsr/shareddocuments/devtest/shiftboard/appdata/synch.txt";

// Base URL to extract employee photo from internal-cdn 
const avatarBaseUrl = "https://internal-cdn.amazon.com/badgephotos.amazon.com/?uid=";

// Local Storage Key
const LOCAL_STORAGE_KEY = 'taskiBadgesData';
