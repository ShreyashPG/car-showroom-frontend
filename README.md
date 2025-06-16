
# 🚗 Car Showroom Management App

A full-stack web application for managing car sales, employee access, and customer interactions. Built using Node.js, Express, MySQL, and React.js.

## 📦 Features

- 🔐 Secure login for Sales and Employees
- 🚘 Manage Car Inventory
- 🧾 Generate Sales Reports
- 🗃️ View and manage Customer Data
- 🗂 Role-Based Access Control
- 📊 Admin Dashboard with analytics

## 🛠 Tech Stack

**Frontend**  
- React.js  
- Axios  
- Tailwind CSS  

**Backend**  
- Node.js  
- Express.js  
- MySQL (mysql2)  
- JWT Authentication  

## 🔧 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/car-showroom-app.git
   cd car-showroom-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create `.env` file**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=car_showroom
   JWT_SECRET=your_secret_key
   ```

4. **Start Backend Server**
   ```bash
   node index.js
   ```

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## 📁 Folder Structure

```bash
car-showroom-app/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
├── README.md
```

## ✅ To-Do

- [ ] Add unit tests
- [ ] Add image upload for car listings

## 🧑‍💻 Author

**Shreyash Ghanekar**  
📫 Email: shreyasghanekar35@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/shreyash-ghanekar/) • [GitHub](https://github.com/ShreyashPG)

## 📜 License

This project is licensed under the [MIT License](LICENSE).
