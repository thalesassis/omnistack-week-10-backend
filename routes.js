const { Router } = require('express');
const routes = Router();

const UserController = require('./controllers/UserController');

routes.get("/", (req,res) => res.sendStatus(404));
routes.put("/user", UserController.store);
routes.delete("/user/:id", UserController.delete);
routes.get("/users", UserController.index);
routes.post("/users", UserController.search);

app.get('/getapk', function(req, res){
    const file = 'devradar.apk';
    res.download(file); // Set disposition and send it.
});

module.exports = routes;