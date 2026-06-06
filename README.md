GitHub Profile Analyzer API 🚀
A robust backend service built with Node.js, Express, and MySQL that fetches live developer data from the official GitHub API and stores analytical insights into a relational database.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MySQL

API Calls: Axios

✨ Features
Live Data: Fetches real-time public profile data directly from GitHub.

Database Storage: Saves analytical insights (followers, repositories, etc.) into MySQL.

Secure Queries: Uses Prepared Statements to prevent SQL injection.

Custom Routing: Retrieves all saved profiles or queries individual profiles directly from the local database.

🚀 Setup Instructions
1. Install Dependencies
Make sure you have Node.js installed. Open your terminal in the project folder and run:
npm install

2. Database Setup
Open MySQL Workbench.

Create a new database called github_analyzer_db.

Import the provided database.sql file to instantly generate the required tables and schema.

3. Environment Variables
Create a .env file in the root directory of your project and add your database credentials like this:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=github_analyzer_db

4. Start the Server
Run the following command to start the backend engine:
npm run dev

(The server will start running on http://localhost:5000)

🛣️ API Endpoints
GET /api/gitHub/:username Fetches a profile from the live GitHub API and saves it to MySQL.

GET /api/gitHub/fetch/all/data Retrieves a list of all analyzed profiles currently saved in the database.

GET /api/gitHub/fetch/:username Retrieves the exact data for a single saved profile from the database.