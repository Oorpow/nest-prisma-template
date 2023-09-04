/*
  Warnings:

  - You are about to alter the column `assignedAt` on the `CategoriesOnPosts` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `CategoriesOnPosts` MODIFY `assignedAt` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `Post` MODIFY `created_at` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_at` DATETIME(3) NOT NULL;
