-- CreateEnum
CREATE TYPE "GroupStatus" AS ENUM ('ACTIVE', 'PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "GroupMemberRole" AS ENUM ('MEMBER', 'ADMIN');

-- CreateEnum
CREATE TYPE "PaymentFrequency" AS ENUM ('WEEKLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "maximumMembers" INTEGER NOT NULL,
    "fundingAmount" DOUBLE PRECISION NOT NULL,
    "nextPaymentDate" TIMESTAMP(3) NOT NULL,
    "paymentFrequency" "PaymentFrequency" NOT NULL DEFAULT 'MONTHLY',
    "public" BOOLEAN NOT NULL DEFAULT false,
    "status" "GroupStatus" NOT NULL DEFAULT 'PENDING',
    "startDate" TIMESTAMP(3) NOT NULL,
    "nextPayeeId" INTEGER,
    "paymentPool" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "paymentContractAddress" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "role" "GroupMemberRole" NOT NULL DEFAULT 'MEMBER',
    "initialStakeTx" TEXT NOT NULL,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "groupMemberId" INTEGER NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_nextPayeeId_key" ON "Group"("nextPayeeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_nextPayeeId_fkey" FOREIGN KEY ("nextPayeeId") REFERENCES "GroupMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_groupMemberId_fkey" FOREIGN KEY ("groupMemberId") REFERENCES "GroupMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
