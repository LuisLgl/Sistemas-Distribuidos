const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');

// Configura o multer para guardar o ficheiro temporariamente na memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota para CRIAR um livro (já existente)
router.post('/', upload.single('imagem'), bookController.createBook);

// Rota para LER todos os livros (já existente)
router.get('/', bookController.getBooks);

// Rota para LER um livro por ID (já existente)
router.get('/:id', bookController.getBookById);

// Rota para ATUALIZAR um livro por ID
// CORRIGIDO: Adicionado o middleware 'upload.single('imagem')' para processar o upload
router.put('/:id', upload.single('imagem'), bookController.updateBook);

// Rota para APAGAR um livro por ID (já existente)
router.delete('/:id', bookController.deleteBook);

module.exports = router;
