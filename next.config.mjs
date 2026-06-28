/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove during development; add back for static export if needed
  // output: "export",
  images: {
    // Using <img> tags directly for simplicity; enable Next Image if preferred
    unoptimized: true,
  },
  experimental: {
    // Enables faster local builds
    turbotrace: {},
  },
};

export default nextConfig;
