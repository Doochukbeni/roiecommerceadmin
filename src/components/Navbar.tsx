import Link from "next/link";
import React from "react";
import { Icons } from "./Icon";
import Image from "next/image";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const Navbar = async () => {
  const session = await getAuthSession();
  if (!session?.user.id) {
    redirect("/sign-in");
  }
  const dbUser = await db.user.findUnique({
    where: { email: session.user.email! },
  });

  const stores = await db.store.findMany({
    where: { userId: dbUser?.id },
  });
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />

        {/* {searchbar} */}
        <div className="ml-auto flex items-center space-x-4">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;