"use client";
import Image from "next/image";
import Link from "next/link";
import NavBarItems from "./NavBarItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
        </div>
      </Link> 
      <ul className="flex items-center gap-8 ">
        <NavBarItems />
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </ul>
    </nav>
  );
};

export default NavBar;
