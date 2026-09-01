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

        if (isNaN(id)) {
            return res.status(400).json({
                mensagem: "ID inválido"
            });
        }

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

const atualizarProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensagem: "ID inválido"
            });
        }

        const produtoExistente = await produtoModel.buscarPorId(id); 

        if(!produtoExistente) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            })
        } 

           const { nome, preco, categoria } = req.body;

        if (!nome || preco === undefined || !categoria) {
            return res.status(400).json({
                mensagem: "Nome, preço e categoria são obrigatórios"
            });
        }

        const produtoAtualizado = await produtoModel.atualizar(id, {
            nome,
            preco,
            categoria
        });

        return res.status(200).json(produtoAtualizado);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
}

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

         if (isNaN(id)) {
            return res.status(400).json({
                erro: "ID inválido"
            });
        }
        
        const produtoExistente = await produtoModel.buscarPorId(id);

        if (!produtoExistente) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        await produtoModel.deletar(id);

        return res.status(200).json({
            mensagem: "Produto excluído com sucesso"
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

module.exports = {
    listarProdutos,
    filtrarProdutos,
    atualizarProduto,
    buscarProduto,
    cadastrarProduto,
    excluirProduto
};