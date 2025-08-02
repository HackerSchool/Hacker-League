# 🏆 Hacker League

Welcome to **Hacker League** – a task-gamification system designed to recognize and reward the best contributors of HackerSchool through a structured competitive framework.



---


## 📜 Project History

This project was originally named **"HS-WebApp"** and was developed by José Lopes ([@MIBismuth](https://github.com/MIBismuth) on GitHub). It served as the first stone in building the **Hacker League** ecosystem. The original project has been preserved in the legacy branch, while active development continues on the main branch.



---


## ✅ **Current Features**

### 🏠 **Landing Page (Leaderboard)**
- [x] **Interactive Leaderboard** with team and individual classifications
- [x] **Multiple Point Types**: Total, PJ (Journey Points), and PCC (Community Contribution Points)
- [x] **Dynamic Controls**: Dropdown menus for classification type and point filtering
- [x] **Medal System**: 🥇🥈🥉 for top 5 positions with animations
- [x] **Statistics Dashboard**: Total participants, active teams, and total points

### 👤 **User Profile System**
- [ ] **Personal Profile Management**: Edit user information, upload logos
- [ ] **Admin Panel**: User creation, modification, and deletion capabilities
- [ ] **Role-based Access**: Different permissions for admins and regular users
- [ ] **Member Directory**: View all HackerSchool members and their details

### 🔐 **Authentication System**
- [x] **Secure Login/Logout**: Cookie and local storage support
- [x] **Test Credentials**: Available for development testing
- [x] **Session Management**: Persistent login state
- [ ] **Role Management**: Admin and user roles with appropriate permissions

### 📱 **Navigation & UX**
- [ ] **Hamburger Menu**: Mobile-responsive navigation
- [x] **Cross-platform**: Works on desktop, tablet, and mobile devices



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
   git clone https://github.com/HackerSchool/Hacker-League.git
   cd Hacker-League
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


## 🤝 **Contributing**

### **Team Structure**

- **Decider**: Gonçalo Fecha
- **Developers**: André Caseiro, André Santos, Armando Gonçalves, Gonçalo Azevedo
- **Technical Expert**: José Lopes, Filipe Piçarra
- **Game Design**: João Rodrigues, Filipe Vaz

### **Development Guidelines**

Pls Pls Pls remember to update README and rest of documentation, if existing.


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
- **Triple Agent**: Social deduction mechanics



---

## 📄 **License**

This project is licensed under the MIT License. Feel free to fork, modify, and share your improvements!
 

