/*
  Warnings:

  - Made the column `city` on table `theatre` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pincode` on table `theatre` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `theatre` MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `pincode` INTEGER NOT NULL;
