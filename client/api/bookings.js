const express = require('express');
const bookingsRouter = express.Router();
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

bookingsRouter.get('/', (req, res, next) => {
    //res.json({ message: 'hooray! welcome to our api!' });
   db.all('SELECT * FROM Bookings WHERE is_booked=1', (err, rows) => {
        if(err){
            next(err);
        }
        res.status(200).json({bookings: rows})
    })
})

bookingsRouter.post('/', (req, res, next) => {
    if(!req.body.guest.name || !req.body.guest.table_number|| !req.body.guest.seat_number){
        return res.status(400).send();
    }    
    db.run("INSERT INTO Bookings (name, table_number, seat_number, is_booked) VALUES ($name, $table_numbe, $seat_number, $is_booked)",
    {
        $name:req.body.guest.name,
        $table_numbe: req.body.guest.table_number, 
        $seat_number: req.body.guest.seat_number, 
        $is_booked: 1
    },
    function (err){
        if(err){
            next(err);
        }
        db.get("SELECT * FROM Bookings WHERE id=$id",
        {$id: this.lastID},
        (err, guest) => {
            res.status(201).json({guest: guest})
        }
        )
    })
})

module.exports = bookingsRouter;


