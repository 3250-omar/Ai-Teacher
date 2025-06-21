import Image from "next/image";
import Link from "next/link";
import NavBarItems from "./NavBarItems";

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
        <Link href="/sign-in">Sign In</Link>
      </ul>
    </nav>
  );
};

export default NavBar;
