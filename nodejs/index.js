const express = require('express');
const app = express();
const cors = require('cors')
const connect = require('./connection');
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);
 
connect();

app.listen(3333); 