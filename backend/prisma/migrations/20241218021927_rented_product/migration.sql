/*
  Warnings:

  - You are about to drop the column `rentOption` on the `RentedProduct` table. All the data in the column will be lost.
  - You are about to drop the column `rentPrice` on the `RentedProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentedProduct" DROP COLUMN "rentOption",
DROP COLUMN "rentPrice",
ALTER COLUMN "dateStart" SET DATA TYPE TEXT,
ALTER COLUMN "dateEnd" SET DATA TYPE TEXT;
