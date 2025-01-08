"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { Text } from "~/components/ui/Text";

import type { ContentSection, RelatedContent } from "~/lib/shared/types";

interface ContentRendererProps {
  sections: ContentSection[];
  relatedContent?: RelatedContent[];
}

export function ContentRenderer({ sections, relatedContent }: ContentRendererProps) {
  return (
    <div className="w-full min-h-0 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12 pb-12">
        {/* Main Content */}
        <motion.div
          className="space-y-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Section Header */}
              <div className="mb-12">
                <Text variant="h2" className="text-3xl font-bold tracking-tight">
                  {section.title}
                </Text>
                <div className="mt-1 h-1 w-20 bg-primary/50 rounded-full" />
              </div>

              {/* Main Section Content */}
              <div className="grid gap-8 lg:grid-cols-2 min-h-0">
                <div className="prose prose-invert max-w-none min-h-0">
                  {section.content.map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="leading-relaxed"
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>

                {section.image && (
                  <div className="relative h-[300px] lg:h-auto rounded-lg overflow-hidden">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>

              {/* Subsections */}
              {section.subsections && (
                <div className="mt-16 grid gap-12">
                  {section.subsections.map((subsection, subIndex) => (
                    <motion.div
                      key={subIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: subIndex * 0.1 }}
                      className="bg-accent/5 rounded-xl p-8 border border-border/50 min-h-0"
                    >
                      <Text variant="h3" className="text-xl font-semibold mb-6">
                        {subsection.title}
                      </Text>

                      <div className="grid gap-8 lg:grid-cols-2 min-h-0">
                        <div className="prose prose-invert max-w-none min-h-0">
                          {subsection.content.map((text, i) => (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              className="leading-relaxed"
                            >
                              {text}
                            </motion.p>
                          ))}
                        </div>

                        {subsection.image && (
                          <div className="relative h-[250px] lg:h-auto rounded-lg overflow-hidden">
                            <Image
                              src={subsection.image.src}
                              alt={subsection.image.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          ))}
        </motion.div>

        {/* Related Content */}
        {relatedContent && relatedContent.length > 0 && (
          <motion.section
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Text variant="h2" className="text-2xl font-bold mb-8">
              Related Content
            </Text>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedContent.map((content, index) => (
                <Link key={index} href={content.href} className="group">
                  <motion.div
                    className="bg-background rounded-xl border border-border/50 overflow-hidden p-6
                             hover:border-primary/50 transition-all duration-300"
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <Text className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {content.title}
                    </Text>
                    <Text className="mt-2 text-sm text-foreground/70">{content.description}</Text>
                    <div className="flex items-center gap-2 mt-4 text-xs text-primary uppercase tracking-wider">
                      <span>{content.type === "guide" ? "Guide" : "Game Mechanic"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
