-- AlterTable
ALTER TABLE `paymentstatus` MODIFY `statusmoney` ENUM('PAID', 'UNPAID', 'PENDING') NOT NULL DEFAULT 'UNPAID';
