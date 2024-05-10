"use client";
import React from "react";
import { Button } from "./ui/button";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

function Logout({ className }) {
  return (
    <Button
      variant="destructive"
      className={cn("w-full", className)}
      onClick={() => signOut()}
    >
      Logout
      <AiOutlineLogout className="ml-2  font-semibold text-black" />
    </Button>
  );
}

export default Logout;
