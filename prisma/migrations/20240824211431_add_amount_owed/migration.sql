/*
  Warnings:

  - Made the column `amountOwed` on table `groupmembers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "groupmembers" ALTER COLUMN "amountOwed" SET NOT NULL,
ALTER COLUMN "amountOwed" SET DEFAULT 0;
