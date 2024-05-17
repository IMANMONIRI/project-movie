"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignoutButton() {
  const router = useRouter();
  const supabase = createClient();

  return (
    <button
      onClick={async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
          router.refresh();
        }
      }}
    >
      Sign out
    </button>
  );
}
