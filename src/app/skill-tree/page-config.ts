export const runtime = 'edge';
export const preferredRegion = 'auto';
export const dynamic = 'force-static';
export const revalidate = false; // Never revalidate since skill tree data is static

// Force cache all static assets
export const generateMetadata = () => {
  return {
    other: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  };
};
