import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { FaRegUserCircle, FaSignInAlt } from "react-icons/fa";
import Link from "next/link"
import { createClient } from '@/utils/supabase/server'
import SignoutButton from "./signoutButton"

export default async function UserIcon() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <FaRegUserCircle className="text-2xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-bold" align="end">
        {data?.user ? (
            <>
              <DropdownMenuItem>
                {data?.user?.email}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignoutButton />
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>
              <Link className="flex items-center gap-x-2" href="/signup-login">
                <FaSignInAlt className="text-gray-400 mt-0.5" />
                SignUp/Login
              </Link>
            </DropdownMenuItem>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
