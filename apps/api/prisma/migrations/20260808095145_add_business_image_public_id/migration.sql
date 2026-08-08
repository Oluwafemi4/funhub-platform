/*
  Warnings:

  - Added the required column `publicId` to the `BusinessImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessImage" ADD COLUMN     "publicId" TEXT NOT NULL;
