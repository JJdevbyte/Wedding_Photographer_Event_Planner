/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Perfect for seamless static builds and rapid image-heavy local testing
  },
};

export default nextConfig;
