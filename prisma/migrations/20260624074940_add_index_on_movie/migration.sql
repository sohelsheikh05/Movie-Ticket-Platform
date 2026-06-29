/*
  Warnings:

  - A unique constraint covering the columns `[name,language]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Movie_name_language_key` ON `Movie`(`name`, `language`);
