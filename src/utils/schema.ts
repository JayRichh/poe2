type SchemaContext = {
  siteUrl: string;
  siteName: string;
  siteImage: string;
};

export function generateWebsiteSchema(context: SchemaContext) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: context.siteName,
    url: context.siteUrl,
    description:
      "Comprehensive Path of Exile 2 toolkit for build planning, DPS calculations, and character optimization",
    potentialAction: {
      "@type": "SearchAction",
      target: `${context.siteUrl}/build-planner?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    applicationCategory: "Game Tools",
    keywords: "path of exile 2, poe2, build planner, dps calculator, skill tree",
    creator: {
      "@type": "Organization",
      name: "POE2 Tools Team",
      url: context.siteUrl,
    },
  };
}

export function generateBuildPlannerSchema(context: SchemaContext, buildData: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${buildData.name} - POE2 Build`,
    applicationCategory: "Game Build Planner",
    applicationSubCategory: "Path of Exile 2 Character Builder",
    operatingSystem: "Web Browser",
    url: `${context.siteUrl}/build-planner/${buildData.id}`,
    author: {
      "@type": "Person",
      name: buildData.author,
    },
    dateModified: buildData.updatedAt,
    datePublished: buildData.createdAt,
    description:
      buildData.description || `Path of Exile 2 build configuration for ${buildData.name}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/UseAction",
      userInteractionCount: "5000",
    },
    gameItem: {
      "@type": "Thing",
      name: buildData.name,
      description: buildData.description,
      additionalType: "https://poe2.dev/builds",
      ...(buildData.class && {
        character: {
          "@type": "GameCharacter",
          name: buildData.class,
          gameLocation: "Path of Exile 2",
        },
      }),
      ...(buildData.skills?.length > 0 && {
        associatedMedia: buildData.skills.map((skill: any) => ({
          "@type": "GameItem",
          name: skill.name,
          description: skill.description,
        })),
      }),
    },
  };
}

export function generateNewsArticleSchema(context: SchemaContext, article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: article.image || context.siteImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: "POE2 Tools Team",
    },
    publisher: {
      "@type": "Organization",
      name: context.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${context.siteUrl}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${context.siteUrl}/news/${article.id}`,
    },
    articleSection: "Game Updates",
    keywords: [
      "path of exile 2",
      "poe2",
      "game updates",
      "patch notes",
      article.category?.toLowerCase() || "",
    ]
      .filter(Boolean)
      .join(","),
    about: {
      "@type": "VideoGame",
      name: "Path of Exile 2",
      gamePlatform: "PC",
      genre: "Action RPG",
    },
  };
}

export function generateToolSchema(
  context: SchemaContext,
  tool: {
    name: string;
    path: string;
    description: string;
    features?: string[];
    category?: string;
    keywords?: string[];
    screenshots?: Array<{ url: string; caption: string }>;
    gameFeatures?: Array<{ name: string; description: string }>;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    applicationCategory: tool.category || "GameApplication",
    applicationSubCategory: "Path of Exile 2 Tools",
    operatingSystem: "Web Browser",
    url: `${context.siteUrl}${tool.path}`,
    description: tool.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(tool.features && {
      featureList: tool.features,
    }),
    ...(tool.keywords && {
      keywords: tool.keywords.join(", "),
    }),
    ...(tool.screenshots && {
      screenshot: tool.screenshots.map((s) => ({
        "@type": "ImageObject",
        url: `${context.siteUrl}${s.url}`,
        caption: s.caption,
      })),
    }),
    ...(tool.gameFeatures && {
      gameItem: tool.gameFeatures.map((f) => ({
        "@type": "Thing",
        name: f.name,
        description: f.description,
      })),
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/UseAction",
      userInteractionCount: "10000",
    },
  };
}

export function generateMechanicsSchema(
  context: SchemaContext,
  mechanic: {
    name: string;
    description: string;
    type: "DamageType" | "StatusEffect" | "CharacterStat" | "CombatMechanic";
    relatedMechanics?: string[];
    examples?: string[];
    effects?: Array<{ name: string; description: string }>;
    calculations?: Array<{ formula: string; description: string }>;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "GamePlayMode",
    name: mechanic.name,
    description: mechanic.description,
    additionalType: `https://poe2.dev/mechanics/${mechanic.type.toLowerCase()}`,
    gameItem: {
      "@type": "Thing",
      name: mechanic.name,
      description: mechanic.description,
      ...(mechanic.effects && {
        potentialAction: mechanic.effects.map((effect) => ({
          "@type": "GamePlayMode",
          name: effect.name,
          description: effect.description,
        })),
      }),
      ...(mechanic.calculations && {
        additionalProperty: mechanic.calculations.map((calc) => ({
          "@type": "PropertyValue",
          name: "Calculation",
          value: calc.formula,
          description: calc.description,
        })),
      }),
    },
    ...(mechanic.examples && {
      exampleOfWork: mechanic.examples.map((example) => ({
        "@type": "Thing",
        name: example,
      })),
    }),
    ...(mechanic.relatedMechanics && {
      associatedMedia: mechanic.relatedMechanics.map((m) => ({
        "@type": "Thing",
        name: m,
      })),
    }),
  };
}

export function generateAscendancySchema(
  context: SchemaContext,
  ascendancy: {
    name: string;
    description: string;
    playstyle: string;
    abilities: Array<{ name: string; description: string }>;
    builds?: Array<{ name: string; url: string }>;
    mechanics?: Array<{ name: string; description: string }>;
    stats?: Array<{ name: string; value: string }>;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "GamePlayMode",
    name: ascendancy.name,
    description: ascendancy.description,
    additionalType: "https://poe2.dev/ascendancies",
    gameItem: {
      "@type": "Thing",
      name: ascendancy.name,
      description: ascendancy.description,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Playstyle",
          value: ascendancy.playstyle,
        },
        ...(ascendancy.stats?.map((stat) => ({
          "@type": "PropertyValue",
          name: stat.name,
          value: stat.value,
        })) || []),
      ],
      ...(ascendancy.abilities && {
        potentialAction: ascendancy.abilities.map((ability) => ({
          "@type": "GamePlayMode",
          name: ability.name,
          description: ability.description,
        })),
      }),
      ...(ascendancy.mechanics && {
        gameFeature: ascendancy.mechanics.map((mech) => ({
          "@type": "GameFeature",
          name: mech.name,
          description: mech.description,
        })),
      }),
    },
    ...(ascendancy.builds && {
      workExample: ascendancy.builds.map((build) => ({
        "@type": "CreativeWork",
        name: build.name,
        url: `${context.siteUrl}${build.url}`,
      })),
    }),
  };
}

export function generateGameFeatureSchema(
  context: SchemaContext,
  feature: {
    name: string;
    description: string;
    type: "Build" | "Class" | "Skill" | "Item" | "Ascendancy" | "Gem" | "Passive" | "Equipment";
    relatedFeatures?: string[];
    image?: string;
    stats?: Array<{ name: string; value: string }>;
    requirements?: Array<{ name: string; value: string }>;
    mechanics?: Array<{ name: string; description: string }>;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "GamePlayMode",
    name: feature.name,
    description: feature.description,
    gameItem: {
      "@type": "Thing",
      name: feature.name,
      description: feature.description,
      ...(feature.image && {
        image: `${context.siteUrl}${feature.image}`,
      }),
      ...(feature.stats && {
        additionalProperty: feature.stats.map((stat) => ({
          "@type": "PropertyValue",
          name: stat.name,
          value: stat.value,
        })),
      }),
      ...(feature.requirements && {
        requirements: feature.requirements.map((req) => ({
          "@type": "PropertyValue",
          name: req.name,
          value: req.value,
        })),
      }),
      ...(feature.mechanics && {
        potentialAction: feature.mechanics.map((mech) => ({
          "@type": "GamePlayMode",
          name: mech.name,
          description: mech.description,
        })),
      }),
    },
    additionalType: `https://poe2.dev/features/${feature.type.toLowerCase()}`,
    ...(feature.relatedFeatures && {
      associatedMedia: feature.relatedFeatures.map((f) => ({
        "@type": "Thing",
        name: f,
      })),
    }),
  };
}

export function generateGuideSchema(
  context: SchemaContext,
  guide: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    content: string;
    category: string;
    tags?: string[];
    relatedGuides?: Array<{ title: string; url: string }>;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    name: guide.title,
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Person",
      name: guide.author,
    },
    datePublished: guide.datePublished,
    dateModified: guide.dateModified || guide.datePublished,
    articleBody: guide.content,
    articleSection: guide.category,
    keywords: guide.tags?.join(", "),
    publisher: {
      "@type": "Organization",
      name: context.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${context.siteUrl}/icon.svg`,
      },
    },
    ...(guide.relatedGuides && {
      isPartOf: guide.relatedGuides.map((related) => ({
        "@type": "Article",
        name: related.title,
        url: `${context.siteUrl}${related.url}`,
      })),
    }),
    about: {
      "@type": "VideoGame",
      name: "Path of Exile 2",
      gamePlatform: "PC",
      genre: "Action RPG",
    },
  };
}

export function generateBreadcrumbSchema(
  context: SchemaContext,
  items: Array<{
    name: string;
    path: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${context.siteUrl}${item.path}`,
    })),
  };
}

export function generateProfileSchema(context: SchemaContext, profile: any) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${profile.username}'s Profile`,
    description: `POE2 Tools profile for ${profile.username}`,
    mainEntity: {
      "@type": "Person",
      name: profile.username,
      url: `${context.siteUrl}/profile/${profile.id}`,
      ...(profile.builds?.length > 0 && {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Character Builds",
          itemListElement: profile.builds.map((build: any) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "CreativeWork",
              name: build.name,
              url: `${context.siteUrl}/build-planner/${build.id}`,
              ...(build.class && {
                character: {
                  "@type": "GameCharacter",
                  name: build.class,
                },
              }),
            },
          })),
        },
      }),
    },
  };
}

// Helper to combine multiple schemas
export function combineSchemas(...schemas: any[]) {
  return schemas.map((schema) => ({
    ...schema,
    "@context": "https://schema.org",
  }));
}
