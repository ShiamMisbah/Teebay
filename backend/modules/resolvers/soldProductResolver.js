import prisma from "../../config/database.js";

const soldProductResolver = {
  Query: {
    getUserSoldProducts: async (_, { originalUserId }) => {
      return await prisma.soldProduct.findMany({
        where: { originalUserId },
        include: {product: true, originalUser: true, boughtUser: true },
      });
    },
    getUserBoughtProducts: async (_, { boughtUserId }) => {  
      const data = await prisma.soldProduct.findMany({
        where: { boughtUserId },
        include: {product: true, originalUser: true, boughtUser: true  },
      }); 
             
      return data
    },
  },
  Mutation: {
    createSoldProduct: async (_, { input }) => {

      try {
        const { dateSold, productId, originalUserId, boughtUserId } = input;

        // Validate required fields
        if (!dateSold || !productId || !originalUserId || !boughtUserId) {
          throw new Error("All fields are required to create a product sell.");
        }

        const newProductSold = await prisma.soldProduct.create({
          data: {
            dateSold,
            productId,
            originalUserId,
            boughtUserId,
          },
          include: { product: true, originalUser: true, boughtUser: true },
        });

        // Change Product Status to Rent
        // Validate rentOption if provided
        const validStatusOptions = ["POSTED", "SOLD", "RENTED"]; // Ensure this aligns with your Prisma enum

        const productStatus = "SOLD";
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

        return newProductSold;
      } catch (error) {
        console.error("Error creating product:", error.message);
        throw new Error("Failed to create product. Please try again.");
      }
    },
  },
};

export default soldProductResolver;
