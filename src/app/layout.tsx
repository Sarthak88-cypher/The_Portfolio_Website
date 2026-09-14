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

const siteUrl = config.meta.url || 'https://www.saisarthakmohapatra.site';

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
  metadataBase: new URL(siteUrl),
  keywords: config.meta.keywords,
  authors: config.meta.author ? [{ name: config.meta.author, url: siteUrl }] : undefined,
  creator: config.meta.author,
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    url: siteUrl,
    siteName: config.meta.name,
    locale: 'en_US',
    type: 'website',
    ...(config.meta.ogImage ? { images: [{ url: config.meta.ogImage, width: 1200, height: 630, alt: config.meta.title }] } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: config.meta.title,
    description: config.meta.description,
    creator: config.meta.twitterHandle,
    ...(config.meta.ogImage ? { images: [config.meta.ogImage] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: siteUrl,
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
        <Script
          id="json-ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: config.meta.name,
              url: siteUrl,
              jobTitle: config.meta.jobTitle,
              worksFor: {
                '@type': 'Organization',
                name: 'Showpad',
                url: 'https://www.showpad.com',
              },
              description: config.meta.description,
              sameAs: [
                config.meta.github,
                config.meta.linkedin,
              ].filter(Boolean),
              knowsAbout: [
                'AI Engineering', 'LLM Orchestration', 'Deal Intelligence',
                'React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS',
                'Neo4j', 'Amazon Neptune', 'Sales Enablement',
              ],
              address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
            }),
          }}
        />
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
