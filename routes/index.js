const router = require('express').Router();
// Controller to get all users
const controller = require('../controllers');
const UserController = require('../controllers/UserController');
const DoctorController = require('../controllers/DoctorController');
const ReceptionsController = require('../controllers/ReceptionsController');
const auth = require('../middleware/auth');

module.exports = (app) => {
  // Get all user info
  router.get('/', controller.getUsers);

  router.post('/registration', UserController.register);

  router.post('/login', UserController.login);

  router.route('/doctors')
    .get(DoctorController.getDoctors)
    .post(DoctorController.addNewDoctor);

  router.route('/doctors/:id')
    .delete(DoctorController.removeDoctor)
    .patch(DoctorController.editDoctor);

  router.route('/receptions')
    .post(auth, ReceptionsController.addNewReception)
    .get(auth, ReceptionsController.getVisitsByUserId);

  app.use('/', router);
};
