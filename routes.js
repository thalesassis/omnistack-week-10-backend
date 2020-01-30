const { Router } = require('express');
const routes = Router();

const UserController = require('./controllers/UserController');

routes.put("/user", UserController.store);
routes.delete("/user/:id", UserController.delete);
routes.get("/users", UserController.index);
routes.post("/users", UserController.search);


module.exports = routes;