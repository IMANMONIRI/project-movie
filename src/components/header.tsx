import Link from "next/link";
import Navbar from "./navbar";
import UserIcon from "./userIcon";

export default async function Header() {
  return (
    <div className="container w-full h-[10vh] flex justify-between items-center">
      <Link
        className="text-3xl bg-gradient-to-br from-orange-600 from-30% via-amber-600 to-orange-700 bg-clip-text text-transparent font-extrabold"
        href="/"
      >
        JUPITER
      </Link>
      <Navbar />
      <div>
        <UserIcon />
      </div>
    </div>
  );
}
