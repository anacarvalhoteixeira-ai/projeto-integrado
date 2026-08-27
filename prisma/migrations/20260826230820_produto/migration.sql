/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `emEstoque` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `categoria` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produtos` DROP COLUMN `criadoEm`,
    DROP COLUMN `emEstoque`,
    ADD COLUMN `categoria` VARCHAR(50) NOT NULL,
    ADD COLUMN `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
