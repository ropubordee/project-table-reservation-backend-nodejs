/*
  Warnings:

  - You are about to drop the column `price` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the `tabletype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tabletype` DROP FOREIGN KEY `TableType_table_id_fkey`;

-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `price`;

-- DropTable
DROP TABLE `tabletype`;
