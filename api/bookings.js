const express = require('express');
const bookingsRouter = express.Router();

var mysql      = require('mysql');
var connection = mysql.createPool({
  host     : 'us-cdbr-east-02.cleardb.com',
  user     : 'b91b91ac8dc265',
  password : '748d7c95',
  database : 'heroku_5e3dbedf59aa4b0'
});

/* connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  }); */

bookingsRouter.get('/', (req, res, next) => {
    //res.json({ message: 'hooray! welcome to our api!' });
    connection.query('SELECT * FROM bookings WHERE is_booked=1', (err, rows) => {
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
    connection.query(`INSERT INTO bookings (name, table_number, seat_number, is_booked) VALUES ("${req.body.guest.name}", "${req.body.guest.table_number}", "${req.body.guest.seat_number}", 1)`,
    function (err, results){
        if(err){
            next(err);
        }
        connection.query(`SELECT * FROM bookings WHERE id=${results.insertId}`,       
        (err, guest) => {
            res.status(201).json({guest: guest})
        }
        )
    })
})

module.exports = bookingsRouter;


