const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/:id', userController.getUser);

module.exports = router;