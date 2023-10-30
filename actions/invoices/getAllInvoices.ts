import prisma from "@/lib/prismaDb";
import { clerkClient } from "@clerk/nextjs";

export const getAllInvoices = async () => {
  try {
    const invoices: any = await prisma.orders.findMany({
      include: {
        prompt: true,
      },
    });

    for (const invoice of invoices) {
      const userId = invoice?.userId;
      if (userId) {
        const user = await clerkClient.users.getUser(userId);
        invoice.user = user;
      }
    }

    return invoices;
  } catch (error) {
    console.log(error);
  }
};
