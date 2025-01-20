import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Blob Generator',
    description:
        'Generate beautiful gradient blob backgrounds for your website',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
            <script
                defer
                data-domain="blurry-blob-background.timoweiss.me"
                src="https://plausible.io/js/script.js"
            ></script>
        </html>
    );
}
