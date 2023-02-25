const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan=require('morgan');
require('dotenv').config();


app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.post('/', (req, res) => {
    const data = req.body;
    res.send(`Hello ${data.name}!`);
});
app.listen(process.env.PORT, () => {
    console.log('Server running on port '+process.env.PORT);
});
