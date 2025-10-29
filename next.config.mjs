import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Optimisations pour React 19 et production
	reactStrictMode: true,

	// Configuration du compiler pour React 19
	compiler: {
		// Suppression automatique des console.log en production
		removeConsole: process.env.NODE_ENV === 'production' ? {
			exclude: ['error', 'warn']
		} : false,
	},

	// Optimisation des images
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 31536000, // 1 an pour les images optimisées
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	// Compression gzip/brotli automatique
	compress: true,

	// Configuration Turbopack
	turbopack: {
		root: __dirname
	},

	// Redirections
	async redirects() {
		return [
			{
				source: '/about',
				destination: '/#about',
				permanent: true
			}
		];
	},

	// Headers de sécurité et performance
	async headers() {
		return [
			// Assets statiques - cache immutable
			{
				source: '/images/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			},
			{
				source: '/_next/static/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			},
			// Pages HTML et autres - headers de sécurité + revalidation
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on'
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN'
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin'
					},
					{
						key: 'Cache-Control',
						value: 'public, max-age=0, must-revalidate'
					},
				],
			},
		];
	},
};

export default nextConfig;
