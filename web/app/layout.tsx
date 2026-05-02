import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { InstallPrompt } from "./components/InstallPrompt";
import { ServiceWorkerRegister } from "./components/ServiceWorkerRegister";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

// Optimized fonts with next/font (automatic font-display: swap)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HarmonizAI — Descubra o vinho ideal para sua refeição",
  description:
    "Digite o que você vai comer e receba recomendações de vinhos harmonizados com inteligência artificial. Encontre o vinho perfeito para sushi, churrasco, risoto e muito mais.",
  keywords: ["vinho", "harmonização", "sommelier", "sushi", "churrasco", "jantar", "wine pairing"],
  authors: [{ name: "HarmonizAI" }],
  openGraph: {
    title: "HarmonizAI — Descubra o vinho ideal",
    description: "Receba recomendações de vinhos harmonizados com IA.",
    type: "website",
    locale: "pt_BR",
    siteName: "HarmonizAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "HarmonizAI — Descubra o vinho ideal",
    description: "Receba recomendações de vinhos harmonizados com IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#722F37" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HarmonizAI" />
        
        {/* Preconnect para APIs e recursos externos */}
        {/* Removido: preconnect para fonts (não necessário com next/font) */}
        <link rel="preconnect" href="https://harmonizai-api.up.railway.app" />
        <link rel="dns-prefetch" href="https://harmonizai-api.up.railway.app" />
        
        {/* Prefetch para warm-up da API connection */}
        <link rel="prefetch" href="https://harmonizai-api.up.railway.app/health" as="fetch" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "HarmonizAI",
              description: "Descubra o vinho ideal para sua refeição com inteligência artificial.",
              url: "https://harmonizai.vercel.app",
              applicationCategory: "FoodAndDrinkApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {/* Skip Link for keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
          >
            Pular para conteúdo principal
          </a>
          <ServiceWorkerRegister />
          <InstallPrompt />
          <div id="main-content" className="mx-auto max-w-7xl">
            {children}
          </div>
          {/* Live region for screen reader announcements */}
          <div id="sr-announcements" aria-live="polite" aria-atomic="true" className="sr-only" />
        </ThemeProvider>
      </body>
    </html>
  );
}