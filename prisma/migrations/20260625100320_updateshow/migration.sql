/*
  Warnings:

  - You are about to drop the column `movie_id` on the `show` table. All the data in the column will be lost.
  - You are about to drop the column `screen_id` on the `show` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `show` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenId` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `show` DROP FOREIGN KEY `Show_movie_id_fkey`;

-- DropForeignKey
ALTER TABLE `show` DROP FOREIGN KEY `Show_screen_id_fkey`;

-- DropIndex
DROP INDEX `Show_movie_id_idx` ON `show`;

-- DropIndex
DROP INDEX `Show_screen_id_idx` ON `show`;

-- AlterTable
ALTER TABLE `show` DROP COLUMN `movie_id`,
    DROP COLUMN `screen_id`,
    DROP COLUMN `start_time`,
    ADD COLUMN `movieId` VARCHAR(191) NOT NULL,
    ADD COLUMN `screenId` VARCHAR(191) NOT NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `Show_movieId_idx` ON `Show`(`movieId`);

-- CreateIndex
CREATE INDEX `Show_screenId_idx` ON `Show`(`screenId`);

-- AddForeignKey
ALTER TABLE `Show` ADD CONSTRAINT `Show_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Show` ADD CONSTRAINT `Show_screenId_fkey` FOREIGN KEY (`screenId`) REFERENCES `Screen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
