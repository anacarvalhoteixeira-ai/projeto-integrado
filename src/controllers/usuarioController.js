const usuarioModel = require('../models/usuarioModel');
const bcrypt = require("bcryptjs");

module.exports = {

    cadastrarUsuario: async (req, res) => {
        try{
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha ) {
                return res.status(400).json({
                    mensagem: "Nome, email e senha são obrigatórios"
                });
            }

            const senhaHash = await bcrypt.hash(senha, 10);


            const novoUsuario = await usuarioModel.criar({
                nome,
                email,
                senha: senhaHash
            });

            res.status(201).json({
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            });
        } catch (erro){
            console.error(erro);

            res.status(500).json({
                mensagem: "Erro ao se cadastrar."
            });
        }
    }
};