// Cache shimmer SVGs for common sizes
const shimmerCache = new Map<string, string>();

export const shimmer = (w: number, h: number) => {
  const key = `${w}x${h}`;
  if (shimmerCache.has(key)) {
    return shimmerCache.get(key)!;
  }

  const svg = `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(90)">
      <stop stop-color="#111" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#111" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#111" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)">
    <animate 
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="2s"
      repeatCount="indefinite"
      calcMode="spline"
      keySplines="0.45 0.05 0.55 0.95;0.45 0.05 0.55 0.95"
    />
  </rect>
</svg>`;

  shimmerCache.set(key, svg);
  return svg;
};

// Cache base64 strings
const base64Cache = new Map<string, string>();

export const toBase64 = (str: string) => {
  if (base64Cache.has(str)) {
    return base64Cache.get(str)!;
  }

  const base64 = typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

  base64Cache.set(str, base64);
  return base64;
};

// Clear caches when memory pressure is high
if (typeof window !== 'undefined') {
  window.addEventListener('blur', () => {
    shimmerCache.clear();
    base64Cache.clear();
  });
}
