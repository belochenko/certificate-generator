import { NextResponse } from "next/server";
import Blob from "@vercel/blob";

export async function GET() {
  try {
    const result = await Blob.list("templates/");
    const files = result.items.map((item) => item.url);

    return NextResponse.json({ images: files });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}
