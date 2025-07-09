document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewMessage = document.getElementById('reviewMessage');

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reviewName').value;
            const review = document.getElementById('reviewText').value;

            if (!name || !review) {
                alert('Please fill all fields.');
                return;
            }

            // For now, just show a success message and reset the form
            reviewMessage.textContent = `Thank you for your review, ${name}!`;
            reviewForm.reset();
        });
    }
});
