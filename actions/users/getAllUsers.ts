import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/nextjs";

export const getAllUsers = async () => {
  try {
    const users:any = await clerkClient.users.getUserList();

    for(const user of users){
      const orders:any = await prisma.orders.findMany({
        where:{
          userId: user?.id,
        },
      });
      user.orders = orders.length;
    }

    return users;
  } catch (error) {
    console.log(error);
  }
};
