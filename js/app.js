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
    getAllUsers
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
        window.location.href = '/api/fenix-auth'; // Redirect to the OAuth endpoint
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
    }
});

