const express = require('express');
require('dotenv').config();

var AWS = require('aws-sdk');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});