const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);
 
mongoose.connect('mongodb://thalesassis:omnistackweek10@cluster0-shard-00-00-fkb6h.mongodb.net:27017,cluster0-shard-00-01-fkb6h.mongodb.net:27017,cluster0-shard-00-02-fkb6h.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})


app.listen(3333); 