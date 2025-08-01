# 🏆 Hacker League

Welcome to **Hacker League** – an innovative gamification system designed to recognize and reward the best contributors of HackerSchool through a structured competitive framework. This project transforms the existing HackNights into a formal gaming experience that celebrates multiple forms of merit and contribution.

---

## 📜 Project History

This project was originally named **"HS-WebApp"** and was developed by José Lopes ([@MIBismuth](https://github.com/MIBismuth) on GitHub). It served as the first stone in building the **Hacker League** ecosystem. The original project has been preserved in the legacy branch, while active development continues on the main branch.

---

## 🎯 Vision & Concept

### Core Philosophy
The system focuses on **recognizing members who already contribute actively** to HackerSchool rather than just increasing participation. Each point awarded must have clear justification and be intrinsically linked to HackerSchool values.

---

## ✅ **Current Features**

### 🏠 **Landing Page (Leaderboard)**
- **Interactive Leaderboard** with team and individual classifications
- **Multiple Point Types**: Total, PJ (Journey Points), and PCC (Community Contribution Points)
- **Dynamic Controls**: Dropdown menus for classification type and point filtering
- **Medal System**: 🥇🥈🥉 for top 3 positions with animations
- **Statistics Dashboard**: Total participants, active teams, and total points
- **Responsive Design**: Beautiful, modern UI with smooth animations

### 👤 **User Profile System**
- **Personal Profile Management**: Edit user information, upload logos
- **Admin Panel**: User creation, modification, and deletion capabilities
- **Role-based Access**: Different permissions for admins and regular users
- **Member Directory**: View all HackerSchool members and their details

### 🔐 **Authentication System**
- **Secure Login/Logout**: Cookie and local storage support
- **Test Credentials**: Available for development testing
- **Session Management**: Persistent login state
- **Role Management**: Admin and user roles with appropriate permissions

### 📱 **Navigation & UX**
- **Hamburger Menu**: Mobile-responsive navigation
- **Modern UI**: Gradient backgrounds, smooth animations, hover effects
- **Cross-platform**: Works on desktop, tablet, and mobile devices
- **Intuitive Design**: Easy-to-use interface with clear visual hierarchy

---

## 🎮 **Game Mechanics (Planned)**

### **Dual Point System**
- **PJ (Pontos de Jornada)**: Competitive performance points from HackNight activities
- **PCC (Pontos de Contribuição Comunitária)**: Merit-based points for community actions
- **PS (Pontos Sombra)**: Secret sabotage mechanics for xad0w.b1ts

### **HackNight Structure**
1. **HackerPitch (Phase 1)**: 1m30s presentations with surprise topics
2. **HackerChallenge (Phase 2)**: 1-hour practical challenges

### **Voting System**
- **Eurovision-style Voting**: Democratic scoring system
- **Formula 1 Point Distribution**: Non-linear scoring rewarding excellence
- **Structured Rubrics**: 1-5 scale evaluation for subjective challenges

### **Special Mechanics**
- **Multipliers & Combos**: Rewards consistency and continuous participation
- **Community Goals**: Collaborative objectives for collective rewards
- **Seasons**: Thematic periods to maintain engagement
- **xad0w.b1ts**: Secret sabotage missions with specific objectives

---

## 🛠️ **Technical Architecture**

### **Frontend**
- **Vanilla JavaScript**: Modular architecture with ES6 modules
- **CSS3**: Modern styling with CSS variables and responsive design
- **HTML5**: Semantic markup with accessibility considerations

### **Backend Integration**
- **API Service Layer**: Modular service architecture for easy backend integration
- **Simulated Data**: Comprehensive test data for development and testing
- **RESTful Design**: Prepared for real API endpoints

### **Planned API Endpoints**
```
GET /api/members/          # Get all members
POST /api/members/         # Create new member
PUT /api/members/<nome>    # Update member
DELETE /api/members/<nome> # Delete member

GET /api/projects/         # Get all projects
POST /api/projects/        # Create new project
PUT /api/projects/<nome>   # Update project
DELETE /api/projects/<nome> # Delete project
```

---

## 🚀 **Setup Instructions**

### **Prerequisites**
- Go 1.21+ (for the server)
- Modern web browser
- Backend server running on `http://localhost:5000` (optional)

### **Quick Start**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/hacker-league.git
   cd hacker-league
   ```

2. **Start the Development Server**:
   ```bash
   go run server.go
   ```

3. **Access the Application**:
   - **Main App**: `http://localhost:3000`
   - **Leaderboard**: `http://localhost:3000/leaderboard`
   - **Login**: `http://localhost:3000/login`

### **Test Credentials**
For development testing, use these credentials:
- **Username**: `admin` | **Password**: `admin123` | **Role**: admin
- **Username**: `user` | **Password**: `user123` | **Role**: user
- **Username**: `test` | **Password**: `test123` | **Role**: user

### **Live Reload (Optional)**
Install [air](https://github.com/air-verse/air) for automatic reloading:
```bash
air
```

---


## 🎯 **Future Roadmap**

### **Phase 1: Core Implementation**
- [ ] **Vikunja Integration**: Automated task tracking and point attribution
- [ ] **Voting System**: Eurovision-style democratic scoring
- [ ] **Season System**: Thematic periods with multipliers
- [ ] **HackerMaster Interface**: Admin tools for point management

### **Phase 2: Advanced Features**
- [ ] **Discord Bot Integration**: Real-time leaderboard updates
- [ ] **Statistics Dashboard**: Personal progress tracking
- [ ] **Community Features**: Project updates and social interaction
- [ ] **xad0w.b1ts Mechanics**: Secret sabotage missions

### **Phase 3: Enhancement**
- [ ] **Mobile App**: Native mobile experience
- [ ] **Advanced Analytics**: Detailed participation insights
- [ ] **Hall of Fame**: Permanent achievement system
- [ ] **API Documentation**: Complete backend integration

---

## 🤝 **Contributing**

### **Team Structure**
- **Facilitator**: Armando Gonçalves
- **Decider**: Gonçalo Fecha
- **Developers**: André Caseiro, André Santos, Armando Gonçalves
- **Technical Expert**: José Lopes
- **Game Design**: João Rodrigues, Filipe Vaz

### **Development Guidelines**
1. **Follow Sprint Methodology**: Use design sprint principles for major features
2. **Maintain Code Quality**: Modular architecture with clear separation of concerns
3. **Test Thoroughly**: Ensure all features work across different devices
4. **Document Changes**: Update README and technical documentation

---

## 📚 **Bibliography & References**

### **Academic Foundation**
- Salen, K., & Zimmerman, E. (2004). *Rules of Play: Game Design Fundamentals*. MIT Press
- Knapp, J. (2016). *Sprint*. Bantam Press

### **Game Design Inspiration**
- **Eurovision Song Contest**: Hybrid scoring system
- **Formula 1**: Non-linear point distribution
- **NBA MVP Voting**: Merit-based recognition
- **Fortnite**: Seasonal content and engagement
- **The Resistance**: Social deduction mechanics

---

## 📄 **License**

This project is licensed under the MIT License. Feel free to fork, modify, and share your improvements!

---

## 🏆 **Vision Statement**

Hacker League aims to provide an intuitive interface for managing users and projects for HackerSchool, transforming the existing HackNights into a formal gaming experience that celebrates multiple forms of merit and contribution. The system creates an ecosystem where diverse forms of contribution are valued and quantified, fostering a more inclusive community that recognizes different facets of what it means to be a valuable "hacker" in the HackerSchool community. 

