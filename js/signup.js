document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

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
