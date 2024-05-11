"use client";

import React from "react";
import { Button } from "./ui/button";
import { ReactSortable } from "react-sortablejs";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faInstagramSquare,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
  faSnapchat,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGripLines,
  faMobile,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { savePageButtons } from "@/actions/pageActions";
import { toast } from "sonner";
import { IoSave } from "react-icons/io5";
import { Separator } from "./ui/separator";

export default function PageButtonForm({ user, page }) {
  const button = [
    {
      key: "email",
      label: "e-mail",
      icon: faEnvelope,
      placeholder: "test@example.com",
    },
    {
      key: "mobile",
      label: "mobile",
      icon: faMobile,
      placeholder: "+91 8260836532",
    },
    {
      key: "instagram",
      label: "instagram",
      icon: faInstagram,
      placeholder: "https://facebook.com/profile/...",
    },
    { key: "facebook", label: "facebook", icon: faFacebook },
    { key: "discord", label: "discord", icon: faDiscord },
    { key: "twitter", label: "twitter", icon: faTwitter },
    { key: "linkedin", label: "linkedin", icon: faLinkedin },
    { key: "snapchat", label: "snapchat", icon: faSnapchat },
    { key: "youtube", label: "youtube", icon: faYoutube },
    { key: "whatsapp", label: "whatsapp", icon: faWhatsapp },
    { key: "github", label: "github", icon: faGithub },
    { key: "telegram", label: "telegram", icon: faTelegram },
  ];

  const pageSavedButtonsKeys = Object.keys(page.buttons || {});
  const pageSavedButtonsInfo = pageSavedButtonsKeys.map((k) =>
    button.find((b) => b.key === k),
  );

  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  function upperFirst(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  function addButtonToProfile(button) {
    setActiveButtons((prevButtons) => {
      return [...prevButtons, button];
    });
  }

  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success("Buttons saved");
  }

  const availableButtons = button.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key),
  );

  function removeButton({ key: keyToRemove }) {
    setActiveButtons((prevButtons) => {
      return prevButtons.filter((button) => button.key !== keyToRemove);
    });
  }
  return (
    <div className="  w-full rounded-lg bg-slate-300 p-4">
      <form action={saveButtons}>
        <h2 className="mb-6 text-2xl font-bold">Buttons</h2>
        <ReactSortable
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 items-center  md:flex">
              <div className=" flex h-full w-44 items-center gap-2 p-2 text-gray-700">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className=" handle cursor-pointer p-2 text-gray-400"
                />
                <FontAwesomeIcon icon={b.icon} />
                <span>{upperFirst(b.label)}:</span>
              </div>
              <div className="flex  grow ">
                <input
                  className="w-1/2 rounded-md px-2 py-1 shadow-sm hover:shadow-black/50"
                  placeholder={b.placeholder}
                  name={b.key}
                  defaultValue={
                    page.buttons && page.buttons[b.key]
                      ? page.buttons[b.key]
                      : ""
                  }
                  type="text"
                  style={{ marginBottom: "0" }}
                />
                <button
                  onClick={() => removeButton(b)}
                  type="button"
                  className="cursor-pointer bg-gray-300  px-4 py-2"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>

        <h3 className="text-lg font-semibold">Add a button</h3>
        <div className="flex flex-wrap gap-2">
          {availableButtons.map((b) => (
            <Button
              onClick={() => addButtonToProfile(b)}
              key={b.key}
              className="flex items-center gap-1 bg-gray-600 p-2 shadow-md shadow-black/50"
            >
              <FontAwesomeIcon icon={b.icon} />
              <span>
                {b.label.slice(0, 1).toUpperCase() + b.label.slice(1)}
              </span>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          ))}
        </div>
        <Separator className="mt-6 h-[2px] bg-black/30" />
        <div className="mt-6 flex justify-center">
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
