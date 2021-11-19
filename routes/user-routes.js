const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/user-controllers');
const foodController = require('../controllers/food-controller');
const Authenticate = require('../middleware/check-auth');
const router = express.Router();

router.post(
  '/signup',
  [
    check('fullname')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 3 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);
router.post('/reset-password', usersController.resetPassword);
router.post('/new-password', usersController.newPassword);
router.post('/viewprofile', Authenticate, usersController.viewProfile);
router.post('/editprofile', Authenticate, usersController.editProfile);

router.post('/donate', Authenticate, foodController.addfood);
router.get('/request', foodController.getFood);
router.delete('/deletefood', Authenticate, foodController.deletefood);
router.post('/viewfood', Authenticate, foodController.viewfood);
router.post('/acceptfood', Authenticate, foodController.acceptfood);
router.post('/viewdonatedfood', Authenticate, foodController.viewdonatedfood);
router.post('/viewreceivedfood', Authenticate, foodController.viewreceivedfood);
router.post('/openviewdonatefood', Authenticate, foodController.openviewdonatefood);
router.post('/openviewreceivedfood', Authenticate, foodController.openviewreceivedfood);
router.post('/receivedfood', Authenticate, foodController.receivedfood);
router.post('/cancelledfood', Authenticate, foodController.cancelledfood);
router.get('/contributors', foodController.contributors);

module.exports = router;
