const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    unoptimized: true,
  },
  output: 'standalone',   // ensures Next.js builds a self-contained server bundle
};

export default nextConfig;