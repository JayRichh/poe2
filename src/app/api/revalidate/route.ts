import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json();

    if (!tag) {
      return NextResponse.json({ message: "Missing tag parameter" }, { status: 400 });
    }

    // Revalidate the cache for the specified tag
    revalidateTag(tag);

    return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating", error }, { status: 500 });
  }
}
