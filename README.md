# 🌟 User Management Web Application

Welcome to **User Management Web Application** – a simple and scalable solution for managing users, profiles, and projects. This project features a modular and modern design to meet the demands of dynamic applications.

---

## ✅ **Current Features**
| Feature            | Description                                                                      |
|--------------------|----------------------------------------------------------------------------------|
| **Login/Logout**   | Secure authentication flow with cookies and local storage support.              |
| **User Profile**   | Edit, update, and display user profile information, including image uploads.     |

---

## 🛠️ **To-Do**
| Feature             | Description                                                                      |
|---------------------|----------------------------------------------------------------------------------|
| **User Search**     | Add a search bar to find users easily.                                           |
| **User Management** | Enable user creation, modification, and deletion by admins.                     |
| **Project Management** | Add the ability to create, assign, and track projects for users.              |

---

## 🏗️ **Setup Instructions**

### Clone and Serve
1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/yourusername/user-management-app.git
   cd user-management-app
   ```
2. **Start the Backend**:  
   Make sure your backend server is running at `http://localhost:5000`.  

3. **Serve via Your Favorite Server**:  
   Below is an example Nginx configuration to serve the app and proxy API requests to the backend:  

   ```nginx
   server {
       listen       8080;
       server_name  localhost;

       location / {
           root   /home/user/path-to-repo;
           index  index.html index.htm;
           try_files $uri $uri/ /html/$uri.html =404;
       }

       location /api/ {
           proxy_pass http://127.0.0.1:5000/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       error_page   500 502 503 504  /50x.html;
       location = /50x.html {
           root   /usr/share/nginx/html;
       }
   }
   ```

4. Open `http://localhost:8080` in your browser, and you're good to go! 🎉

---

## 🎯 Vision

This app aims to provide an intuitive interface for managing users and projects for HacherSchool.

---

## 📜 License

This project is licensed under the MIT License. Feel free to fork, modify, and share your improvements!  

--- 

