"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { CalculatorsSection } from "~/components/home/CalculatorsSection";
import { FeaturesSection } from "~/components/home/FeaturesSection";
import { GameSystemsSection } from "~/components/home/GameSystemsSection";
import { HeroSection } from "~/components/home/HeroSection";
import { ItemsSection } from "~/components/home/ItemsSection";
import { PatchNotesSection } from "~/components/home/PatchNotesSection";
import { ScrollToTopButton } from "~/components/home/ScrollToTopButton";
import { SkillTreeSection } from "~/components/home/SkillTreeSection";
import { BuildsPreviewSection } from "~/components/home/BuildsPreviewSection";
import { Container } from "~/components/ui/Container";

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full relative min-h-screen">
      <section className="w-full pt-12 sm:pt-24 flex justify-center">
        <Container className="flex flex-col items-center text-center max-w-5xl">
          <HeroSection opacity={opacity} scale={scale} y={y} />
        </Container>
      </section>

      <ScrollToTopButton />

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

      <section className="w-full py-6 flex justify-center">
        <Container className="px-6 md:px-8 lg:px-10 max-w-7xl">
          <FeaturesSection />
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
