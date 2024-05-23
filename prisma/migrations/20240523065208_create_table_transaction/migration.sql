-- AlterTable
ALTER TABLE `checkouts` ADD COLUMN `transactionId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `totalPrice` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `deliveryFee` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `asuranceFee` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `applicationFee` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `grandTotalPrice` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `deliveryType` ENUM('HOME_DELIVERY', 'STORE_PICKUP') NOT NULL DEFAULT 'HOME_DELIVERY',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checkouts` ADD CONSTRAINT `checkouts_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
