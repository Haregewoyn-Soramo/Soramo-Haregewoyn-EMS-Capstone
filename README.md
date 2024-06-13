Employee Management System
Overview
The Employee Management System is a comprehensive web application designed to manage employee details, track login/logout times, assess key performance indicators (KPIs), send notifications, and collect feedback from managers. This system leverages the MERN stack for robust functionality and JWT for secure authentication. The user interface is crafted with Material-UI for a modern and responsive design.

Table of Contents
Technologies Used
Features
Installation
Usage
Folder Structure
API Endpoints
Authentication
Contributing
License
Technologies Used
MongoDB: Database for storing employee data, login/logout times, KPIs, notifications, and feedback.
Express.js: Backend framework for building the server and API endpoints.
React.js: Frontend library for building user interfaces.
Node.js: JavaScript runtime for the backend.
JWT (JSON Web Token): For secure authentication.
Material-UI: For responsive and modern UI components.
Features
Employee Management: Add, edit, and delete employee details.
Time Tracking: Record and manage employee login and logout times.
KPI Assessment: Define and track key performance indicators for employees.
Notifications: Send and receive notifications related to performance and tasks.
Feedback System: Collect and review feedback from managers.
Authentication: Secure login and registration using JWT.
Responsive Design: User interface designed with Material-UI for a seamless experience across devices.
Installation
Prerequisites
Node.js
MongoDB
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/employee-management-system.git
cd employee-management-system
Install dependencies for both client and server:

bash
Copy code
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
Set up environment variables:

Create a .env file in the server directory and add the following variables:
env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the application:

bash
Copy code
# Start the server
cd server
npm start

# Start the client
cd ../client
npm start
Open your browser and navigate to http://localhost:3000.

Usage
Login: Users can log in with their credentials to access the system.
Dashboard: View employee details, login/logout times, KPIs, notifications, and feedback.
Manage Employees: Add, edit, or remove employee details.
Track Time: Record login and logout times automatically or manually.
Evaluate Performance: View and assess employee KPIs.
Send Notifications: Send notifications to employees or groups.
Feedback: Submit and review manager feedback.
Folder Structure
plaintext
Copy code
employee-management-system/
├── client/                # React frontend
│   ├── public/            # Public assets
│   └── src/               # Source files
│       ├── components/    # Reusable components
│       ├── pages/         # Application pages
│       ├── App.js         # Main application component
│       └── index.js       # Entry point
├── server/                # Express backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Middleware functions
│   ├── utils/             # Utility functions
│   └── server.js          # Entry point
└── README.md              # Readme file
API Endpoints
Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Authenticate a user and return a JWT.
Employees
GET /api/employees: Get all employees.
POST /api/employees: Add a new employee.
GET /api/employees/
: Get a single employee by ID.
PUT /api/employees/
: Update an employee by ID.
DELETE /api/employees/
: Delete an employee by ID.
Time Tracking
GET /api/times: Get all login/logout records.
POST /api/times: Add a new login/logout record.
GET /api/times/
: Get a single login/logout record by ID.
PUT /api/times/
: Update a login/logout record by ID.
DELETE /api/times/
: Delete a login/logout record by ID.
KPIs
GET /api/kpis: Get all KPIs.
POST /api/kpis: Add a new KPI.
GET /api/kpis/
: Get a single KPI by ID.
PUT /api/kpis/
: Update a KPI by ID.
DELETE /api/kpis/
: Delete a KPI by ID.
Notifications
GET /api/notifications: Get all notifications.
POST /api/notifications: Add a new notification.
GET /api/notifications/
: Get a single notification by ID.
PUT /api/notifications/
: Update a notification by ID.
DELETE /api/notifications/
: Delete a notification by ID.
Feedback
GET /api/feedback: Get all feedback.
POST /api/feedback: Add new feedback.
GET /api/feedback/
: Get a single feedback by ID.
PUT /api/feedback/
: Update feedback by ID.
DELETE /api/feedback/
: Delete feedback by ID.
Authentication
Authentication is handled using JWT. Upon successful login, a JWT token is issued which must be included in the Authorization header for subsequent requests to protected routes.

Example
http
Copy code
Authorization: Bearer <your_jwt_token>
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.![Screenshot 2024-06-13 092306](https://github.com/Haregewoyn-Soramo/Soramo-Haregewoyn-EMS-Capstone/assets/160265613/18470dd1-4f71-4969-a2b2-2765a3a16010)
![Screenshot 2024-06-13 092237](https://github.com/Haregewoyn-Soramo/Soramo-Haregewoyn-EMS-Capstone/assets/160265613/5f155ca3-61b4-4c39-ac28-eb18d9571c41)
![Screenshot 2024-06-13 092423](https://github.com/Haregewoyn-Soramo/Soramo-Haregewoyn-EMS-Capstone/assets/160265613/187106df-04f2-4b1a-ac48-3721c3020bc3)
![Screenshot 2024-06-13 092433](https://github.com/Haregewoyn-Soramo/Soramo-Haregewoyn-EMS-Capstone/assets/160265613/44fe3f47-dd54-4e62-97f9-b11080a57eae)
![Screenshot 2024-06-13 092445](https://github.com/Haregewoyn-Soramo/Soramo-Haregewoyn-EMS-Capstone/assets/160265613/f7fa5957-0360-47b8-9ef1-525315eeaf8f)
![Screenshot 2024-06-13 092457](https://github.com/Haregewoyn-Soramo/Soramo-Haregewoyn-EMS-Capstone/assets/160265613/e975e823-de2d-4990-9770-0507c78e4de4)
