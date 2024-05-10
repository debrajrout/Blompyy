"use client";

import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { FaBiking } from "react-icons/fa";
import grabUsername from "@/actions/grabUsername";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
export default function UserNameForm({ desiredUsername }) {
  const router = useRouter();
  async function handleSubmit(formData) {
    const result = await grabUsername(formData);
    if (result === false) {
      toast.error("Username already taken");
    } else {
      toast.success("Username claimed");
      router.push("/account?created=" + formData.get("username"));
    }

    console.log(result);
  }

  return (
    <form className="mx-auto w-2/3" action={handleSubmit}>
      <input
        className="mx-auto mb-4 w-full rounded-md border-2 border-gray-300 p-2 text-center focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
        type="text"
        defaultValue={desiredUsername}
        placeholder="username"
        name="username"
      />

      <DrawerClose className="w-full">
        <Button
          className=" flex w-full  gap-2 p-2   "
          variant="default"
          type="submit"
        >
          Clam your username
          <FaBiking className="h-4 w-4" />
        </Button>
      </DrawerClose>
    </form>
  );
}
