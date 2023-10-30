'use server';
import { clerkClient } from "@clerk/nextjs";

interface MonthData {
  month: string;
  count: number;
}

export async function generateLast12MonthsUserData(): Promise<{
  last12Months: MonthData[];
}> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );

    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
   
    // Fetch all users from Clerk
    const allUsers = await clerkClient.users.getUserList();

    // Filter users based on the created date
    const users = allUsers.filter((user) => {
      const createdAt = new Date(user.createdAt);
      return createdAt >= startDate && createdAt < endDate;
    });

    const count = users.length;

    last12Months.push({ month: monthYear, count });
  }
  return { last12Months };
}
