const Database = require('better-sqlite3');
const db = new Database("records.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS records (
  name TEXT NOT NULL,
  record INT NOT NULL
  )
`);

const rowCount = db.prepare('SELECT COUNT(*) AS count FROM records').get().count;
if (rowCount === 0) {
db.exec(`
 INSERT INTO records (name, record)
 VALUES
 ('Torrente', 300000),
 ('Pepito', 80000)
`);
}
module.exports = db;