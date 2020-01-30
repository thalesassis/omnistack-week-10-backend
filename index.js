require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(routes); 
 
mongoose.connect(process.env.MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let port = process.env.PORT || 3333;

app.listen(port); 