/*
  Warnings:

  - You are about to alter the column `assignedAt` on the `CategoriesOnPosts` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `CategoriesOnPosts` MODIFY `assignedAt` DATETIME NOT NULL DEFAULT NOW();
