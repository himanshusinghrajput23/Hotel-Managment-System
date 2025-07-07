import { getAvailableRooms, bookRoom } from './data.js';

document.getElementById('availabilityForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const roomType = document.getElementById('roomType').value;
    
    try {
        const availableRooms = await getAvailableRooms(checkIn, checkOut, roomType);
        displayAvailabilityResults(availableRooms);
    } catch (error) {
        console.error('Error fetching availability:', error);
        alert('Error checking room availability. Please try again.');
    }
});

function displayAvailabilityResults(rooms) {
    const resultsGrid = document.querySelector('.results-grid');
    resultsGrid.innerHTML = '';
    
    rooms.forEach(room => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
            <h3>${room.type}</h3>
            <p class="price">$${room.price}/night</p>
            <p>Available Rooms: ${room.availableRooms}</p>
            <button class="book-button" onclick="bookRoom(${room.id}, '${room.type}', '${checkIn}', '${checkOut}')">Book Now</button>
        `;
        resultsGrid.appendChild(resultCard);
    });
}

async function bookRoom(roomId, roomType, checkIn, checkOut) {
    try {
        const booking = await bookRoom(checkIn, checkOut, roomType, 1);
        alert(`Successfully booked ${roomType}!`);
        // Refresh availability
        const availableRooms = await getAvailableRooms(checkIn, checkOut, roomType);
        displayAvailabilityResults(availableRooms);
    } catch (error) {
        console.error('Error booking room:', error);
        alert('Error booking room. Please try again.');
    }
}
