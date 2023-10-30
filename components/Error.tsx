"use client";
import { styles } from "@/utils/styles";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const Error = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className={`${styles.label}`}>
        Something went wrong! Please login with your admin account!
      </p>
      <div
        className={`${styles.button} bg-[#4a6eda] !w-[130px] !h-[38px] my-5`}
        onClick={handleLogout}
      >
        Log out
      </div>
    </div>
  );
};

export default Error;
