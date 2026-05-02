import type { NextConfig } from "next";

// Detecta se é deploy para GitHub Pages
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Base path para GitHub Pages (repo em username.github.io/repo-name)
  basePath: isGitHubPages ? "/harmonizai" : "",
  assetPrefix: isGitHubPages ? "/harmonizai" : undefined,
  // Ensure trailing slashes for consistent routing
  trailingSlash: true,
  // Image optimization settings
  images: {
    unoptimized: true,
  },
  // Static export for GitHub Pages / other static hosts
  output: "export",
  distDir: "out",
  // Compress output for better performance
  compress: true,
  // React strict mode for better debugging
  reactStrictMode: true,
};

// Enable bundle analyzer when ANALYZE=true
const shouldAnalyze = process.env.ANALYZE === "true";

let config = nextConfig;
if (shouldAnalyze) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  config = withBundleAnalyzer(nextConfig);
}

export default config;
