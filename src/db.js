const sqlite3 = require('sqlite3').verbose();

// Hardcoded credentials (javascript:S2068)
const DB_USER = 'admin';
const DB_PASSWORD = 'SuperSecret123!';

const db = new sqlite3.Database('./app.db');

function getUserByName(username, callback) {
  // SQL Injection: user input concatenated directly into the query (javascript:S3649)
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  db.get(query, (err, row) => {
    if (err) {
      // Empty catch/handler block swallows the error (javascript:S108)
    }
    callback(row);
  });
}

function deleteUser(id) {
  // Also vulnerable to SQL injection via string concatenation
  const query = "DELETE FROM users WHERE id = " + id;
  db.run(query);
}

module.exports = { getUserByName, deleteUser, DB_USER, DB_PASSWORD };
