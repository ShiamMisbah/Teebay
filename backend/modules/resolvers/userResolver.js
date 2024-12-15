import bcrypt from "bcrypt";
import prisma from "../../config/database.js";

const userResolvers = {
  Query: {
    getUser: async () => {
      return await prisma.user.findMany({ orderBy: { id: "desc" } });
    },
  },
  Mutation: {
    register: async (
      _,
      { firstName, lastName, address, email, phoneNumber, password }
    ) => {
      // Check if email is already taken
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email is already in use.");
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user in the database
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          address,
          email,
          phoneNumber: BigInt(phoneNumber),
          password: hashedPassword,
        },
      });

      return newUser;
    },

    // Login resolver
    login: async (_, { email, password }) => {
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Invalid email or password.");
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password.");
      }

      return user;
    },
  },
};

export default userResolvers;
