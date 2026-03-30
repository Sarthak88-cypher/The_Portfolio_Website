import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/components/providers/ThemeProvider';
import config from '@/config/portfolio';
import './globals.css';

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
  metadataBase: new URL(config.meta.url || 'https://saisarthakmohapatra.dev'),
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    url: config.meta.url,
    siteName: config.meta.name,
    locale: 'en_US',
    type: 'website',
    ...(config.meta.ogImage ? { images: [{ url: config.meta.ogImage, width: 1200, height: 630, alt: config.meta.title }] } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: config.meta.title,
    description: config.meta.description,
    ...(config.meta.ogImage ? { images: [config.meta.ogImage] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/assets/images/character.webp" as="image" type="image/webp" />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="449ec82c-b093-4093-8c9d-b9487815622e" strategy="afterInteractive" />
      </body>
    </html>
  );
}
