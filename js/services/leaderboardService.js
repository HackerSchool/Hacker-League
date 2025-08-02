// Leaderboard Service - Simulated API for now
// This can be easily replaced with real API calls to your backend

const leaderboardData = {
    teams: [
        { name: "Cyber Warriors", totalPoints: 3850, pjPoints: 1200, pccPoints: 2650, members: 4 },
        { name: "Code Breakers", totalPoints: 3720, pjPoints: 1100, pccPoints: 2620, members: 3 },
        { name: "Digital Ninjas", totalPoints: 3580, pjPoints: 1050, pccPoints: 2530, members: 5 },
        { name: "Hack Masters", totalPoints: 3450, pjPoints: 980, pccPoints: 2470, members: 4 },
        { name: "Security Squad", totalPoints: 3320, pjPoints: 920, pccPoints: 2400, members: 3 },
        { name: "Byte Force", totalPoints: 3180, pjPoints: 880, pccPoints: 2700, members: 4 },
        { name: "Crypto Kings", totalPoints: 3050, pjPoints: 820, pccPoints: 2230, members: 3 },
        { name: "Network Knights", totalPoints: 2920, pjPoints: 780, pccPoints: 2140, members: 4 }
    ],
    individuals: [
        { name: "Alex Chen", team: "Cyber Warriors", totalPoints: 1150, pjPoints: 350, pccPoints: 800 },
        { name: "Maria Santos", team: "Code Breakers", totalPoints: 1120, pjPoints: 330, pccPoints: 790 },
        { name: "David Kim", team: "Digital Ninjas", totalPoints: 1080, pjPoints: 310, pccPoints: 770 },
        { name: "Sarah Johnson", team: "Hack Masters", totalPoints: 1050, pjPoints: 300, pccPoints: 750 },
        { name: "Carlos Rodriguez", team: "Security Squad", totalPoints: 1020, pjPoints: 290, pccPoints: 730 },
        { name: "Emma Wilson", team: "Byte Force", totalPoints: 990, pjPoints: 280, pccPoints: 710 },
        { name: "James Lee", team: "Crypto Kings", totalPoints: 960, pjPoints: 270, pccPoints: 690 },
        { name: "Ana Silva", team: "Network Knights", totalPoints: 930, pjPoints: 260, pccPoints: 670 },
        { name: "Michael Brown", team: "Cyber Warriors", totalPoints: 900, pjPoints: 250, pccPoints: 650 },
        { name: "Lisa Garcia", team: "Code Breakers", totalPoints: 870, pjPoints: 240, pccPoints: 630 }
    ]
};

// Simulated history data with more entries for pagination testing
const historyData = {
    "Cyber Warriors": [
        { membro: "Alex Chen", equipa: "Cyber Warriors", descrição: "HackerPitch - AI Integration", data: "2024-01-15", tipo: "PJ", pontos: 25 },
        { membro: "Michael Brown", equipa: "Cyber Warriors", descrição: "Task Completion - API Development", data: "2024-01-14", tipo: "PCC", pontos: 10 },
        { membro: "Alex Chen", equipa: "Cyber Warriors", descrição: "HackerChallenge - Security CTF", data: "2024-01-10", tipo: "PJ", pontos: 18 },
        { membro: "Alex Chen", equipa: "Cyber Warriors", descrição: "HackerPitch - Blockchain Demo", data: "2024-01-08", tipo: "PJ", pontos: 22 },
        { membro: "Michael Brown", equipa: "Cyber Warriors", descrição: "Workshop Organization", data: "2024-01-06", tipo: "PCC", pontos: 15 },
        { membro: "Alex Chen", equipa: "Cyber Warriors", descrição: "HackerChallenge - Code Golf", data: "2024-01-04", tipo: "PJ", pontos: 16 },
        { membro: "Michael Brown", equipa: "Cyber Warriors", descrição: "Lab Maintenance", data: "2024-01-02", tipo: "PCC", pontos: 8 },
        { membro: "Alex Chen", equipa: "Cyber Warriors", descrição: "HackerPitch - ML Model", data: "2023-12-30", tipo: "PJ", pontos: 20 },
        { membro: "Michael Brown", equipa: "Cyber Warriors", descrição: "Documentation Update", data: "2023-12-28", tipo: "PCC", pontos: 5 },
        { membro: "Alex Chen", equipa: "Cyber Warriors", descrição: "HackerChallenge - Algorithm Race", data: "2023-12-26", tipo: "PJ", pontos: 14 },
        { membro: "Michael Brown", equipa: "Cyber Warriors", descrição: "Security Workshop", data: "2023-12-24", tipo: "PCC", pontos: 12 },
        { membro: "Alex Chen", equipa: "Cyber Warriors", descrição: "HackerPitch - Web3 Project", data: "2023-12-22", tipo: "PJ", pontos: 18 }
    ],
    "Code Breakers": [
        { membro: "Maria Santos", equipa: "Code Breakers", descrição: "HackerPitch - Blockchain Demo", data: "2024-01-15", tipo: "PJ", pontos: 18 },
        { membro: "Lisa Garcia", equipa: "Code Breakers", descrição: "Workshop Organization", data: "2024-01-12", tipo: "PCC", pontos: 15 },
        { membro: "Maria Santos", equipa: "Code Breakers", descrição: "HackerChallenge - Code Golf", data: "2024-01-10", tipo: "PJ", pontos: 15 },
        { membro: "Lisa Garcia", equipa: "Code Breakers", descrição: "Lab Maintenance", data: "2024-01-08", tipo: "PCC", pontos: 8 },
        { membro: "Maria Santos", equipa: "Code Breakers", descrição: "HackerPitch - ML Model", data: "2024-01-06", tipo: "PJ", pontos: 20 },
        { membro: "Lisa Garcia", equipa: "Code Breakers", descrição: "Documentation Update", data: "2024-01-04", tipo: "PCC", pontos: 5 },
        { membro: "Maria Santos", equipa: "Code Breakers", descrição: "HackerChallenge - Algorithm Race", data: "2024-01-02", tipo: "PJ", pontos: 14 },
        { membro: "Lisa Garcia", equipa: "Code Breakers", descrição: "Security Workshop", data: "2023-12-30", tipo: "PCC", pontos: 12 },
        { membro: "Maria Santos", equipa: "Code Breakers", descrição: "HackerPitch - Web3 Project", data: "2023-12-28", tipo: "PJ", pontos: 18 },
        { membro: "Lisa Garcia", equipa: "Code Breakers", descrição: "Code Review Session", data: "2023-12-26", tipo: "PCC", pontos: 6 },
        { membro: "Maria Santos", equipa: "Code Breakers", descrição: "HackerChallenge - Mobile Dev", data: "2023-12-24", tipo: "PJ", pontos: 6 },
        { membro: "Lisa Garcia", equipa: "Code Breakers", descrição: "Mentoring Session", data: "2023-12-22", tipo: "PCC", pontos: 4 }
    ],
    "Digital Ninjas": [
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "HackerPitch - ML Model", data: "2024-01-15", tipo: "PJ", pontos: 15 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "Lab Maintenance", data: "2024-01-13", tipo: "PCC", pontos: 8 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "HackerChallenge - Algorithm Race", data: "2024-01-10", tipo: "PJ", pontos: 12 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "HackerPitch - AI Integration", data: "2024-01-08", tipo: "PJ", pontos: 25 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "Task Completion - API Development", data: "2024-01-06", tipo: "PCC", pontos: 10 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "HackerChallenge - Security CTF", data: "2024-01-04", tipo: "PJ", pontos: 18 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "Workshop Organization", data: "2024-01-02", tipo: "PCC", pontos: 15 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "HackerPitch - Blockchain Demo", data: "2023-12-30", tipo: "PJ", pontos: 18 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "Code Review Session", data: "2023-12-28", tipo: "PCC", pontos: 6 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "HackerChallenge - Code Golf", data: "2023-12-26", tipo: "PJ", pontos: 15 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "Mentoring Session", data: "2023-12-24", tipo: "PCC", pontos: 4 },
        { membro: "David Kim", equipa: "Digital Ninjas", descrição: "HackerChallenge - Crypto CTF", data: "2023-12-22", tipo: "PJ", pontos: 4 }
    ],
    "Hack Masters": [
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "HackerPitch - Web3 Project", data: "2024-01-15", tipo: "PJ", pontos: 12 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "Documentation Update", data: "2024-01-11", tipo: "PCC", pontos: 5 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "HackerChallenge - UI Design", data: "2024-01-10", tipo: "PJ", pontos: 10 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "HackerPitch - Mobile App", data: "2024-01-08", tipo: "PJ", pontos: 8 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "Code Review Session", data: "2024-01-06", tipo: "PCC", pontos: 6 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "HackerChallenge - Mobile Dev", data: "2024-01-04", tipo: "PJ", pontos: 6 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "Mentoring Session", data: "2024-01-02", tipo: "PCC", pontos: 4 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "HackerPitch - Cryptography", data: "2023-12-30", tipo: "PJ", pontos: 6 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "Infrastructure Setup", data: "2023-12-28", tipo: "PCC", pontos: 3 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "HackerChallenge - Crypto CTF", data: "2023-12-26", tipo: "PJ", pontos: 4 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "Network Analysis", data: "2023-12-24", tipo: "PCC", pontos: 2 },
        { membro: "Sarah Johnson", equipa: "Hack Masters", descrição: "HackerChallenge - Network Analysis", data: "2023-12-22", tipo: "PJ", pontos: 2 }
    ],
    "Security Squad": [
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "HackerPitch - Penetration Testing", data: "2024-01-15", tipo: "PJ", pontos: 10 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "Security Workshop", data: "2024-01-09", tipo: "PCC", pontos: 12 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "HackerChallenge - Crypto Puzzle", data: "2024-01-10", tipo: "PJ", pontos: 8 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "HackerPitch - Network Security", data: "2024-01-08", tipo: "PJ", pontos: 4 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "Infrastructure Setup", data: "2024-01-06", tipo: "PCC", pontos: 3 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "HackerChallenge - Network Analysis", data: "2024-01-04", tipo: "PJ", pontos: 2 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "Lab Maintenance", data: "2024-01-02", tipo: "PCC", pontos: 8 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "HackerPitch - AI Integration", data: "2023-12-30", tipo: "PJ", pontos: 25 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "Task Completion - API Development", data: "2023-12-28", tipo: "PCC", pontos: 10 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "HackerChallenge - Security CTF", data: "2023-12-26", tipo: "PJ", pontos: 18 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "Workshop Organization", data: "2023-12-24", tipo: "PCC", pontos: 15 },
        { membro: "Carlos Rodriguez", equipa: "Security Squad", descrição: "HackerPitch - Blockchain Demo", data: "2023-12-22", tipo: "PJ", pontos: 18 }
    ],
    "Byte Force": [
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "HackerPitch - Mobile App", data: "2024-01-15", tipo: "PJ", pontos: 8 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "Code Review Session", data: "2024-01-12", tipo: "PCC", pontos: 6 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "HackerChallenge - Mobile Dev", data: "2024-01-10", tipo: "PJ", pontos: 6 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "Mentoring Session", data: "2024-01-08", tipo: "PCC", pontos: 4 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "HackerPitch - Cryptography", data: "2024-01-06", tipo: "PJ", pontos: 6 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "Infrastructure Setup", data: "2024-01-04", tipo: "PCC", pontos: 3 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "HackerChallenge - Crypto CTF", data: "2024-01-02", tipo: "PJ", pontos: 4 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "Network Analysis", data: "2023-12-30", tipo: "PCC", pontos: 2 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "HackerChallenge - Network Analysis", data: "2023-12-28", tipo: "PJ", pontos: 2 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "Lab Maintenance", data: "2023-12-26", tipo: "PCC", pontos: 8 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "HackerPitch - ML Model", data: "2023-12-24", tipo: "PJ", pontos: 15 },
        { membro: "Emma Wilson", equipa: "Byte Force", descrição: "Documentation Update", data: "2023-12-22", tipo: "PCC", pontos: 5 }
    ],
    "Crypto Kings": [
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "HackerPitch - Cryptography", data: "2024-01-15", tipo: "PJ", pontos: 6 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "Mentoring Session", data: "2024-01-11", tipo: "PCC", pontos: 4 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "HackerChallenge - Crypto CTF", data: "2024-01-10", tipo: "PJ", pontos: 4 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "Network Analysis", data: "2024-01-08", tipo: "PCC", pontos: 2 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "HackerChallenge - Network Analysis", data: "2024-01-06", tipo: "PJ", pontos: 2 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "Lab Maintenance", data: "2024-01-04", tipo: "PCC", pontos: 8 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "HackerPitch - ML Model", data: "2024-01-02", tipo: "PJ", pontos: 15 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "Documentation Update", data: "2023-12-30", tipo: "PCC", pontos: 5 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "HackerChallenge - Algorithm Race", data: "2023-12-28", tipo: "PJ", pontos: 12 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "Security Workshop", data: "2023-12-26", tipo: "PCC", pontos: 12 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "HackerPitch - Web3 Project", data: "2023-12-24", tipo: "PJ", pontos: 18 },
        { membro: "James Lee", equipa: "Crypto Kings", descrição: "Code Review Session", data: "2023-12-22", tipo: "PCC", pontos: 6 }
    ],
    "Network Knights": [
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "HackerPitch - Network Security", data: "2024-01-15", tipo: "PJ", pontos: 4 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "Infrastructure Setup", data: "2024-01-09", tipo: "PCC", pontos: 3 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "HackerChallenge - Network Analysis", data: "2024-01-10", tipo: "PJ", pontos: 2 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "Lab Maintenance", data: "2024-01-08", tipo: "PCC", pontos: 8 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "HackerPitch - ML Model", data: "2024-01-06", tipo: "PJ", pontos: 15 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "Documentation Update", data: "2024-01-04", tipo: "PCC", pontos: 5 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "HackerChallenge - Algorithm Race", data: "2024-01-02", tipo: "PJ", pontos: 12 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "Security Workshop", data: "2023-12-30", tipo: "PCC", pontos: 12 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "HackerPitch - Web3 Project", data: "2023-12-28", tipo: "PJ", pontos: 18 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "Code Review Session", data: "2023-12-26", tipo: "PCC", pontos: 6 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "HackerChallenge - Mobile Dev", data: "2023-12-24", tipo: "PJ", pontos: 6 },
        { membro: "Ana Silva", equipa: "Network Knights", descrição: "Mentoring Session", data: "2023-12-22", tipo: "PCC", pontos: 4 }
    ]
};

// Simulated API functions
export async function getTeams() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return leaderboardData.teams;
}

export async function getIndividuals() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return leaderboardData.individuals;
}

export async function getLeaderboardStats() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const totalParticipants = leaderboardData.individuals.length;
    const activeTeams = leaderboardData.teams.length;
    const totalPoints = leaderboardData.teams.reduce((sum, team) => sum + team.totalPoints, 0);
    
    return {
        totalParticipants,
        activeTeams,
        totalPoints
    };
}

// New function for getting team history (limited to 3 most recent entries)
export async function getTeamHistory(teamName) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const teamHistory = historyData[teamName] || [];
    
    // Return only the 3 most recent entries, sorted by date
    return teamHistory
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .slice(0, 3);
}

// Function to get all history data for the history page
export async function getAllHistoryData() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let allHistory = [];
    for (const teamName in historyData) {
        allHistory = allHistory.concat(historyData[teamName]);
    }
    
    // Sort by date (most recent first)
    return allHistory.sort((a, b) => new Date(b.data) - new Date(a.data));
}

// Future API endpoints (to be implemented with real backend)
export async function getMembers() {
    // GET /api/members
    // This will replace the simulated data with real API calls
    return getIndividuals();
}

export async function createMember(memberData) {
    // POST /api/members
    console.log('Creating member:', memberData);
    // Implementation for real API
}

export async function updateMember(name, memberData) {
    // PUT /api/members/{name}
    console.log('Updating member:', name, memberData);
    // Implementation for real API
}

export async function deleteMember(name) {
    // DELETE /api/members/{name}
    console.log('Deleting member:', name);
    // Implementation for real API
}

export async function getProjects() {
    // GET /api/projects
    console.log('Getting projects');
    // Implementation for real API
}

export async function createProject(projectData) {
    // POST /api/projects
    console.log('Creating project:', projectData);
    // Implementation for real API
}

export async function updateProject(name, projectData) {
    // PUT /api/projects/{name}
    console.log('Updating project:', name, projectData);
    // Implementation for real API
}

export async function deleteProject(name) {
    // DELETE /api/projects/{name}
    console.log('Deleting project:', name);
    // Implementation for real API
}

// Future history API endpoints
export async function getHistory(teamName, limit = 3) {
    // GET /api/history/{teamName}?limit={limit}
    // This will replace the simulated history data with real API calls
    return getTeamHistory(teamName);
}

export async function getFullHistory(teamName, page = 1, limit = 20) {
    // GET /api/history/{teamName}/full?page={page}&limit={limit}
    // For the "see more..." functionality
    console.log('Getting full history for:', teamName, 'page:', page, 'limit:', limit);
    // Implementation for real API
}

export async function addHistoryEntry(entryData) {
    // POST /api/history
    // For adding new history entries
    console.log('Adding history entry:', entryData);
    // Implementation for real API
} 