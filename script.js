document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const bookingResult = document.getElementById('bookingResult');
    const availabilityForm = document.getElementById('availability-form');
    const availabilityResult = document.getElementById('availabilityResult');

    // Load bookings from localStorage or initialize empty array
    function loadBookings() {
        const bookings = localStorage.getItem('hotelBookings');
        return bookings ? JSON.parse(bookings) : [];
    }

    // Save bookings to localStorage
    function saveBookings(bookings) {
        localStorage.setItem('hotelBookings', JSON.stringify(bookings));
    }

    // Check if room is available for given type and date range
    function isRoomAvailable(roomType, checkInDate, checkOutDate) {
        const bookings = loadBookings();
        // Check for overlapping bookings of the same room type
        for (const booking of bookings) {
            if (booking.roomType === roomType) {
                // If dates overlap, room is not available
                if (!(new Date(checkOutDate) <= new Date(booking.checkInDate) || new Date(checkInDate) >= new Date(booking.checkOutDate))) {
                    return false;
                }
            }
        }
        return true;
    }

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const guestName = bookingForm.guestName.value.trim();
        const roomType = bookingForm.roomType.value;
        const checkInDate = bookingForm.checkInDate.value;
        const checkOutDate = bookingForm.checkOutDate.value;

        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            bookingResult.textContent = 'Check-out date must be after check-in date.';
            bookingResult.style.color = 'red';
            return;
        }

        if (!isRoomAvailable(roomType, checkInDate, checkOutDate)) {
            bookingResult.textContent = 'Sorry, the selected room type is not available for the chosen dates.';
            bookingResult.style.color = 'red';
            return;
        }

        const bookings = loadBookings();
        bookings.push({ guestName, roomType, checkInDate, checkOutDate });
        saveBookings(bookings);

        bookingResult.textContent = `Room booked successfully for ${guestName}!`;
        bookingResult.style.color = 'green';
        bookingForm.reset();
    });

    availabilityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roomType = availabilityForm.availabilityRoomType.value;
        const date = availabilityForm.availabilityDate.value;

        const bookings = loadBookings();
        let available = true;
        for (const booking of bookings) {
            if (booking.roomType === roomType) {
                if (new Date(date) >= new Date(booking.checkInDate) && new Date(date) < new Date(booking.checkOutDate)) {
                    available = false;
                    break;
                }
            }
        }

        if (available) {
            availabilityResult.textContent = `The ${roomType} room is available on ${date}.`;
            availabilityResult.style.color = 'green';
        } else {
            availabilityResult.textContent = `The ${roomType} room is NOT available on ${date}.`;
            availabilityResult.style.color = 'red';
        }
    });
});
