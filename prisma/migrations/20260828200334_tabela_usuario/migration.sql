/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `criadoEm`,
    ADD COLUMN `senha` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `post`;
