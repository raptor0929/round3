/*
  Warnings:

  - You are about to drop the column `initialStakeTx` on the `GroupMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "initialStakeTx",
ADD COLUMN     "initialStakeTxHash" TEXT;
