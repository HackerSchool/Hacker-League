import { apiRequest } from '/js/services/apiService.js';
import { getFromLocalStorage, storeInLocalStorage } from "/js/modules/utils.js";

const apiBaseUrl = 'http://localhost:5000';

// Temporary test credentials for development
const testUsers = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' },
    { username: 'test', password: 'test123', role: 'user' }
];

export async function login(username, password) {
    const loginData = { username, password };

    // Check if it's a test user first
    const testUser = testUsers.find(user => 
        user.username === username && user.password === password
    );

    if (testUser) {
        // Simulate successful login for test users
        storeInLocalStorage('username', username);
        storeInLocalStorage('role', testUser.role);
        document.getElementById('message').innerText = 'Login successful!';
        window.location.href = '/';
        return;
    }

    // Try real backend if test login fails
    try {
        const response = await fetch(`${apiBaseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData),
            credentials: 'include'  // Ensures cookies are sent/received automatically
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('message').innerText = result.message;
            storeInLocalStorage('username', username)
            window.location.href = '/';
        } else {
            // Handle failed login
            document.getElementById('message').innerText = 'Login failed. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Backend not available. Using test credentials.';
    }
}

export async function logout() {
    try {
        const response = await fetch(`${apiBaseUrl}/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            // Clear local storage
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            window.location.href = '/login';
        } else {
            console.error('Logout failed');
            // Clear local storage anyway
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Error during logout:', error);
        // Clear local storage anyway
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.href = '/login';
    }
}

export async function checkLogin() {
    const username = getFromLocalStorage('username');
    return !!username; // Return true if username exists, false otherwise
}

