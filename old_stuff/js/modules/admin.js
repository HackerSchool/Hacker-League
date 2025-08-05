import { apiRequest } from '/js/services/apiService.js';
import { getFromLocalStorage, storeInLocalStorage } from "/js/modules/utils.js";

const apiBaseUrl = 'http://localhost:5000';


export function populateAdminFormWithUserData(memberData) {
    document.getElementById('admin-name').value = memberData.name || '';
    document.getElementById('admin-email').value = memberData.email || '';
    document.getElementById('admin-course').value = memberData.course || '';
    document.getElementById('admin-description').value = memberData.description || '';
    document.getElementById('admin-istId').value = memberData.ist_id || '';
    document.getElementById('admin-exitDate').value = memberData.exit_date || '';
    document.getElementById('admin-extra').value = memberData.extra || '';
    document.getElementById('admin-joinDate').value = memberData.join_date || '';
    document.getElementById('admin-memberNumber').value = memberData.member_number || '';
    document.getElementById('admin-roles').value = (Array.isArray(memberData.roles) ? memberData.roles.join(', ') : memberData.roles) || '';
    document.getElementById('admin-username').value = memberData.username || '';
}

