document.addEventListener('DOMContentLoaded', () => {
    const authPage = document.getElementById('authPage');
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('signInSubmit');

    // 1. Entrance Animation
    setTimeout(() => {
        authPage.classList.add('loaded');
    }, 100);

    // 2. Form Handling with "Professional" feedback
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Visual feedback
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "AUTHENTICATING...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        // Simulate API Call
        setTimeout(() => {
            const email = document.getElementById('email').value;
            
            // Simple logic for demo
            if(email) {
                // Success animation/redirect
                submitBtn.innerText = "WELCOME BACK";
                submitBtn.style.background = "#27AE60"; // Success Green
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        }, 1500);
    });
});