const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//const cwd = process.cwd();

// Set the port for the server to listen on. If process.env.PORT is not set, default to 3001
const PORT = process.env.PORT || 3001;
// Create an instance of an Express application
const app = express();
// Use the urlencoded middleware in Express to parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use the imported routes for handling all routes
app.use(routes);


// Once the database connection is open, start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`http://localhost:${PORT}`);
  });
});