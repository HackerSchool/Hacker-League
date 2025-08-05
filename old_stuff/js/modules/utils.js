// Store roles in localStorage
export function storeInLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get roles from localStorage
export function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

