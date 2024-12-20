import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createMiddlewareClient } from "~/lib/supabase/actions";

export async function DELETE(request: NextRequest) {
  const response = new NextResponse();
  const supabase = createMiddlewareClient(request, response);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete builds and related data
    const { error: buildsError } = await supabase.from("builds").delete().eq("user_id", user.id);

    if (buildsError) throw buildsError;

    // Delete equipment
    const { error: equipmentError } = await supabase
      .from("equipment")
      .delete()
      .eq("user_id", user.id);

    if (equipmentError) throw equipmentError;

    // Delete skill gems
    const { error: skillGemsError } = await supabase
      .from("skill_gems")
      .delete()
      .eq("user_id", user.id);

    if (skillGemsError) throw skillGemsError;

    // Delete build configs
    const { error: buildConfigsError } = await supabase
      .from("build_configs")
      .delete()
      .eq("user_id", user.id);

    if (buildConfigsError) throw buildConfigsError;

    // Delete profile (which will trigger auth.users deletion via our function)
    const { error: profileError } = await supabase.from("profiles").delete().eq("id", user.id);

    if (profileError) throw profileError;

    // Copy cookies from the middleware client response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        response.headers.set(key, value);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
