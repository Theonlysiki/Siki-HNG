const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  let customerTable = `CREATE TABLE IF NOT EXISTS customers(
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          name VARCHAR(255) NOT NULL,
                          address VARCHAR(255) NOT NULL,
                          age INT NOT NULL
                        )`;

  connection.query(customerTable, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    if (results) {
      console.log(results);
      console.log("table created")
    }
  });

});

module.exports = connection;