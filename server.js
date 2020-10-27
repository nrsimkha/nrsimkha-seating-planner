const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const apiRouter = require('./client/api/api');


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(errorhandler());
app.use(cors());
app.use('/api', apiRouter);



app.listen(PORT, ()=> {
    console.log(`Server is listenenig on port ${PORT}`)
})

module.exports = app;