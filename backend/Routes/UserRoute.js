const UserController = require('../Controllers/UserController');
const express = require('express');
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);
router.get('/:id', UserController.getUserById);
router.post('/login', UserController.loginUser);

module.exports = router;