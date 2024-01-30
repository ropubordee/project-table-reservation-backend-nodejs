-- CreateTable
CREATE TABLE `TableType` (
    `tabletype_id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_id` INTEGER NOT NULL,
    `typetable` VARCHAR(191) NOT NULL,
    `nots` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tabletype_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tables` (
    `table_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `tableNumber` INTEGER NOT NULL,
    `capacity` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`table_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservations` (
    `Reservationid` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `table_id` INTEGER NOT NULL,
    `paymentstatus` VARCHAR(191) NOT NULL,
    `reservationDateTime` DATETIME(3) NOT NULL,
    `numberofGugest` INTEGER NOT NULL,

    PRIMARY KEY (`Reservationid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentStatus` (
    `paymentstatus_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservation_id` INTEGER NOT NULL,
    `statusmoney` VARCHAR(191) NOT NULL,
    `paymentDateTime` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,

    PRIMARY KEY (`paymentstatus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TableStatus` (
    `tablestatus_id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_id` INTEGER NOT NULL,
    `statustabi` VARCHAR(191) NOT NULL,
    `datetimechanged` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`tablestatus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingHistory` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `table_id` INTEGER NOT NULL,
    `reservationDateTime` DATETIME(3) NOT NULL,
    `numberofGuests` INTEGER NOT NULL,
    `payment_status_id` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TableType` ADD CONSTRAINT `TableType_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Tables`(`table_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Tables`(`table_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentStatus` ADD CONSTRAINT `PaymentStatus_reservation_id_fkey` FOREIGN KEY (`reservation_id`) REFERENCES `Reservations`(`Reservationid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableStatus` ADD CONSTRAINT `TableStatus_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Tables`(`table_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingHistory` ADD CONSTRAINT `BookingHistory_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingHistory` ADD CONSTRAINT `BookingHistory_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Tables`(`table_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingHistory` ADD CONSTRAINT `BookingHistory_payment_status_id_fkey` FOREIGN KEY (`payment_status_id`) REFERENCES `PaymentStatus`(`paymentstatus_id`) ON DELETE CASCADE ON UPDATE CASCADE;
