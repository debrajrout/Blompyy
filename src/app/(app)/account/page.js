import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import UserNameForm from "@/components/user-name-form";
import { FaArrowRightLong } from "react-icons/fa6";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/page";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/pageSettingsForm";
import PageButtonForm from "@/components/PageButtonForm";
import cloneDeep from "clone-deep";
import PageLinkForm from "@/components/PageLinkForm";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    redirect("/");
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session?.user?.email });
  const leanPage = cloneDeep(page.toJSON());
  leanPage._id = leanPage._id.toString();

  if (page) {
    return (
      <>
        <PageSettingsForm page={leanPage} user={session.user} />
        <div className="mt-8 w-full">
          <PageButtonForm page={leanPage} user={session.user} />
        </div>
        <div className="mt-8 w-full  rounded-lg bg-slate-300 p-4">
          <PageLinkForm page={leanPage} user={session.user} />
        </div>
      </>
    );
  }
  return (
    <section className="contr container mt-4  h-[90vh] max-w-4xl  justify-center  pt-4">
      <h1 className="text-center text-3xl font-semibold">
        Collect your username
      </h1>
      <div className="mx-auto flex justify-center p-2 ">
        <Drawer>
          <DrawerTrigger>
            <div className=" flex-row-1 mt-4 flex w-full  gap-2 rounded-sm bg-secondary px-6 py-2 outline-double outline-offset-2 outline-sky-300">
              <span className="">Procide</span>
              <FaArrowRightLong className="mt-[3px]  " />
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <UserNameForm desiredUsername={desiredUsername} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
