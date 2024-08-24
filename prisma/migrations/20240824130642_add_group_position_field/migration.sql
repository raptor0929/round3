/*
  Warnings:

  - Added the required column `groupPosition` to the `GroupMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "groupPosition" INTEGER NOT NULL;
