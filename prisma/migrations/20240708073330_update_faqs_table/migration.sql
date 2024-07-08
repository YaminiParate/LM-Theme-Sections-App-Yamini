/*
  Warnings:

  - Made the column `createdAt` on table `faqs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shop` on table `faqs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `faqs` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `shop` VARCHAR(191) NOT NULL;
