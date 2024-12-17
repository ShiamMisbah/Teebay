/*
  Warnings:

  - The `productStatus` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `rentOption` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rentOption` on the `RentedProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "rentOption",
ADD COLUMN     "rentOption" TEXT NOT NULL,
DROP COLUMN "productStatus",
ADD COLUMN     "productStatus" TEXT NOT NULL DEFAULT 'POSTED';

-- AlterTable
ALTER TABLE "RentedProduct" DROP COLUMN "rentOption",
ADD COLUMN     "rentOption" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ProductStatus";

-- DropEnum
DROP TYPE "RentOption";
