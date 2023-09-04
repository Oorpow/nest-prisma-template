/*
  Warnings:

  - You are about to alter the column `assignedAt` on the `CategoriesOnPosts` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CategoriesOnPosts` MODIFY `assignedAt` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `content`,
    ADD COLUMN `created_at` DATETIME NOT NULL DEFAULT NOW(),
    ADD COLUMN `updated_at` DATETIME NOT NULL DEFAULT NOW();

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
