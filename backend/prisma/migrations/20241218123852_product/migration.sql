-- DropForeignKey
ALTER TABLE "RentedProduct" DROP CONSTRAINT "RentedProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SoldProduct" DROP CONSTRAINT "SoldProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "RentedProduct" ADD CONSTRAINT "RentedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldProduct" ADD CONSTRAINT "SoldProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
