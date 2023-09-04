/*
  Warnings:

  - You are about to alter the column `assigned_at` on the `CategoriesOnPosts` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `CategoriesOnPosts` DROP FOREIGN KEY `CategoriesOnPosts_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `CategoriesOnPosts` DROP FOREIGN KEY `CategoriesOnPosts_postId_fkey`;

-- AlterTable
ALTER TABLE `CategoriesOnPosts` MODIFY `assigned_at` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `Post` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW();

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
