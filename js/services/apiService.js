// /js/services/apiService.js
const apiBaseUrl = 'http://localhost:8080/api';

export async function apiRequest(endpoint, method = 'GET', body = null, includeCredentials = true) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: includeCredentials ? 'include' : 'omit',
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API request failed: ${error.message}`);
        throw error;
    }
}

export default apiRequest;

