# YARIGA - Real Estate Dashboard

A comprehensive real estate management dashboard with authentication, property management, and agent management features, built using Express.js, MongoDB, and EJS templating.

## 🏗️ Project Structure

```
express_authtication/
├── client/                 # Frontend files
│   ├── views/             # EJS templates
│   │   ├── head.ejs       # Header template
│   │   ├── foot.ejs       # Footer template
│   │   ├── login.ejs      # Login page
│   │   ├── dashboard.ejs  # Dashboard page
│   │   ├── property.ejs   # Property list page
│   │   ├── add-property.ejs # Add property form
│   │   ├── agent.ejs      # Agent list page
│   │   ├── agent-details.ejs # Agent details page
│   │   └── add-agent.ejs  # Add agent form
│   └── public/            # Static assets
│       ├── css/           # Stylesheets
│       │   └── style.css  # Main styles
│       └── js/            # JavaScript files
├── server/                # Backend files
│   ├── config/            # Configuration files
│   │   └── db.js          # Database connection
│   ├── middleware/        # Custom middleware
│   │   └── auth.js        # Authentication middleware
│   ├── models/            # Database models
│   │   ├── User.js        # User model
│   │   ├── Property.js    # Property model
│   │   └── Agent.js       # Agent model
│   ├── routes/            # Route handlers
│   │   ├── auth.js        # Authentication routes
│   │   ├── dashboard.js   # Dashboard routes
│   │   ├── property.js    # Property management routes
│   │   └── agent.js       # Agent management routes
│   ├── app.js             # Main server file
│   ├── seedProperties.js  # Property sample data
│   ├── seedAgents.js      # Agent sample data
│   └── package.json       # Server dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd express_authtication
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Start MongoDB**
   - Make sure MongoDB is running on `mongodb://localhost:27017`
   - The application will connect to a database named `yariga`

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - You'll be redirected to the login page

## 🔐 Authentication

### Default Credentials
- **Username:** admin
- **Password:** admin123

A default admin user is automatically created when the server starts for the first time.

## 🛠️ Features

- **Secure Authentication** - MongoDB-based user authentication with bcrypt password hashing
- **Session Management** - Express sessions for maintaining user login state
- **Property Management** - Complete CRUD operations for properties
- **Agent Management** - Comprehensive agent profiles and management
- **Real Estate Analytics** - Property and agent statistics
- **Responsive Dashboard** - Modern UI with Bootstrap 5
- **Search & Filter** - Advanced property search and filtering
- **Pagination** - Efficient data loading with pagination
- **Clean Architecture** - Separated client and server code
- **MongoDB Integration** - Full CRUD operations with Mongoose

## 📊 Dashboard Features

- **Analytics Dashboard**: Property statistics, revenue tracking, and trend indicators
- **Property Management**: 
  - View all properties with search and filter
  - Add new properties with image upload
  - Edit and delete existing properties
  - Property status management (For Sale, For Rent)
- **Agent Management**:
  - View all agents with contact information
  - Agent performance statistics
  - Add new agents with professional details
  - Agent profile management
- **Responsive Design**: Optimized for mobile and desktop devices

## 🔧 Configuration

### Database
Update the MongoDB connection string in `server/config/db.js`:
```javascript
const conn = await mongoose.connect('mongodb://localhost:27017/yariga', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### Session Secret
Change the session secret in `server/app.js`:
```javascript
app.use(session({
  secret: 'your-custom-secret-key',
  // ... other options
}));
```

## 📝 API Routes

### Authentication
- `GET /` - Home page (redirects to dashboard if logged in)
- `GET /login` - Login page
- `POST /login` - Handle login form submission
- `GET /logout` - Logout and destroy session

### Dashboard
- `GET /dashboard` - Main dashboard page (protected)

### Properties
- `GET /property` - Property list with search and pagination
- `GET /property/add` - Add property form
- `POST /property/add` - Create new property
- `POST /property/delete/:id` - Delete property

### Agents
- `GET /agent` - Agent list with search and pagination
- `GET /agent/:id` - Agent details page
- `GET /agent/add` - Add agent form
- `POST /agent/add` - Create new agent
- `POST /agent/delete/:id` - Delete agent

## 🗃️ Database Seeding

The application includes sample data for testing:

```bash
# Seed properties
cd server
node seedProperties.js

# Seed agents
node seedAgents.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please create an issue in the repository.

## 🏗️ Project Structure

```
express_authtication/
├── client/                 # Frontend (UI)
│   ├── views/             # EJS templates
│   │   ├── head.ejs
│   │   ├── foot.ejs
│   │   ├── login.ejs
│   │   └── dashboard.ejs
│   └── public/            # Static assets
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── main.js
├── server/                # Backend (API)
│   ├── config/           # Configuration files
│   │   └── db.js         # MongoDB connection
│   ├── models/           # Database models
│   │   └── User.js       # User model
│   ├── routes/           # Route handlers
│   │   ├── auth.js       # Authentication routes
│   │   └── dashboard.js  # Dashboard routes
│   ├── middleware/       # Custom middleware
│   │   └── auth.js       # Authentication middleware
│   ├── app.js           # Main server file
│   └── package.json     # Server dependencies
└── login-dashboard/      # Legacy files (can be removed)
```

## 🚀 Features

- **User Authentication**: Secure login/logout with bcrypt password hashing
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Responsive Design**: Bootstrap 5 with custom styles
- **Real Estate Dashboard**: Property management interface
- **Session Management**: Express sessions for user state
- **Clean Architecture**: Separated client and server code

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd express_authtication
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Start MongoDB**
   - Local MongoDB: `mongod`
   - Or use MongoDB Atlas cloud service

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:3000
   - Use default credentials: `admin` / `admin123`

## 🔧 Configuration

### Database Configuration
Edit `server/config/db.js` to change the MongoDB connection string:
```javascript
const conn = await mongoose.connect('mongodb://localhost:27017/yariga', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yariga
SESSION_SECRET=your-secret-key-here
```

## 👤 Default User

The system creates a default admin user on first run:
- **Username**: admin
- **Password**: admin123
- **Role**: admin

## 🛠️ Development

### Adding New Routes
1. Create route file in `server/routes/`
2. Import and use in `server/app.js`

### Adding New Views
1. Create EJS template in `client/views/`
2. Add corresponding route handler

### Styling
- Global styles: `client/public/css/style.css`
- Bootstrap 5 is included via CDN

## 📱 API Endpoints

- `GET /` - Home page (redirects to dashboard if logged in)
- `GET /login` - Login page
- `POST /login` - Login authentication
- `GET /logout` - Logout user
- `GET /dashboard` - Dashboard (protected route)

## 🔒 Security Features

- Password hashing with bcrypt
- Session-based authentication
- Protected routes middleware
- Input validation
- CSRF protection ready

## 📈 Future Enhancements

- [ ] Property CRUD operations
- [ ] User roles and permissions
- [ ] File upload for property images
- [ ] Advanced search and filtering
- [ ] Real-time notifications
- [ ] API documentation with Swagger
- [ ] Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.
