# Student Fee Management System

A web-based application for managing student fees, built with React, Node.js, Express, and MySQL.

## Features

- 📊 Dashboard with real-time statistics
- 💰 Monthly and yearly fee management
- 📝 Student record management
- 📈 Fee collection tracking
- 💾 Data backup and restore functionality
- 📊 Export data to Excel
- 🔍 Search and filter capabilities
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- React-Toastify
- XLSX for Excel export

### Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- CORS

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone https://github.com/engkufizz/Fee_Management_System.git
cd Fee_Management_System
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Create MySQL database
```sql
CREATE DATABASE student_fees_db;
```

5. Configure backend
- Create `config/database.js` in the backend folder
- Update database credentials

```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('student_fees_db', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
```

## Running the Application

1. Start the backend server (default port: 3002)
```bash
cd backend
npm start
```

2. Start the frontend development server (default port: 3001)
```bash
cd frontend
npm start
```

3. Access the application at `http://localhost:3001`

## Project Structure

```
Fee_Management_System/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
└── backend/
    ├── config/
    ├── models/
    └── server.js
```

## API Endpoints

- `GET /api/getStudents` - Get all students by fee type
- `POST /api/addStudent` - Add new student record
- `PUT /api/updateStudent` - Update student record
- `DELETE /api/student/:id` - Delete student record
- `DELETE /api/resetStudents` - Reset all records by fee type

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful components
- React community for the amazing tools
- All contributors who help to improve this project

## Contact

Engku Fizz - [GitHub](https://github.com/engkufizz)

Project Link: [https://github.com/engkufizz/Student_Fee_Management](https://github.com/engkufizz/Student_Fee_Management)

## Screenshots

![image](https://github.com/user-attachments/assets/3ab85633-4358-491b-9baf-96f492b94297)
