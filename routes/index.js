const router = require('express').Router();
// Controller to get all users
const controller = require('../controllers');
const UserController = require('../controllers/UserController');

module.exports = (app) => {
  // Get all user info
  router.get('/', controller.getUsers);

  router.post('/registration', UserController.register);

  router.post('/login', UserController.login);

  app.use('/', router);
};
