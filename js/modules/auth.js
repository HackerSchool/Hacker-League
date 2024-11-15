import { apiRequest } from '/js/services/apiService.js';
import { getFromLocalStorage, storeInLocalStorage } from "/js/modules/utils.js";

const apiBaseUrl = 'http://localhost:8080/api';

export async function login(username, password) {
    const loginData = { username, password };

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
            // After successful login, store the username in a cookie
            // document.cookie = `username=${username}; path=/;`;
            storeInLocalStorage('username', username)

            // Redirect to home page after successful login
            window.location.href = '/';
        } else {
            // Handle failed login
            document.getElementById('message').innerText = 'Login failed. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }

}

export async function logout() {
    try {
        const response = await fetch(`${apiBaseUrl}/logout`, {
            method: 'GET',
            credentials: 'include'  // Ensure cookies are sent with the request
        });

        if (response.ok) {
            // Redirect to the login page after a successful logout
            window.location.href = '/login';
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}


export async function checkLogin() {
    try {
        // Use the `apiRequest` function for the GET request
        await apiRequest('/members', 'GET');
        return true; // If the request succeeds, the user is logged in
    } catch (error) {
        console.error('User is not logged in or there was an error:', error.message);
        return false; // Return false if the request fails
    }
}

