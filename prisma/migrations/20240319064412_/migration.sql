/*
  Warnings:

  - You are about to drop the column `status` on the `tables` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `tables` table. All the data in the column will be lost.
  - You are about to drop the column `statustabi` on the `tablestatus` table. All the data in the column will be lost.
  - Added the required column `price` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableStatus` to the `TableStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `tables` DROP COLUMN `status`,
    DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `tablestatus` DROP COLUMN `statustabi`,
    ADD COLUMN `tableStatus` ENUM('FREE', 'RESERVED') NOT NULL;

-- AlterTable
ALTER TABLE `tabletype` MODIFY `nots` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Image` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `table_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Tables`(`table_id`) ON DELETE CASCADE ON UPDATE CASCADE;
