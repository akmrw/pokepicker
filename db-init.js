import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const sqlite = new SQLiteConnection(CapacitorSQLite);
let db;

export async function initDatabase() {
  db = await sqlite.createConnection("tcgdex", false, "no-encryption", 1);
  await db.open();

  // Tabelle anlegen
  await db.execute(`
    CREATE TABLE IF NOT EXISTS kartendex (
      dex INTEGER PRIMARY KEY,
      name TEXT,
      reverse TEXT,
      holo TEXT,
      v TEXT,
      vmax TEXT,
      vstar TEXT,
      ex TEXT,
      shiny TEXT,
      fullart TEXT,
      rare TEXT,
      amazing TEXT,
      rainbow TEXT,
      gold TEXT,
      custom TEXT
    );
  `);

  return db;
}

export async function getDaten() {
  return await db.query("SELECT * FROM kartendex");
}

export async function updateFeld(dex, feld, wert) {
  return await db.run(`UPDATE kartendex SET ${feld} = ? WHERE dex = ?`, [wert, dex]);
}
