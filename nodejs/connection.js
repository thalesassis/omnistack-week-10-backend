const mongoose = require('mongoose');
const env = require('dotenv').config();

function connect() {
    mongoose.connect(env.parsed.MONGODB_ADDRESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = connect;