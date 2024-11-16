import { apiRequest } from '/js/services/apiService.js';
import { getFromLocalStorage, storeInLocalStorage } from "/js/modules/utils.js";

const apiBaseUrl = 'http://localhost:5000';

// Function to retrieve the logged-in user's role
export async function getUserRole(username) {
    try {
        const response = await apiRequest(`/members/${username}/roles`)
        const data = response;
        return data.roles || [];  // Extract the roles array from the response
    } catch (error) {
        console.error('Error fetching user roles:', error);
        return [];
    }
}

// Function to retrieve the logged-in user's role
export async function getAllUsers() {
    try {
        const response = await apiRequest(`/members`)
        return response
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

// Function to display user role(s) on the main page
export async function displayUserRole() {
    // const username = getCookie('username'); // Retrieve username from cookie
    const username = getFromLocalStorage('username');

    if (username) {
        const roles = await getUserRole(username); // Fetch the roles array
        storeInLocalStorage('roles', roles);

        const roleElement = document.getElementById('userRoles');
        if (roles.length > 0) {
            roleElement.innerText = `Roles: ${roles.join(', ')}`; // Join roles with commas
        } else {
            roleElement.innerText = 'No roles assigned';
        }
    } else {
        console.warn('Username not found in session. Redirecting to login.');
        window.location.href = '/login';
    }
}

// Function to fetch member data based on the username
export async function fetchUserData(username) {
    try {
        const response = await apiRequest(`/members/${username}`)
        return response;
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// Function to fetch and display member logo
export async function displayUserLogo(username) {
    try {
        const response = await fetch(`${apiBaseUrl}/members/${username}/logo`, {
            method: 'GET',
            credentials: 'include' // Ensure cookies are included
        });

        if (response.ok) {
            const blob = await response.blob(); // Get the logo as a Blob
            const imageUrl = URL.createObjectURL(blob); // Create a URL for the image blob
            const logoElement = document.getElementById('memberLogo');
            logoElement.src = imageUrl; // Set the src attribute to the image URL
        } else {
            console.error('Failed to fetch member logo:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching member logo:', error);
    }
}

// Function to upload a new member logo
export async function uploadUserLogo(username, file) {
    const formData = new FormData(); // FormData is used to send file data
    formData.append('file', file);   // Append the file to the form data with the name "logo"
    console.log(formData.get('file'));  // Log the file to check if it is added correctly

    try {
        const response = await fetch(`${apiBaseUrl}/members/${username}/logo`, {
            method: 'POST',
            headers: {
                // No need to set 'Content-Type' because FormData automatically sets it
            },
            credentials: 'include', // Ensure cookies are included
            body: formData // Send the file in the body of the request
        });

        if (response.ok) {
            const result = await response.json(); // Get the server response
            document.getElementById('message').innerText = 'Logo uploaded successfully!';

            // After successful upload, fetch the new logo and display it
            displayUserLogo(username);
        } else {
            console.error('Failed to upload logo:', response.statusText);
            document.getElementById('message').innerText = 'Failed to upload logo. Please try again.';
        }
    } catch (error) {
        console.error('Error uploading logo:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
}

// Function to handle form submission and update member data
export async function uploadUserFormData(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const username = getFromLocalStorage('username')
    if (!username) {
        document.getElementById('message').innerText = 'No user logged in!';
        return;
    }

    const updatedMemberData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        course: document.getElementById('course').value,
        description: document.getElementById('description').value,
        ist_id: document.getElementById('istId').value
    };

    try {
        const response = await apiRequest(`/members/${username}`, 'PUT', updatedMemberData)

        const result = response;
        document.getElementById('message').innerText = 'Profile updated successfully!';
        populateFormWithUserData(result);  // Update form with the new data
    } catch (error) {
        console.error('Error updating member data:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
}

// Populate the form fields with the current member data
export function populateFormWithUserData(memberData) {
    document.getElementById('name').value = memberData.name || '';
    document.getElementById('email').value = memberData.email || '';
    document.getElementById('course').value = memberData.course || '';
    document.getElementById('description').value = memberData.description || '';
    document.getElementById('istId').value = memberData.ist_id || '';
}
