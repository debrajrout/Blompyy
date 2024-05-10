"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function HeroForm({ user }) {
  const router = useRouter();
  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector("input");
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push("/account?desiredUsername=" + username);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Username</Label>
          <Input id="name" placeholder="linklist.to/username" type="text" />
        </div>
      </div>
      <Button className="w-full" type="submit">
        <Check className="mr-2 h-4 w-4" /> Join for free
      </Button>
    </form>
  );
}
