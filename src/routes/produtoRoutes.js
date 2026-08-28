const express = require("express");

const produtoController = require("../controllers/produtoController");

const router = express.Router();

router.get("/", produtoController.listarProdutos);

router.get("/filtrar", produtoController.filtrarProdutos);

router.get("/:id", produtoController.buscarProduto);

router.post("/", produtoController.cadastrarProduto);

router.delete("/:id", produtoController.excluirProduto);

module.exports = router;