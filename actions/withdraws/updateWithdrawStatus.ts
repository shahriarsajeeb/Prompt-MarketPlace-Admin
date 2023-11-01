"use server";

import prisma from "@/lib/prismaDb";

export const updateWithDrawStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  try {
    const withdraw = await prisma.withdraws.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return withdraw;
  } catch (error) {
    console.log(error);
  }
};
