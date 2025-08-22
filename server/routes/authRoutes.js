const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define a rota: POST /api/auth/login
// Quando um pedido POST chegar, executa a função 'login' do controlador.
router.post('/login', authController.login);

module.exports = router;
