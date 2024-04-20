/*
  Warnings:

  - Added the required column `productId` to the `product_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_details` ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `product_details` ADD CONSTRAINT `product_details_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
