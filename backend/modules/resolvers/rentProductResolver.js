import prisma from "../../config/database.js";

const rentProductResolver = {
  Query: {
    getUserRentedProducts: async (_, { originalUserId }) => {
      return await prisma.rentedProduct.findMany({
        where: { originalUserId },
        include: {product: true, originalUser: true, rentedUser: true },
      });
    },
    getUserBorrowedProducts: async (_, { rentedUserId }) => {
      return await prisma.rentedProduct.findMany({
        where: { rentedUserId },
        include: {product: true, originalUser: true, rentedUser: true },
      });
    },
  },
  Mutation: {
    createRentedProduct: async (_, { input }) => {
      try {
        const { dateStart, dateEnd, productId, originalUserId, rentedUserId } =
          input;

        // Validate required fields
        if (
          !dateStart ||
          !dateEnd ||
          !productId ||
          !originalUserId ||
          !rentedUserId
        ) {
          throw new Error("All fields are required to create a product rent.");
        }

        const newProductRent = await prisma.rentedProduct.create({
          data: {
            dateStart,
            dateEnd,
            productId,
            originalUserId,
            rentedUserId,
          },
          include: { product: true, originalUser: true, rentedUser: true },
        });

        // Change Product Status to Rent
        // Validate rentOption if provided
        const validStatusOptions = ["POSTED", "SOLD", "RENTED"]; // Ensure this aligns with your Prisma enum

        const productStatus = "RENTED";
        if (productStatus && !validStatusOptions.includes(productStatus)) {
          throw new Error(
            `Invalid status option. Valid options are: ${validStatusOptions.join(
              ", "
            )}`
          );
        }
        // Update the product
        await prisma.product.update({
          where: { id: productId },
          data: { productStatus: productStatus },
        });

        return newProductRent;
      } catch (error) {
        console.error("Error creating product:", error.message);
        throw new Error("Failed to create product. Please try again.");
      }
    },
  },
};

export default rentProductResolver