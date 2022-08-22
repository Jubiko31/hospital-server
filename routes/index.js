/* eslint-disable global-require */
module.exports = (app) => {
  const UserController = require('../controllers/UserController');
  const controller = require('../controllers');
  const router = require('express').Router();

  router.route('/')
    .get(controller.getUsers);

  router.route('/registration')
    .post(UserController.register);

  app.use('/', router);
};
