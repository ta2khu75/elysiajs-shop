/*
  Warnings:

  - You are about to drop the `number_of_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `number_of_product` DROP FOREIGN KEY `number_of_product_productDetailsId_fkey`;

-- DropTable
DROP TABLE `number_of_product`;

-- CreateTable
CREATE TABLE `Warehouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productDetailsId` INTEGER NOT NULL,
    `remaining` INTEGER NOT NULL,

    UNIQUE INDEX `Warehouse_productDetailsId_key`(`productDetailsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Warehouse` ADD CONSTRAINT `Warehouse_productDetailsId_fkey` FOREIGN KEY (`productDetailsId`) REFERENCES `product_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
