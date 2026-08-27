const express = require("express");

const {
    listarProdutos,
    filtrarProdutos,
    buscarProduto,
    cadastrarProduto,
    excluirProduto
} = require("../controllers/produtoController");

const router = express.Router();

router.get("/", listarProdutos);

router.get("/filtrar", filtrarProdutos);

router.get("/:id", buscarProduto);

router.post("/", cadastrarProduto);

router.delete("/:id", excluirProduto);

module.exports = router;