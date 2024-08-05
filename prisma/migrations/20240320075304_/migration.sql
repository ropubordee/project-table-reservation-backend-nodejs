/*
  Warnings:

  - You are about to drop the column `amount` on the `paymentstatus` table. All the data in the column will be lost.
  - You are about to alter the column `statusmoney` on the `paymentstatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the column `paymentstatus` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `bookingDate` to the `BookingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `PaymentStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingDate` to the `Reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookinghistory` ADD COLUMN `bookingDate` DATETIME(3) NOT NULL,
    MODIFY `reservationDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `paymentstatus` DROP COLUMN `amount`,
    ADD COLUMN `price` DOUBLE NOT NULL,
    MODIFY `statusmoney` ENUM('PAID', 'UNPAID', 'PENDING') NOT NULL;

-- AlterTable
ALTER TABLE `reservations` DROP COLUMN `paymentstatus`,
    ADD COLUMN `bookingDate` DATETIME(3) NOT NULL,
    MODIFY `reservationDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tables` MODIFY `tableNumber` VARCHAR(191) NOT NULL;
