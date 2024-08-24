/*
  Warnings:

  - You are about to drop the column `paymentContractAddress` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `paymentPool` on the `Group` table. All the data in the column will be lost.
  - Added the required column `groupContractAddress` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "paymentContractAddress",
DROP COLUMN "paymentPool",
ADD COLUMN     "groupContractAddress" TEXT NOT NULL;
