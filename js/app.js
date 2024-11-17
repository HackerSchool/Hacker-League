// Import necessary modules
import { checkLogin, login, logout } from "/js/modules/auth.js";
import { getFromLocalStorage, storeInLocalStorage } from "/js/modules/utils.js";
import {
    displayUserRole,
    fetchUserData,
    uploadUserLogo,
    displayUserLogo,
    uploadUserFormData,
    populateFormWithUserData,
    populateAdminFormWithUserData,
    getAllUsers,
    registerUser
} from "/js/modules/user.js";

// Main page handler (/)
async function handleMainPage() {
    await handleLoginRedirect();
    displayUserRole();
    showMembers();
}

async function showMembers() {
    const members = await getAllUsers(); // Fetch members
    console.log(members);

    // Get the members container
    const membersDiv = document.getElementById('members');
    console.log(membersDiv)
    membersDiv.innerHTML = "<h2>Here's all the members, brother:</h2>";

    // Create the table
    const table = document.createElement('table');
    table.classList.add('members-table');

    // Add the table header
    const headerRow = `
        <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Course</th>
            <th>IST ID</th>
            <th>Description</th>
        </tr>`;
    table.innerHTML = headerRow;

    // Populate the table rows
    members.forEach(member => {
        const row = `
            <tr>
                <td>${member.name || 'N/A'}</td>
                <td>${member.username || 'N/A'}</td>
                <td>${member.email}</td>
                <td>${member.course}</td>
                <td>${member.ist_id || 'N/A'}</td>
                <td>${member.description || 'No description available'}</td>
            </tr>`;
        table.innerHTML += row;
    });

    // Append the table to the container
    membersDiv.appendChild(table);
}


// Login page handler (/login)
function handleLoginPage() {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });
    document.getElementById('fenixOauthButton').addEventListener('click', () => {
        window.location.href = 'http://localhost:5000/fenix-auth'; // Redirect to the OAuth endpoint
    });
}

// Logout page handler (/logout)
async function handleLogoutPage() {
    await handleLoginRedirect();
    logout();
}

// Check if the user is logged in and redirect if not
async function handleLoginRedirect() {
    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) {
        window.location.href = '/login';
    }
}

// Event listeners for other pages (e.g. user profile edit)
function handleUserProfile() {
    // Handle form submission for user profile updates
    document.getElementById('editForm').addEventListener('submit', uploadUserFormData);

    // Toggle edit and view modes for user profile form
    document.getElementById('editButton').addEventListener('click', async () => {
        const formElements = document.querySelectorAll('#editForm input, #editForm textarea');
        formElements.forEach(element => {
            element.disabled = !element.disabled;
        });

        const editButton = document.getElementById('editButton');
        if (editButton.innerText === 'Edit') {
            editButton.innerText = 'Cancel';
        } else {
            editButton.innerText = 'Edit';
            const username = getFromLocalStorage('username');
            populateFormWithUserData(await fetchUserData(username));
        }
    });

    // Handle the form submission for logo upload
    document.getElementById('uploadLogoForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const fileInput = document.getElementById('logoUpload');
        const file = fileInput.files[0];
        const username = getFromLocalStorage('username');
        if (username && file) {
            uploadUserLogo(username, file);
        } else {
            document.getElementById('message').innerText = 'No file selected or no user logged in!';
        }
    });
}

// Fetch member data on page load for profile page
async function handleProfilePage() {
    const username = getFromLocalStorage('username');
    if (username) {
        try {
            const userData = await fetchUserData(username);
            populateFormWithUserData(userData);
            displayUserLogo(username);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    } else {
        window.location.href = '/login';
    }
}

async function handleRegister() {
    // Get the current URL's query string
    const queryString = window.location.search;

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Access individual parameters
    const istId = urlParams.get("ist_id"); // "ist1100336"
    const name = urlParams.get("name"); // "José Duarte Ferrão de Oliveira Lopes"
    const email = urlParams.get("email"); // "joseduartelopes@tecnico.ulisboa.pt"

    // Log parameters for debugging
    console.log("IST ID:", istId);
    console.log("Name:", name);
    console.log("Email:", email);

    // Get all form elements
    const formElements = document.querySelectorAll('#registerForm input, #registerForm textarea');

    // Map of form field IDs to parameter values
    const fieldValues = {
        name: name,
        email: email,
        istId: istId
    };

    // Populate form fields and disable the IST ID field
    formElements.forEach(element => {
        if (fieldValues[element.id] !== undefined) {
            element.value = fieldValues[element.id]; // Set the value
            if (element.id === "istId") {
                element.disabled = true; // Disable the IST ID field
            }
        }
    });

    console.log("Form populated successfully");
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Extract values from the form
        const formElements = event.target.elements; // Access form inputs via the event
        const userData = {
            ist_id: formElements['istId'].value,
            member_number: Number(formElements['memberId'].value), // Assuming it's the same as ist_id
            name: formElements['name'].value,
            username: formElements['username'].value.split(' ')[0], // First part of the name as username (example logic)
            password: formElements['password'] ? formElements['password'].value : 'default_password', // Handle optional password field
            join_date: formElements['joinDate'] ? formElements['joinDate'].value : new Date().toISOString().split('T')[0], // Optional join_date
            course: formElements['course'].value,
            email: formElements['email'].value,
        };


        console.log("Submitting JSON user data:", userData);

        // Call the registerUser function with the JSON data
        try {
            await registerUser(userData); // Send JSON data
            console.log("User registered successfully");
        } catch (error) {
            console.error("Error registering user:", error);
        }
    });
}



async function handleAdminPanel() {
    // Search for a user when the "Search" button is clicked
    document.getElementById('searchButton').addEventListener('click', async () => {
        const username = document.getElementById('searchUsername').value;
        if (username) {
            try {
                // Fetch the user data using your apiRequest helper
                const userData = await fetchUserData(username);
                if (userData) {
                    // Populate the admin form with the user data (using userForm)
                    populateAdminFormWithUserData(userData);
                    document.getElementById('submitButton').innerText = 'Update User'; // Change submit button text
                    document.getElementById('userForm').style.display = 'block'; // Show form
                } else {
                    // If user doesn't exist, show empty form to create a new user
                    // clearForm('userForm');
                    document.getElementById('submitButton').innerText = 'Create User'; // Change submit button text
                    document.getElementById('userForm').style.display = 'block'; // Show form
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('User not found or error fetching data.');
            }
        }
    });

    // Handle form submission (for creating or updating the user)
    document.getElementById('userForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Gather form data
        const formElements = event.target.elements;
        const userData = {
            ist_id: formElements['istId'].value,
            name: formElements['name'].value,
            email: formElements['email'].value,
            course: formElements['course'].value,
            description: formElements['description'].value,
        };

        try {
            if (userData.ist_id) {
                // Update existing user
                await apiRequest(`/api/user/${userData.ist_id}`, 'PUT', userData);
                alert('User updated successfully!');
            } else {
                // Create new user (IST ID is empty in this case)
                await apiRequest(`/api/user`, 'POST', userData);
                alert('New user created successfully!');
            }
        } catch (error) {
            console.error('Error handling user data:', error);
            alert('There was an error processing the request.');
        }
    });
}
// Page-specific handling
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (pathname === '/') {
        handleMainPage();
        handleProfilePage();
        handleUserProfile();
        handleAdminPanel(); 
    } else if (pathname === '/login') {
        handleLoginPage();
    } else if (pathname === '/logout') {
        handleLogoutPage();
    } else if (pathname === '/register') {
        handleRegister();
    }
});

