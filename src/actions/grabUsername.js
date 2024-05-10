"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function grabUsername(formData) {
  mongoose.connect(process.env.MONGO_URI);
  const username = formData.get("username");

  const existingPage = await Page.findOne({ uri: username });
  if (existingPage) {
    return false;
  } else {
    const session = await getServerSession(authOptions);
    return await Page.create({ uri: username, owner: session?.user?.email });
  }
}
