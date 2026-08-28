const express = require("express");
const cors = require("cors");
const produtoRoutes = require("./src/routes/produtoRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes")

const app = express();
const PORTA = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Produtos funcionando!"
    });
});

app.use("/produtos", produtoRoutes);
app.use("/usuarios", usuarioRoutes);

// Iniciar servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
