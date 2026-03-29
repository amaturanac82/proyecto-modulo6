const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Vistas
router.get('/usuarios/vista', userController.renderUsers);
router.get('/usuarios/create', userController.showCreateForm);
router.get('/usuarios/edit/:id', userController.showEditForm);

// API
router.get('/usuarios', userController.getUsers);
router.post('/usuarios', userController.createUser);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);

module.exports = router;