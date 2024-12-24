import { type Metadata } from "next";

import { ascendanciesWithMeta } from "~/lib/ascendancies/data";

export const metadata: Metadata = {
  title: "POE2 Ascendancy Classes | Path of Exile 2 Class Guide",
  description:
    "Comprehensive guide to Path of Exile 2 ascendancy classes. Learn about each class's unique abilities, playstyles, and build options.",
  keywords: [
    "POE2 ascendancy classes",
    "Path of Exile 2 classes",
    ...ascendanciesWithMeta.flatMap((asc) => [
      `POE2 ${asc.title}`,
      `Path of Exile 2 ${asc.title}`,
      ...asc.buildTypes.map((build) => `POE2 ${build}`),
      ...asc.mechanics.map((mech) => `POE2 ${mech}`),
      ...asc.keyFeatures.map((feat) => `POE2 ${feat}`),
    ]),
  ].join(", "),
  openGraph: {
    images: ["/ascendancies/acolyte.webp"],
    type: "website",
    description:
      "Explore all ascendancy classes in Path of Exile 2. Find detailed information about playstyles, key features, and optimal builds.",
    siteName: "POE2 Tools",
  },
  alternates: {
    canonical: "https://poe2.dev/ascendancies",
  },
  category: "Game Guide",
};
