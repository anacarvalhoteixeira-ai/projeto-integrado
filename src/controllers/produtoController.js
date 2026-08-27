const produtoModel = require("../models/produtoModel");

const listarProdutos = async (req, res) => {
    try {
        const produtos = await produtoModel.buscarTodos();

        res.status(200).json(produtos);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar produtos."
        });
    }
};

const filtrarProdutos = async (req, res) => {
    try {
        const { categoria } = req.query;

        if (!categoria) {
            return res.status(400).json({
                mensagem: "Informe uma categoria."
            });
        }

        const produtos = await produtoModel.buscarPorCategoria(categoria);

        res.status(200).json(produtos);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao filtrar produtos."
        });
    }
};

const buscarProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const produto = await produtoModel.buscarPorId(id);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        res.status(200).json(produto);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar produto."
        });
    }
};

const cadastrarProduto = async (req, res) => {
    try {
        const { nome, preco, categoria } = req.body;

        if (!nome || !preco || !categoria) {
            return res.status(400).json({
                mensagem: "Nome, preço e categoria são obrigatórios."
            });
        }

        const novoProduto = await produtoModel.criar({
            nome,
            preco: Number(preco),
            categoria
        });

        res.status(201).json(novoProduto);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar produto."
        });
    }
};

const excluirProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const produto = await produtoModel.buscarPorId(id);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        const produtoRemovido = await produtoModel.deletar(id);

        res.status(200).json({
            mensagem: "Produto removido com sucesso.",
            produto: produtoRemovido
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao excluir produto."
        });
    }
};

module.exports = {
    listarProdutos,
    filtrarProdutos,
    buscarProduto,
    cadastrarProduto,
    excluirProduto
};