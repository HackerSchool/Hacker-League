import { apiRequest } from '/js/services/apiService.js';
import { getFromLocalStorage, storeInLocalStorage } from "/js/modules/utils.js";

const apiBaseUrl = 'http://localhost:5000';

export function populateAdminFormWithUserData(memberData) {
    document.getElementById('admin-name').value = memberData.name || '';
    document.getElementById('admin-email').value = memberData.email || '';
    document.getElementById('admin-course').value = memberData.course || '';
    document.getElementById('admin-description').value = memberData.description || '';
    document.getElementById('admin-istId').value = memberData.ist_id || '';
}
