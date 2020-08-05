const sqlite = require('sqlite3');
const db = new sqlite.Database('./database.sqlite');

db.serialize(()=>{
    db.run('DROP TABLE IF EXISTS Bookings', error => {
        if (error) {
          throw error;
        }
      });
      db.run('CREATE TABLE Bookings (id INTEGER PRIMARY KEY, name TEXT NOT NULL, table_number INTEGER NOT NULL, seat_number INTEGER NOT NULL, is_booked INTEGER DEFAULT 0)');
  
})

