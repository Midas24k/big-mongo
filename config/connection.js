const {connect, connection} = require('mongoose');

// Connect to the local mongo database
const connectionString = 'mongodb://localhost/socialNetworkDB';

connect(connectionString);

module.exports = connection;