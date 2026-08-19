const express = require("express");
const cors = require("cors");

const app = express();
const PORTA = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Dados mockados em memória
let produtos = [
    {
        id: 1,
        nome: "Teclado Mecânico",
        preco: 150,
        categoria: "informatica"
    },
    {
        id: 2,
        nome: "Mouse Gamer",
        preco: 90,
        categoria: "informatica"
    },
    {
        id: 3,
        nome: "Fone Bluetooth",
        preco: 120,
        categoria: "eletronicos"
    },
    {
        id: 4,
        nome: "Caderno de Desenho",
        preco: 25,
        categoria: "papelaria"
    },
    {
        id: 5,
        nome: "Caixa de Som",
        preco: 200,
        categoria: "eletronicos"
    },
    {
        id: 6,
        nome: "Papel A4",
        preco: 50,
        categoria: "papelaria"
    },
    {
        id: 7,
        nome: "Brinquedo para Gatos",
        preco: 100,
        categoria: "petshop"
    }
];

// Rota inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Produtos funcionando!"
    });
});


// 1 — LISTAR TODOS OS PRODUTOS
app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});


// 2 — FILTRAR POR CATEGORIA
app.get("/produtos/filtrar", (req, res) => {
    const { categoria } = req.query;

    if (!categoria) {
        return res.status(400).json({
            mensagem: "Informe uma categoria."
        });
    }

    const resultado = produtos.filter(
        produto => produto.categoria.toLowerCase() === categoria.toLowerCase()
    );

    res.status(200).json(resultado);
});


// 3 — BUSCAR PRODUTO POR ID
app.get("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado."
        });
    }

    res.status(200).json(produto);
});


// 4 — CADASTRAR PRODUTO
app.post("/produtos", (req, res) => {
    const { nome, preco, categoria } = req.body;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({
            mensagem: "Nome, preço e categoria são obrigatórios."
        });
    }

    const novoProduto = {
        id: produtos.length > 0
            ? produtos[produtos.length - 1].id + 1
            : 1,
        nome,
        preco: Number(preco),
        categoria
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});


// 5 — EXCLUIR PRODUTO
app.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = produtos.findIndex(
        produto => produto.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Produto não encontrado."
        });
    }

    const produtoRemovido = produtos.splice(indice, 1);

    res.status(200).json({
        mensagem: "Produto removido com sucesso.",
        produto: produtoRemovido[0]
    });
});


// Iniciar servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
