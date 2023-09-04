/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_phone_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `phone`,
    MODIFY `nickname` VARCHAR(191) NOT NULL DEFAULT '';
