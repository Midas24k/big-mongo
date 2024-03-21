const express = require('express');
const db = require('../connection.js');
const routes = require('./routes');

const Port = process.env.Port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(Port, () => {
        console.log(`Server running on port ${Port}`);
    });
});
