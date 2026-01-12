const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database');
const port = 1000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/showrecords', (req, res) => {
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
});