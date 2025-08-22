const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de Login (já existente)
router.post('/login', authController.login);

// NOVA ROTA DE REGISTO
// Quando um pedido POST chegar a /api/auth/register,
// executa a função 'register' do nosso controlador.
router.post('/register', authController.register);

module.exports = router;
