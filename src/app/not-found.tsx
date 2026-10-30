import type { Metadata } from "next";

import NotFoundClient from "./not-found-client";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found - POE2 Tools" },
  description:
    "The requested page could not be found. Browse our Path of Exile 2 tools including build planner, DPS calculator, and skill tree planner.",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
