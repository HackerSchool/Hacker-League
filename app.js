// Define the API base URL
const apiBaseUrl = 'http://localhost:8080/api';

// Improved function to get a cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) return decodeURIComponent(cookieValue);
    }
    return null;
}

// Check if the user is logged in by looking for a specific cookie
if (window.location.pathname === '/' && !getCookie('accessToken')) {
    // No session cookie, redirect to /login
    console.log("ahaha no cookies?");
    window.location.href = '/login';
}

// Handle the login form submission
if (window.location.pathname === '/login') {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
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
    });
}

// Logout function
async function logout() {
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

// Trigger the logout function when on the logout page
if (window.location.pathname === '/logout') {
    logout();
}

// Function to retrieve the logged-in user's role
async function getUserRole(username) {
    try {
        const response = await fetch(`${apiBaseUrl}/members/${username}/roles`, {
            method: 'GET',
            credentials: 'include' // Include the session cookie
        });

        if (response.ok) {
            const data = await response.json();
            return data.roles || [];  // Extract the roles array from the response
        } else {
            console.error('Failed to fetch user roles:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching user roles:', error);
        return [];
    }
}

// Function to display user role(s) on the main page
async function displayUserRole() {
    // const username = getCookie('username'); // Retrieve username from cookie
    const username = getFromLocalStorage('username');

    if (username) {
        const roles = await getUserRole(username); // Fetch the roles array
        storeInLocalStorage('roles',roles);

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


// Store roles in localStorage
function storeInLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get roles from localStorage
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Function to fetch member data based on the username
async function fetchMemberData(username) {
    try {
        const response = await fetch(`${apiBaseUrl}/members/${username}`, {
            method: 'GET',
            credentials: 'include' // Ensure cookies are included
        });

        if (response.ok) {
            const memberData = await response.json();
            populateFormWithMemberData(memberData); // Display the data if successful
        } else {
            console.error('Failed to fetch member data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// Populate the form fields with the current member data
function populateFormWithMemberData(memberData) {
    document.getElementById('name').value = memberData.name || '';
    document.getElementById('email').value = memberData.email || '';
    document.getElementById('course').value = memberData.course || '';
    document.getElementById('description').value = memberData.description || '';
    document.getElementById('istId').value = memberData.ist_id || '';
}

// Function to handle form submission and update member data
async function handleFormSubmit(event) {
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
        const response = await fetch(`http://localhost:8080/api/members/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',  // Include cookies for authentication
            body: JSON.stringify(updatedMemberData)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('message').innerText = 'Profile updated successfully!';
            populateFormWithMemberData(result);  // Update form with the new data
        } else {
            document.getElementById('message').innerText = 'Failed to update profile.';
        }
    } catch (error) {
        console.error('Error updating member data:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
}

// Event listener for form submission
document.getElementById('editForm').addEventListener('submit', handleFormSubmit);

// Event listener to toggle between edit and view modes
document.getElementById('editButton').addEventListener('click', () => {
    const formElements = document.querySelectorAll('#editForm input, #editForm textarea');
    formElements.forEach(element => {
        element.disabled = !element.disabled;  // Toggle editable fields
    });

    // Toggle the text of the button
    const editButton = document.getElementById('editButton');
    if (editButton.innerText === 'Edit') {
        editButton.innerText = 'Cancel'; // Change button text to "Cancel" for cancelling edit
    } else {
        editButton.innerText = 'Edit'; // Revert back to "Edit" when cancelling
        populateFormWithMemberData(getCurrentMemberData()); // Reset to original data
    }
});

// Function to fetch and display member logo
async function displayMemberLogo(username) {
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
async function uploadMemberLogo(username, file) {
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
            displayMemberLogo(username);
        } else {
            console.error('Failed to upload logo:', response.statusText);
            document.getElementById('message').innerText = 'Failed to upload logo. Please try again.';
        }
    } catch (error) {
        console.error('Error uploading logo:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
}

// Handle the form submission for logo upload
document.getElementById('uploadLogoForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const fileInput = document.getElementById('logoUpload');
    const file = fileInput.files[0]; // Get the selected file

    const username = getFromLocalStorage('username'); // Get the username from localStorage
    if (username && file) {
        uploadMemberLogo(username, file); // Upload the new logo
    } else {
        document.getElementById('message').innerText = 'No file selected or no user logged in!';
    }
});


// Fetch member data on page load
document.addEventListener('DOMContentLoaded', () => {
    const username = getFromLocalStorage('username');

    if (username) {
        fetchMemberData(username);  // Fetch member data when user is logged in
        displayMemberLogo(username);
    } else {
        window.location.href = '/login'; // Redirect to login page if no username found
    }
});

// Display roles when on the main page
if (window.location.pathname === '/') {
    displayUserRole();
}

