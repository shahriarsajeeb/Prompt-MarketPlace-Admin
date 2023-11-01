"use server";

import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/nextjs/server";

export const getAllWithdraws = async () => {
  try {
    const withdraws: any = await prisma.withdraws.findMany({
      include: {
        shop: {
          include: {
            bank: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    for (const withdraw of withdraws) {
      const userId = withdraw.shop.userId;

      const user = await clerkClient.users.getUser(userId);
      withdraw.shop.emailAddress = user.emailAddresses[0].emailAddress;
    }

    return withdraws;
  } catch (error) {
    console.log(error);
  }
};
