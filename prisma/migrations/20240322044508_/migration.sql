/*
  Warnings:

  - Added the required column `price` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Tables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tables` ADD COLUMN `nots` VARCHAR(191) NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
