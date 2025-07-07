// Room data
const ROOMS = {
    standard: {
        id: 1,
        type: 'Standard Room',
        price: 100.0,
        totalRooms: 20,
        amenities: [
            'Free WiFi',
            'Flat-screen TV',
            'Private bathroom',
            'Complimentary breakfast'
        ]
    },
    deluxe: {
        id: 2,
        type: 'Deluxe Room',
        price: 150.0,
        totalRooms: 10,
        amenities: [
            'King bed',
            'City view',
            'Mini bar',
            'Spa access',
            'Complimentary breakfast'
        ]
    },
    suite: {
        id: 3,
        type: 'Suite',
        price: 250.0,
        totalRooms: 5,
        amenities: [
            'Living room',
            '2 bathrooms',
            'Private balcony',
            'Executive lounge access',
            'Complimentary breakfast',
            'Personal butler service'
        ]
    }
};

// Booking data (stored in localStorage)
let BOOKINGS = JSON.parse(localStorage.getItem('bookings')) || [];

// Save bookings to localStorage
function saveBookings() {
    localStorage.setItem('bookings', JSON.stringify(BOOKINGS));
}

// Check if date ranges overlap
function isDateRangeOverlap(checkIn1, checkOut1, checkIn2, checkOut2) {
    return !checkOut1 < checkIn2 && !checkIn1 > checkOut2;
}

// Get available rooms for a date range
export function getAvailableRooms(checkIn, checkOut, roomType = 'all') {
    const availableRooms = [];
    
    for (const [type, room] of Object.entries(ROOMS)) {
        if (roomType === 'all' || type === roomType) {
            let availableRoomsCount = room.totalRooms;
            
            // Check bookings for this room type
            for (const booking of BOOKINGS) {
                if (booking.roomType === type && 
                    isDateRangeOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut)) {
                    availableRoomsCount--;
                }
            }
            
            if (availableRoomsCount > 0) {
                availableRooms.push({
                    ...room,
                    availableRooms: availableRoomsCount
                });
            }
        }
    }
    
    return availableRooms;
}

// Book a room
export function bookRoom(checkIn, checkOut, roomType, roomsCount) {
    const booking = {
        checkIn,
        checkOut,
        roomType,
        roomsCount,
        timestamp: new Date().toISOString()
    };
    
    BOOKINGS.push(booking);
    saveBookings();
    
    return booking;
}

// Get room price
export function getRoomPrice(roomType) {
    return ROOMS[roomType]?.price || 0;
}

// Get all bookings
export function getAllBookings() {
    return BOOKINGS;
}

// Get room by type
export function getRoomByType(roomType) {
    return ROOMS[roomType];
}
