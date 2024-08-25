/*
  Warnings:

  - The values [USDT] on the enum `Web3Token` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Web3Token_new" AS ENUM ('BTC', 'SOL', 'USDC');
ALTER TABLE "groups" ALTER COLUMN "token" DROP DEFAULT;
ALTER TABLE "groups" ALTER COLUMN "token" TYPE "Web3Token_new" USING ("token"::text::"Web3Token_new");
ALTER TYPE "Web3Token" RENAME TO "Web3Token_old";
ALTER TYPE "Web3Token_new" RENAME TO "Web3Token";
DROP TYPE "Web3Token_old";
ALTER TABLE "groups" ALTER COLUMN "token" SET DEFAULT 'USDC';
COMMIT;
