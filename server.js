const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MariaDB-Pool
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'tcgdex',
  password: '$km192!D',
  database: 'tcgdex',
  connectionLimit: 5
});

// Alle Einträge aus einer Tabelle holen
app.get('/daten', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM kartendex");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Fehler bei der DB-Abfrage');
  } finally {
    if (conn) conn.end();
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});