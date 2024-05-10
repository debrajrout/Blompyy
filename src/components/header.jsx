import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCog } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logout from "./logout";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="container max-w-5xl border-[0.5] border-red-300 bg-background text-base  font-normal text-black">
      <div className="container flex max-w-3xl items-center justify-between py-4">
        <Link href="/">
          <Logo />
        </Link>
        <Link href="/">Pricing</Link>
        <Link href="/">Tech</Link>
        {session ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="shadow-md shadow-slate-900">
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className=" mb-1 p-1 text-center">
                <span className="text-sm  font-semibold">
                  Hi {session?.user?.name}
                </span>
                <Separator />
              </div>

              <Link
                href="/account"
                className="  mb-4 flex h-10 w-full  place-items-center justify-center gap-1 rounded-md   bg-green-600 text-sm text-white"
              >
                Profile
                <FaUserCog className="ml-1 " />
              </Link>

              <Logout />
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Button size="sm" variant="secondary">
              <Link href="/login"> Sign in</Link>
            </Button>
          </>
        )}
      </div>
      <Separator />
    </header>
  );
}
