import { Page } from "@/models/page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faSnapchat,
  faTelegram,
  faTiktok,
  faTwitter,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives";
import Image from "next/image";
import Link from "next/link";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
  linkedin: faLinkedin,
  twitter: faTwitter,
  snapchat: faSnapchat,
};

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}

export default async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });
  await Event.create({ uri: uri, page: uri, type: "view" });
  return (
    <div className="min-h-screen bg-blue-950 text-white">
      <div
        className="h-36 bg-gray-400 bg-cover bg-center"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="relative -top-16 mx-auto -mb-12 aspect-square h-36 w-36">
        <Image
          className="h-full w-full rounded-full object-cover"
          src={user.image}
          alt="avatar"
          width={256}
          height={256}
        />
      </div>
      <h2 className="mb-1 text-center text-2xl">{page.displayName}</h2>
      <h3 className="text-md flex items-center justify-center gap-2 text-white/70">
        <FontAwesomeIcon className="h-4" icon={faLocationDot} />
        <span>{page.location}</span>
      </h3>
      <div className="mx-auto my-2 max-w-xs text-center">
        <p>{page.bio}</p>
      </div>
      <div className="mt-4 flex justify-center gap-2 pb-4">
        {Object.keys(page.buttons).map((buttonKey) => (
          <Link
            key={buttonKey}
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
            className="flex items-center justify-center rounded-full bg-white p-2 text-blue-950"
          >
            <FontAwesomeIcon
              className="h-5 w-5"
              icon={buttonsIcons[buttonKey]}
            />
          </Link>
        ))}
      </div>
      <div className="mx-auto grid max-w-2xl gap-6 p-4 px-8 md:grid-cols-2">
        {page.links.map((link) => (
          <Link
            key={link.url}
            target="_blank"
            ping={
              process.env.URL +
              "api/click?url=" +
              btoa(link.url) +
              "&page=" +
              page.uri
            }
            className=" flex bg-indigo-800 p-2"
            href={link.url}
          >
            <div className="relative -left-4 w-16 overflow-hidden">
              <div className="relative flex  aspect-square h-16 w-16 items-center justify-center bg-blue-700">
                {link.icon && (
                  <Image
                    className="h-full w-full object-cover"
                    src={link.icon}
                    alt={"icon"}
                    width={64}
                    height={64}
                  />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={faLink} className="h-8 w-8" />
                )}
              </div>
            </div>
            <div className="flex shrink grow-0 items-center justify-center overflow-hidden">
              <div>
                <h3>{link.title}</h3>
                <p className="h-6 overflow-hidden text-white/50">
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
