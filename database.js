const Database = require('better-sqlite3');
const db = new Database("records.db");
const { google } = require('googleapis');
const path = require('path');

db.exec(`
  CREATE TABLE IF NOT EXISTS records (
  name TEXT NOT NULL,
  record INT NOT NULL
  )
`);

const auth = new google.auth.GoogleAuth({
  keyFile: 'creds.json', // Ruta del Secret File en Render
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets('v4');
const spreadsheetId = '1PUW1bj9J_6p_2pMAEeZT7W_R9kLAvj1-lkHpdOFof3Q'; // Reemplaza con el ID de tu hoja

async function addRecord(name, score) {
  const client = await auth.getClient();
  await sheets.spreadsheets.values.append({
    auth: client,
    spreadsheetId,
    range: 'Sheet1!A:B', // Cambia Sheet1 si tu hoja tiene otro nombre
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[name, score]],
    },
  });
}
async function getRecords() {
  const client = await auth.getClient();
  const res = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range: 'Sheet1!A:B',
  });
  return res.data.values; // Array de arrays: [[nombre, score], ...]
}

module.exports = { db, addRecord, getRecords };
