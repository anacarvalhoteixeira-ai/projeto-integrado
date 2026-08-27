const prisma = require("../config/prisma");

module.exports = {
    buscarTodos: () => {
        return prisma.produto.findMany();
    },

    buscarPorCategoria: (categoria) => {
        return prisma.produto.findMany({
            where: {
                categoria: categoria
            }
        });
    },

    buscarPorId: (id) => {
        return prisma.produto.findUnique({
            where: {
                id: id
            }
        });
    },

    criar: (dados) => {
        return prisma.produto.create({
            data: dados
        });
    },

    deletar: (id) => {
        return prisma.produto.delete({
            where: {
                id: id
            }
        });
    }
};