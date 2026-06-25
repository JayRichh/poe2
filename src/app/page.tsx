import dynamic from "next/dynamic";

import { Container } from "~/components/ui/Container";

import { HeroSectionWrapper } from "~/components/home/HeroSectionWrapper";
import { ScrollToTopButton } from "~/components/home/ScrollToTopButton";

// Heavy / animation-laden sections are lazy client islands so framer-motion and
// @nivo stay out of the initial home bundle. The page shell itself is a server
// component; only the interactive bits hydrate.
const sectionFallback = <div className="w-full h-[320px] animate-pulse rounded-xl bg-card/40" />;

const UpdateTimeline = dynamic(
  () => import("~/components/home/UpdateTimeline").then((m) => m.UpdateTimeline),
  { loading: () => sectionFallback }
);
const ItemsSection = dynamic(
  () => import("~/components/home/ItemsSection").then((m) => m.ItemsSection),
  { loading: () => sectionFallback }
);
const BuildsPreviewSection = dynamic(
  () => import("~/components/home/BuildsPreviewSection").then((m) => m.BuildsPreviewSection),
  { loading: () => sectionFallback }
);
const PatchNotesSection = dynamic(
  () => import("~/components/home/PatchNotesSection").then((m) => m.PatchNotesSection),
  { loading: () => sectionFallback }
);
const CalculatorsSection = dynamic(
  () => import("~/components/home/CalculatorsSection").then((m) => m.CalculatorsSection),
  { loading: () => sectionFallback }
);
const GameSystemsSection = dynamic(
  () => import("~/components/home/GameSystemsSection").then((m) => m.GameSystemsSection),
  { loading: () => sectionFallback }
);
const SkillTreeSection = dynamic(
  () => import("~/components/home/SkillTreeSection").then((m) => m.SkillTreeSection),
  { loading: () => sectionFallback }
);

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full relative min-h-screen">
      <section className="w-full pt-12 sm:pt-24 flex justify-center">
        <Container className="flex flex-col items-center text-center max-w-5xl">
          <HeroSectionWrapper />
        </Container>
      </section>

      <ScrollToTopButton />

      {/* Signature pivot: the update timeline leads the showcase. */}
      <UpdateTimeline />

      <section className="w-full pb-12 flex justify-center">
        <ItemsSection />
      </section>

      <section className="w-full py-6 flex justify-center">
        <BuildsPreviewSection />
      </section>

      <section className="w-full py-6 flex justify-center">
        <Container className="px-6 md:px-8 lg:px-10 max-w-7xl bg-opacity-100">
          <PatchNotesSection />
        </Container>
      </section>

      <section className="w-full py-6 flex justify-center">
        <Container className="px-6 md:px-8 lg:px-10 max-w-7xl">
          <CalculatorsSection />
        </Container>
      </section>

      <section className="w-full py-6">
        <Container className="px-6 md:px-8 lg:px-10 max-w-7xl">
          <GameSystemsSection />
        </Container>
      </section>

      <section className="w-full py-6">
        <Container className="px-6 md:px-8 lg:px-10 max-w-7xl">
          <SkillTreeSection />
        </Container>
      </section>
    </div>
  );
}
