/*
  Warnings:

  - You are about to drop the column `clock` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `clock`,
    ADD COLUMN `locked` BOOLEAN NOT NULL DEFAULT false;
