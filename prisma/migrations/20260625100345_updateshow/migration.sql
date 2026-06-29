/*
  Warnings:

  - You are about to drop the column `end_time` on the `show` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `show` DROP COLUMN `end_time`,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL;
