import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/nextjs";

export const getAllInvoices = async () => {
  try {
    const invoices: any = await prisma.orders.findMany({
      include: {
        prompt: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    for (const invoice of invoices) {
      const userId = invoice?.userId;
      if (userId) {
        try {
          const user = await clerkClient.users.getUser(userId);
          invoice.user = user;
        } catch (userError: any) {
          console.log(`User with ID ${userId} not found: ${userError.message}`);
          invoice.user = null;
        }
      }
    }

    return invoices;
  } catch (error) {
    console.log(error);
  }
};
