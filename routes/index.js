/* eslint-disable global-require */
const controller = require('../controllers');

module.exports = (app) => {
  const UserController = require('../controllers/UserController');
  const router = require('express').Router();

  router.route('/')
    .get(controller.getUsers);

  router.route('/registration')
    .post(UserController.register);

  app.use('/', router);
};
