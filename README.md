DB script for creating tables:
-----------------------------------------------------------

CREATE DATABASE test;

USE test;

CREATE TABLE users(
id INT auto_increment PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
task_name VARCHAR(255) NOT NULL,
status ENUM('pending', 'completed') NOT NULL
)

------------------------------------------------------
REQUIRED .env: 

PORT=3000

DB_NAME="test"
DB_USER="root"
DB_PASSWORD="admin"
DB_HOST="localhost"
JWT_SECRET="test"


------------------------------------------------------
Install dependency: npm install

For bulding the project: npm run build

Run the project using : npm run start
