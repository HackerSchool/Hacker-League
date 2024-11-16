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
    const members = await getAllUsers();
    console.log(members);
    var members_div = document.getElementById('members');
    members_div.innerHTML += "<h2> Here's all the members brother </h2>";
    members.forEach(member => {
        members_div.innerHTML += `<p> ${member.name} </p>`;
    });
    console.log("test");
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



// Page-specific handling
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (pathname === '/') {
        handleMainPage();
        handleProfilePage();
        handleUserProfile();
    } else if (pathname === '/login') {
        handleLoginPage();
    } else if (pathname === '/logout') {
        handleLogoutPage();
    } else if (pathname === '/register') {
        handleRegister();
    }
});

