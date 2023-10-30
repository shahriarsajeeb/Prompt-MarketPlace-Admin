import prisma from "@/lib/prismaDb";
export async function GetPrompts() {
  try {
    const prompts = await prisma.prompts.findMany({
      include: {
        orders: true,
      },
    });
    
    return prompts;
  } catch (error) {
    console.log("get prompts error", error);
  }
}
