"use server";

import type { CookieOptions } from "@supabase/ssr";

import { cookies } from "next/headers";

import { createClient } from "~/lib/supabase/server";

export const getServerClient = async () => {
  const cookieStore = await cookies();
  return createClient({
    get: (name: string) => cookieStore.get(name),
    set: (opts: { name: string; value: string } & CookieOptions) => cookieStore.set(opts),
  });
};
