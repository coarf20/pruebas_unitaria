// /config/database.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'adso121',
  password: 'Sena1234',
  database: 'pruebas_unitarias'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

module.exports = connection;