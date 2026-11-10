
# Application Installation and Usage Instructions
git clone aug25ft-dab-ca-1-MagnusFlod
cd aug25ft-dab-ca-1-MagnusFlod
npm install
npm start

# Environment Variables
Create a .env-file in the root-directory of the project with the following variables:
ADMIN_USERNAME="ProjectAdmin"
ADMIN_PASSWORD="0000"
DATABASE_NAME="adoptiondb"
DIALECT="mysql"
DIALECTMODEL="mysql2"
PORT="3000"
HOST="localhost"


# Additional Libraries/Packages
Node.js
Express
MySQL
Sequelize
PassportJS
EJS

# NodeJS Version Used
Node.js v24.12.0

# DATABASE
CREATE DATABASE adoptiondb;
USE adoptiondb;


# DATABASEACCESS
CREATE USER 'dabcaowner'@'localhost' IDENTIFIED BY 'dabca1234';

GRANT ALL PRIVILEGES ON adoptiondb.* TO 'dabcaowner'@'localhost';

FLUSH PRIVILEGES;