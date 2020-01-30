const express = require('express');
const app = express();
const cors = require('cors')
const connect = require('./connection');
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);
 
connect();

let port = process.env.PORT || 8080;

app.listen(port); 