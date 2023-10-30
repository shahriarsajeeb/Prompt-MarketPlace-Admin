import { currentUser,User } from "@clerk/nextjs/server";


export const useIsAdmin = async () => {
    const user: User | null = await currentUser();
    if(user && user?.emailAddresses.find((i) => i.emailAddress === process.env.ADMIN_EMAIL)){
        return true;
    } else{
        return false;
    }
}