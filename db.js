require('dotenv').config();
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const { PrismaClient } = require('@prisma/client'); 

const adapter = new PrismaMariaDb({
  connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({ adapter });
module.exports = prisma;
