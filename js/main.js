
import { ROOMS, getRoomByType } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const roomGrid = document.querySelector('.room-grid');
    if (roomGrid) {
        displayRooms();
    }

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            if (email && password) {
                alert(`Logged in as ${email}`);
                loginForm.reset();
            } else {
                alert('Please enter email and password.');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            if (!email || !password || !confirmPassword) {
                alert('Please fill all fields.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            alert(`Signed up as ${email}`);
            signupForm.reset();
        });
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
        roomCard.addEventListener('click', () => {
            openRoomModal(room);
        });
        roomGrid.appendChild(roomCard);
    });
}

function openRoomModal(room) {
    const modal = document.getElementById('roomModal');
    const modalRoomType = document.getElementById('modalRoomType');
    const modalRoomPrice = document.getElementById('modalRoomPrice');
    const modalRoomAvailability = document.getElementById('modalRoomAvailability');

    modalRoomType.textContent = room.type;
    modalRoomPrice.textContent = `Price: $${room.price.toFixed(2)} per night`;

    modalRoomAvailability.textContent = `Total Rooms Available: ${room.totalRooms}`;

    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('roomModal');
    const closeButton = document.getElementById('modalClose');

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

);

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

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

export { 
    handleRoomTypeSelection,
    formatDate,
    formatPrice 
};
