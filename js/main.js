import { ROOMS, getRoomByType } from './data.js';

// Initialize room cards on rooms page
document.addEventListener('DOMContentLoaded', () => {
    const roomGrid = document.querySelector('.room-grid');
    if (roomGrid) {
        displayRooms();
    }
});

function displayRooms() {
    const roomGrid = document.querySelector('.room-grid');
    roomGrid.innerHTML = '';
    
    Object.values(ROOMS).forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.innerHTML = `
            <img src="images/${room.type.toLowerCase().replace(' ', '-')}.jpg" alt="${room.type}">
            <h3>${room.type}</h3>
            <p>Starting at $${room.price}/night</p>
            <ul>
                ${room.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
            </ul>
        `;
        roomGrid.appendChild(roomCard);
    });
}

// Handle room type selection on availability page
function handleRoomTypeSelection() {
    const roomTypeSelect = document.getElementById('roomType');
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', () => {
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            const roomType = roomTypeSelect.value;
            
            if (checkIn && checkOut) {
                getAvailableRooms(checkIn, checkOut, roomType)
                    .then(rooms => displayAvailabilityResults(rooms))
                    .catch(error => console.error('Error:', error));
            }
        });
    }
}

// Format date for display
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

// Format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Export functions for other modules
export { 
    handleRoomTypeSelection,
    formatDate,
    formatPrice 
};
