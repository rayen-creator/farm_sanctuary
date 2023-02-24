const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.post('/', (req, res) => {
    const data = req.body;
    res.send(`Hello ${data.name}!`);
});
const PORT=3000;
app.listen(PORT, () => {
    console.log('Server running on port 3000');
});