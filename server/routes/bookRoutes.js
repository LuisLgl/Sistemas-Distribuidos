const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota de Criar Livro (já existente)
router.post('/', upload.single('imagem'), bookController.createBook);

// NOVA ROTA PARA LISTAR TODOS OS LIVROS
// Quando um pedido GET chegar a /api/books, executa a função getBooks.
router.get('/', bookController.getBooks);

// Rota para buscar um livro por ID (ex: GET /api/books/123)
router.get('/:id', bookController.getBookById);

// Rota para atualizar um livro por ID (ex: PUT /api/books/123)
router.put('/:id', bookController.updateBook);

// Rota para apagar um livro por ID (ex: DELETE /api/books/123)
router.delete('/:id', bookController.deleteBook);

module.exports = router;

