"use server";
import prisma from "@/lib/prismaDb";
export async function updatePromptStatus({
  promptId,
  status,
}: {
  promptId: string;
  status: "Pending" | "Live" | "Declined";
}) {
  try {
    const prompt = await prisma.prompts.update({
      where: {
        id: promptId,
      },
      data: {
        status: status,
      },
    });
    const shop = await prisma.shops.findUnique({
      where: {
        userId: prompt.sellerId,
      },
    });

    if (shop) {
      await prisma.shops.update({
        where: {
          userId: prompt.sellerId,
        },
        data: {
          allProducts:
            prompt?.status === "Declined"
              ? shop.allProducts - 1
              : shop.allProducts + 1,
        },
      });
    }

    return prompt;
  } catch (error) {
    console.log("update prompt error", error);
  }
}





