import prisma from "../../config/database.js";

const soldProductResolver = {
    Query: {
        getSoldProducts: async () => {
        return await prisma.soldProduct.findMany({
            include: { product: true, originalUser: true, rentedUser: true },
        });
        },
        getSoldProductById: async (_, { id }) => {
        return await prisma.soldProduct.findUnique({
            where: { id },
            include: { product: true, originalUser: true, rentedUser: true },
        });
        },
        getUserSoldPostProducts: async (_, { originalUserId }) => {
        return await prisma.soldProduct.findMany({
            where: { originalUserId },
            include: { product: true },
        });
        },
        getUserSoldProducts: async (_, { boughtUserId }) => {
        return await prisma.soldProduct.findMany({
            where: { boughtUserId },
            include: { product: true },
        });
        },
    },
    Mutation: {
        createSoldProduct: async (_, { input }) => {
        console.log("ashche");

        try {
          const { dateSold, productId, originalUserId, boughtUserId } = input;

          // Validate required fields
          if (!dateSold || !productId || !originalUserId || !boughtUserId) {
            throw new Error(
              "All fields are required to create a product sell."
            );
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
