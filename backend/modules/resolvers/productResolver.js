import prisma from "../../config/database.js";

const productResolver = {
  Query: {
    getProducts: async () => {      
      return await prisma.product.findMany({
        include: { user: true },
        orderBy: { id: "desc" },
      });
    },
    getProductById: async (_, {id}) => {      
          return await prisma.product.findUnique({
        where: { id },
        include: { user: true },
      });
    },
    getUserProducts: async (_, {userID}) => {
        return await prisma.product.findMany({
          include: {user: true},
          orderBy: { id: "desc" },
          where: { userId: userID },
        });
    }
  },
  Mutation: {
    addProduct: async(_, {input}) => {
        try {
          const {
            title,
            category,
            description,
            price,
            rent,
            rentOption,
            userId,
          } = input;

          // Validate required fields
          if (
            !title ||
            !category ||
            !description ||
            !price ||
            !rent ||
            !rentOption ||
            !userId
          ) {
            throw new Error("All fields are required to create a product.");
          }

          // Validate category is an array
          if (!Array.isArray(category)) {
            throw new Error("Category must be an array of strings.");
          }

          // Validate rentOption against allowed values
          const validRentOptions = ["DAILY", "WEEKLY", "MONTHLY"]; // Ensure this aligns with your Prisma enum
          if (!validRentOptions.includes(rentOption)) {
            throw new Error(
              `Invalid rent option. Valid options are: ${validRentOptions.join(
                ", "
              )}`
            );
          }

          const newProduct = await prisma.product.create({
            data: {
              title,
              category,
              description,
              price : Number(price),
              rent : Number(rent),
              rentOption,
              userId,
            },
          });
          return newProduct;
        } catch (error) {
          console.error("Error creating product:", error.message);
          throw new Error("Failed to create product. Please try again.");
        }
      
    },

    updateProduct: async (_, { id, input }) => {
        try {
            const {
            title,
            category,
            description,
            price,
            rent,
            rentOption,
            } = input;

            // Validate required fields
            if (!id) {
            throw new Error("Product ID is required for updating.");
            }

            // Check if the product exists
            const existingProduct = await prisma.product.findUnique({
            where: { id },
            });
            if (!existingProduct) {
            throw new Error("Product not found.");
            }

            // Validate category if provided
            if (category && !Array.isArray(category)) {
            throw new Error("Category must be an array of strings.");
            }

            // Validate rentOption if provided
            const validRentOptions = ["DAILY", "WEEKLY", "MONTHLY"]; // Ensure this aligns with your Prisma enum
            if (rentOption && !validRentOptions.includes(rentOption)) {
            throw new Error(
                `Invalid rent option. Valid options are: ${validRentOptions.join(", ")}`
            );
            }

            // Update the product
            const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(category && { category }),
                ...(description && { description }),
                ...(price && { price }),
                ...(rent && { rent }),
                ...(rentOption && { rentOption }),
            },
            });

            return updatedProduct;
        } catch (error) {
            console.error("Error updating product:", error.message);
            throw new Error("Failed to update product. Please try again.");
        }
    },
    updateProductStatus: async (_, {id, productStatus}) => {
      try {
        // Validate required fields
        if (!id) {
          throw new Error("Product ID is required for updating.");
        }
        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({
          where: { id },
        });
        if (!existingProduct) {
          throw new Error("Product not found.");
        }
        // Validate rentOption if provided
        const validStatusOptions = ["POSTED", "SOLD", "RENTED"]; // Ensure this aligns with your Prisma enum
        if (productStatus && !validStatusOptions.includes(productStatus)) {
          throw new Error(
            `Invalid status option. Valid options are: ${validStatusOptions.join(
              ", "
            )}`
          );
        }
        // Update the product
        const updatedProduct = await prisma.product.update({
          where: { id },
          data: {
            ...(productStatus && { productStatus }),
          },
        });

        return updatedProduct;
      } catch (error) {
        console.error("Error updating product:", error.message);
        throw new Error("Failed to update product. Please try again.");
      }
    },
    deleteProduct: async (_, { id }) => {
        try {
            // Check if the product exists
            const product = await prisma.product.findUnique({
            where: { id },
            });

            if (!product) {
            throw new Error(`Product with ID ${id} not found`);
            }

            // Delete the product
            await prisma.product.delete({
            where: { id },
            });

            return {
            success: true,
            message: `Product with ID ${id} successfully deleted`,
            };
        } catch (error) {
            return {
            success: false,
            message: error.message,
            };
        }
    },


  },
};

export default productResolver