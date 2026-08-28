const prisma = require('../config/prisma');

module.exports = {
     criar: (dados) =>{
        return prisma.usuario.create( {
            data: dados
        });
    }
};
