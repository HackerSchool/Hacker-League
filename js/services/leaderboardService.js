// Leaderboard Service - Simulated API for now
// This can be easily replaced with real API calls to your backend

const leaderboardData = {
    teams: [
        { name: "Cyber Warriors", totalPoints: 2850, pjPoints: 1200, pccPoints: 1650, members: 4 },
        { name: "Code Breakers", totalPoints: 2720, pjPoints: 1100, pccPoints: 1620, members: 3 },
        { name: "Digital Ninjas", totalPoints: 2580, pjPoints: 1050, pccPoints: 1530, members: 5 },
        { name: "Hack Masters", totalPoints: 2450, pjPoints: 980, pccPoints: 1470, members: 4 },
        { name: "Security Squad", totalPoints: 2320, pjPoints: 920, pccPoints: 1400, members: 3 },
        { name: "Byte Force", totalPoints: 2180, pjPoints: 880, pccPoints: 1300, members: 4 },
        { name: "Crypto Kings", totalPoints: 2050, pjPoints: 820, pccPoints: 1230, members: 3 },
        { name: "Network Knights", totalPoints: 1920, pjPoints: 780, pccPoints: 1140, members: 4 }
    ],
    individuals: [
        { name: "Alex Chen", team: "Cyber Warriors", totalPoints: 850, pjPoints: 350, pccPoints: 500 },
        { name: "Maria Santos", team: "Code Breakers", totalPoints: 820, pjPoints: 330, pccPoints: 490 },
        { name: "David Kim", team: "Digital Ninjas", totalPoints: 780, pjPoints: 310, pccPoints: 470 },
        { name: "Sarah Johnson", team: "Hack Masters", totalPoints: 750, pjPoints: 300, pccPoints: 450 },
        { name: "Carlos Rodriguez", team: "Security Squad", totalPoints: 720, pjPoints: 290, pccPoints: 430 },
        { name: "Emma Wilson", team: "Byte Force", totalPoints: 690, pjPoints: 280, pccPoints: 410 },
        { name: "James Lee", team: "Crypto Kings", totalPoints: 660, pjPoints: 270, pccPoints: 390 },
        { name: "Ana Silva", team: "Network Knights", totalPoints: 630, pjPoints: 260, pccPoints: 370 },
        { name: "Michael Brown", team: "Cyber Warriors", totalPoints: 600, pjPoints: 250, pccPoints: 350 },
        { name: "Lisa Garcia", team: "Code Breakers", totalPoints: 570, pjPoints: 240, pccPoints: 330 }
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