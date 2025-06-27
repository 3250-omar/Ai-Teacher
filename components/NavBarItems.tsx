"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  {
    label: "Companions",
    href: "/companion",
  },
  {
    label: "My Journey",
    href: "/my-journy",
  },
];

const NavBarItems = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex items-center gap-4">
      {items.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={cn(pathname === item.href && "textPrimary font-bold")}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBarItems;
