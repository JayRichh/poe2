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
    potentialAction: {
      "@type": "SearchAction",
      target: `${context.siteUrl}/build-planner?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBuildPlannerSchema(context: SchemaContext, buildData: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${buildData.name} - POE2 Build`,
    applicationCategory: "Game Build Planner",
    operatingSystem: "Web Browser",
    url: `${context.siteUrl}/build-planner/${buildData.id}`,
    author: {
      "@type": "Person",
      name: buildData.author,
    },
    dateModified: buildData.updatedAt,
    datePublished: buildData.createdAt,
    description: buildData.description || `Path of Exile 2 build configuration for ${buildData.name}`,
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
  };
}

export function generateToolSchema(context: SchemaContext, tool: {
  name: string;
  path: string;
  description: string;
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    applicationCategory: "GameApplication",
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
  };
}

export function generateBreadcrumbSchema(context: SchemaContext, items: Array<{
  name: string;
  path: string;
}>) {
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
    },
  };
}

// Helper to combine multiple schemas
export function combineSchemas(...schemas: any[]) {
  return schemas.map(schema => ({
    ...schema,
    "@context": "https://schema.org",
  }));
}
