const express = require('express');
const cors = require('cors');
const app = express();
const port = 1000;

const { addRecord, getRecords } = require('./database');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.post('/api/record', async (req, res) => {
  const { name, score } = req.body;
  await addRecord(name, score);
  res.json({ success: true });
});

app.get('/api/records', async (req, res) => {
  const records = await getRecords();
  records.sort((a, b) => b[1] - a[1]);
  res.json(records);
});

/*app.get('/showrecords', (req, res) => {
  try {
    const highRecords = db.prepare('SELECT * FROM records ORDER BY record DESC');
    const showRecords = highRecords.all();
    res.status(200).json({ result: showRecords });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/leavecasino', (req, res) => {
  const { name, money } = req.body;
  if(name == ''){
    res.status(400).json({
      message: 'Please insert a name.'
    });
    return;
  }
  const insert = db.prepare('INSERT INTO records (name, record) VALUES (?, ?)');
  const result = insert.run(name, money);

  res.status(201).json({
    noteId: result.lastInsertRowid
  });
});*/               // funciones agregadas en el previo base de datos de sqlite3
