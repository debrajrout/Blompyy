"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { IoSave } from "react-icons/io5";
import { savePageSettings } from "@/actions/pageActions";
import { toast } from "sonner";
import RadioTogglers from "./radioTogglers";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { upload } from "../lib/upload";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);
  async function saveBaseSettings(formData) {
    const res = await savePageSettings(formData);
    if (res) {
      toast.success(
        `Hey ${formData.get("displayName")} your imformation updated`,
      );
    } else {
      toast.error("something went wrong");
    }
  }

  async function handleCoverImageChange(ev) {
    await upload(ev, (link) => {
      setBgImage(link);
    });
  }
  async function handleAvatarImageChange(ev) {
    await upload(ev, (link) => {
      setAvatar(link);
    });
  }
  return (
    <div>
      <form action={saveBaseSettings}>
        <div
          className="flex items-center justify-center bg-cover bg-center py-16 "
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div>
            <RadioTogglers
              defaultValue={page.bgType}
              options={[
                { value: "color", label: "Color" },
                { value: "image", label: "Image" },
              ]}
              onChange={(val) => setBgType(val)}
            />
            {bgType === "color" && (
              <div className="mt-2 w-full bg-gray-200/50 p-2 text-gray-700 shadow ">
                <div className="flex justify-center gap-2">
                  <span>Background color:</span>
                  <input
                    type="color"
                    name="bgColor"
                    onChange={(ev) => setBgColor(ev.target.value)}
                    defaultValue={page.bgColor}
                  />
                </div>
              </div>
            )}
            {bgType === "image" && (
              <div className="flex justify-center">
                <label className="mt-2 flex gap-2 bg-white px-4 py-2 shadow">
                  <input type="hidden" name="bgImage" value={bgImage} />
                  <input
                    type="file"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                  <div className="flex cursor-pointer items-center gap-2">
                    <FaCloudUploadAlt className="text-lg" />
                    <span>Change image</span>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="-mb-12 flex justify-center ">
          <div className="relative -top-8 h-[128px] w-[128px]">
            <div className="h-full overflow-hidden rounded-full border-4 border-white shadow shadow-black/50">
              {" "}
              <Image
                className="h-full w-full object-cover"
                src={avatar}
                alt="user profile"
                width={128}
                height={128}
              />
            </div>

            <label
              htmlFor="avatarIn"
              className="absolute bottom-0 right-3 flex gap-1 rounded-full  bg-white p-1 shadow shadow-black/50"
            >
              <CiEdit className="text-lg " />
              <input
                onChange={handleAvatarImageChange}
                type="file"
                id="avatarIn"
                className="hidden "
              />
              <input type="hidden" name="avatar" value={avatar} />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="group relative z-0 mb-5 w-full px-2">
            <input
              type="text"
              id="nameIn"
              name="displayName"
              defaultValue={page.displayName}
              placeholder=""
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
            <label
              htmlFor="nameIn"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Display name
            </label>
          </div>
          <div className="group relative z-0 mb-5 w-full px-2 ">
            <input
              type="text"
              id="locationIn"
              name="location"
              defaultValue={page.location}
              placeholder=""
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
            <label
              htmlFor="locationIn"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              Location
            </label>
          </div>
          <div>
            <label
              htmlFor="bioIn"
              className="mb-2 ml-1 block font-serif text-base  font-semibold text-gray-500 dark:text-white"
            >
              Something about you
            </label>
            <textarea
              name="bio"
              id="bioIn"
              defaultValue={page.bio}
              rows="4"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Your bio..."
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-1/3 rounded-md bg-blue-500 px-4 py-2 text-base text-white hover:bg-blue-600"
          >
            <div className="flex flex-row content-center justify-center">
              <IoSave className=" mr-1 mt-0.5 " />
              Save
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}
