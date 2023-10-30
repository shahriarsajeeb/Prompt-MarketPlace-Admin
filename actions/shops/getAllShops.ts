import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/nextjs";

export const getAllShops = async () => {
  try {
    const shops:any = await prisma.shops.findMany();

    for (const shop of shops) {
      const userId = shop?.userId;

      if (userId) {
        const user = await clerkClient.users.getUser(userId);
        shop.user = user;
      }
    }

    return shops;
  } catch (error) {
    console.log(error);
  }
};
