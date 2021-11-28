/*
  Warnings:

  - You are about to drop the `Button` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Button" DROP CONSTRAINT "Button_themeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_themeId_fkey";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "order" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Button";

-- DropTable
DROP TABLE "Theme";
