/*
  Warnings:

  - You are about to drop the column `initialStakeTxHash` on the `GroupMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "initialStakeTxHash";
