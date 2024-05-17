"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const navs = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "Movies", link: "/movies" },
    { id: 3, title: "About Us", link: "/about-us" },
  ];

  const pathname = usePathname();

  return (
    <div className="hidden sm:flex justify-center items-center gap-x-6 font-extrabold">
      {navs.map((nav) => (
        <Link
          className={pathname === nav.link ? "text-orange-500" : "text-white"}
          key={nav.id}
          href={nav.link}
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
}
