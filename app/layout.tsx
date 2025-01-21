import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Animated Blurry Blob Background Generator',
    description: 'Generate animated blurry blob backgrounds',
    openGraph: {
        title: 'Animated Blurry Blob Background Generator',
        description: 'Generate animated blurry blob backgrounds',
        url: 'https://blurry-blob-background.timoweiss.me',
        type: 'website',
        images: [
            {
                url: 'https://blurry-blob-background.timoweiss.me/og-image.jpg',
                width: 1200,
                height: 600,
                alt: 'Animated Blurry Blob Background Generator',
            },
        ],
    },
    twitter: {
        title: 'Animated Blurry Blob Background Generator',
        description: 'Generate animated blurry blob backgrounds',
        images: ['https://blurry-blob-background.timoweiss.me/og-image.jpg'],
        card: 'summary_large_image',
        creator: '@timooweiss',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
            <Script
                defer
                data-domain="blurry-blob-background.timoweiss.me"
                src="https://plausible.io/js/script.js"
            ></Script>
        </html>
    );
}
