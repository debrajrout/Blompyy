"use client";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginWithGoogle() {
  return (
    <Button
      onClick={() => signIn("google")}
      variant="outline"
      className="flex w-full items-center justify-center gap-3 bg-white p-6 text-center shadow"
    >
      <FcGoogle className="h-6 w-6" />
      <span className="text-sm font-normal">Sign In with Google</span>
    </Button>
  );
}
