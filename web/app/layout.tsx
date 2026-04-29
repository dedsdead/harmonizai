import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HarmonizAI — Descubra o vinho ideal para sua refeição",
  description:
    "Digite o que você vai comer e receba recomendações de vinhos harmonizados com inteligência artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </body>
    </html>
  );
}
