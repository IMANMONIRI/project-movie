import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const {
      data: { user },
      error
    } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id);
      if (!error && !users?.length) {
        const { data, error } = await supabase
          .from("users")
          .insert([{ id:user?.id,email:user?.email,name:user?.user_metadata?.full_name,img:user?.user_metadata?.picture }])
          .select();
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
