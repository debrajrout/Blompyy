"use client";
import { savePageLinks } from "@/actions/pageActions";

import { upload } from "@/lib/upload";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ReactSortable } from "react-sortablejs";
import { Button } from "./ui/button";
import { IoSave } from "react-icons/io5";
import { Separator } from "./ui/separator";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);
  async function save() {
    await savePageLinks(links);
    toast.success("Buttons saved");
  }
  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }
  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, (uploadedImageUrl) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }
  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  }
  function removeLink(linkKeyToRemove) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((l) => l.key !== linkKeyToRemove),
    );
  }
  return (
    <div>
      <form action={save}>
        <h2 className=" mb-4 text-2xl font-bold">Links</h2>
        <div className="flex flex-col  ">
          <Button
            onClick={addNewLink}
            type="button"
            className="mx-auto  flex w-1/3 cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-lg text-white"
          >
            <FontAwesomeIcon
              className="aspect-square rounded-full bg-blue-500 p-1 text-white"
              icon={faPlus}
            />
            <span>Add new</span>
          </Button>
          <div className="px-4">
            <ReactSortable handle={".handle"} list={links} setList={setLinks}>
              {links.map((l) => (
                <div key={l.key} className="mt-8 items-center gap-6 md:flex">
                  <div className="handle">
                    <FontAwesomeIcon
                      className="mr-2 cursor-ns-resize text-gray-400"
                      icon={faGripLines}
                    />
                  </div>
                  <div className="text-center">
                    <div className="relative  inline-flex aspect-square h-16 w-16 items-center justify-center overflow-hidden bg-gray-300">
                      {l.icon && (
                        <Image
                          className="h-full w-full object-cover"
                          src={l.icon}
                          alt={"icon"}
                          width={64}
                          height={64}
                        />
                      )}
                      {!l.icon && <FontAwesomeIcon size="xl" icon={faLink} />}
                    </div>
                    <div>
                      <input
                        onChange={(ev) => handleUpload(ev, l.key)}
                        id={"icon" + l.key}
                        type="file"
                        className="hidden"
                      />
                      <label
                        htmlFor={"icon" + l.key}
                        className="mb-2 mt-2 flex cursor-pointer items-center justify-center gap-1 border p-2 text-gray-600"
                      >
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                        <span>Change icon</span>
                      </label>
                      <button
                        onClick={() => removeLink(l.key)}
                        type="button"
                        className="mb-2 flex h-full w-full items-center justify-center gap-2 bg-gray-300 px-3 py-2"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Remove this link</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex grow flex-col">
                    <label className="input-label">Title:</label>
                    <input
                      className="p-2"
                      value={l.title}
                      onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                      type="text"
                      placeholder="title"
                    />
                    <label className="input-label">Subtitle:</label>
                    <input
                      className="p-2"
                      value={l.subtitle}
                      onChange={(ev) => handleLinkChange(l.key, "subtitle", ev)}
                      type="text"
                      placeholder="subtitle (optional)"
                    />
                    <label className="input-label">URL:</label>
                    <input
                      className="p-2"
                      value={l.url}
                      onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                      type="text"
                      placeholder="url"
                    />
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
          <Separator className="mt-6 h-[2px] bg-black/30" />
          <Button
            type="submit"
            className="mx-auto my-3 w-1/3 rounded-md bg-blue-500 px-4 py-2 text-base text-white hover:bg-blue-600"
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
