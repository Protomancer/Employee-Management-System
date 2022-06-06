const mysql = require('mysql2');
require('dotenv').config();

const connectData = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'ems_db'
    }
);

connectData.connect((err) => err ? console.log(err) : console.log(''));

module.exports = connectData;