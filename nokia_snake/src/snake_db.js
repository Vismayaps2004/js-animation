export class SnakeDb {
  constructor(db) {
    this.db = db;
  }

  initialise() {
    const tableQuery = `CREATE TABLE IF NOT EXISTS players (
    id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    score integer CHECK (score >= 0)
    );`;
    this.db.exec(tableQuery);
  }

  addPlayerDetails(name, score) {
    const insertQuery = `INSERT INTO players (name, score) 
    VALUES (?,?);
    `;
    this.db.prepare(insertQuery).run(name, score);
  }

  listHighestScores() {
    const listQuery = `SELECT * FROM players 
    ORDER BY score ASC
    LIMIT 5;
    `;
    console.table(this.db.prepare(listQuery).all());
  }
}
