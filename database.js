const Database = require('better-sqlite3');
const db = new Database("records.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS records (
  name TEXT NOT NULL,
  record INT NOT NULL
  )
`);

module.exports = db;
