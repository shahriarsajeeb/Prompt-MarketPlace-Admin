import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/nextjs";

export const getAllShops = async () => {
  try {
    const shops: any = await prisma.shops.findMany();

    for (const shop of shops) {
      const userId = shop?.userId;

      if (userId) {
        try {
          const user = await clerkClient.users.getUser(userId);
          shops.user = user;
        } catch (userError: any) {
          console.log(`User with ID ${userId} not found: ${userError.message}`);
          shops.user = null;
        }
      }
    }

    return shops;
  } catch (error) {
    console.log(error);
  }
};
