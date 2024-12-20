import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Create Account - POE2 Tools",
    description:
      "Create your POE2 Tools account to start planning builds, calculating DPS, and more.",
  };
}
