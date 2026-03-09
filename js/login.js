document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // Default credentials (can be changed by user later)
    const VALID_USERNAME = 'admin';
    const VALID_PASSWORD = 'password';

    // Check if already "logged in"
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            // Save session
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            
            // Success animation or direct redirect
            loginForm.querySelector('.btn-login').textContent = 'Iniciando sesión...';
            loginForm.querySelector('.btn-login').style.opacity = '0.7';
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);
        } else {
            // Show error
            loginError.style.display = 'block';
            
            // Vibrate effect for card
            const container = document.querySelector('.login-container');
            container.style.animation = 'none';
            container.offsetHeight; // trigger reflow
            container.style.animation = 'shake 0.4s';
            
            // Add shake keyframes if not present
            if (!document.getElementById('shake-keyframes')) {
                const style = document.createElement('style');
                style.id = 'shake-keyframes';
                style.innerHTML = `
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-10px); }
                        75% { transform: translateX(10px); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    });

    // Hide error when typing
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
            loginError.style.display = 'none';
        });
    });
});
