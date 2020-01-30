const mongoose = require('mongoose');

function connect() {
    mongoose.connect(env.process.MONGODB_ADDRESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = connect;