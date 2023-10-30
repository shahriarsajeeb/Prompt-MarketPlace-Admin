'use client'
import React, { useState } from "react";
import AdminSidebar from "@/components/Admin/sidebar/AdminSidebar";

type Props = {
  activeItem: string;
};

export default function Sidebar({ activeItem }: Props) {
  const [selected, setSelected] = useState(activeItem);
  return (
    <div>
        <AdminSidebar selected={selected} setSelected={setSelected} />
    </div>
  );
}
