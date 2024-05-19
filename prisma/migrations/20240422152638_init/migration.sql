/*
  Warnings:

  - You are about to drop the column `sentTo` on the `Recipient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "sentTo",
ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
