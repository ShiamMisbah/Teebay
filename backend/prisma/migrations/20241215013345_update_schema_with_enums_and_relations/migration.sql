-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPROTING_GOODS', 'OUTDOOR', 'TOYS');

-- CreateEnum
CREATE TYPE "RentOption" AS ENUM ('PER_HOUR', 'PER_DAY', 'PER_MONTH', 'PER_YEAR');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('POSTED', 'RENTED', 'SOLD');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "decription" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rent" INTEGER NOT NULL,
    "rentOption" "RentOption" NOT NULL,
    "datePosted" TIMESTAMP(3) NOT NULL,
    "productStatus" "ProductStatus" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentedProduct" (
    "id" SERIAL NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "rentOption" "RentOption" NOT NULL,
    "rentPRice" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "originalUserId" INTEGER NOT NULL,
    "rentedUserId" INTEGER,

    CONSTRAINT "RentedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoldProduct" (
    "id" SERIAL NOT NULL,
    "sellingPrice" INTEGER NOT NULL,
    "dateSold" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "originalUserId" INTEGER NOT NULL,
    "boughtUserId" INTEGER,

    CONSTRAINT "SoldProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedProduct" ADD CONSTRAINT "RentedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedProduct" ADD CONSTRAINT "RentedProduct_originalUserId_fkey" FOREIGN KEY ("originalUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedProduct" ADD CONSTRAINT "RentedProduct_rentedUserId_fkey" FOREIGN KEY ("rentedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldProduct" ADD CONSTRAINT "SoldProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldProduct" ADD CONSTRAINT "SoldProduct_originalUserId_fkey" FOREIGN KEY ("originalUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldProduct" ADD CONSTRAINT "SoldProduct_boughtUserId_fkey" FOREIGN KEY ("boughtUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
