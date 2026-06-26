import "./global.css";
import { Archivo, Archivo_Expanded, JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google';

const archivo = Archivo({
  subsets: ['latin'],
  weight: 'variable', 
  variable: '--font-archivo',
  axes: ['wdth'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata = {
  title: `Tom Effernelli - Model & Photographer`,
  description: `Tom Effernelli — editorial and fashion model based in Paris. Photography portfolio.`,
  keywords: ['Tom Effernelli', 'Model', 'Mannequin', 'Fashion', 'Editorial', 'Photography', 'Paris'],
  authors: [{ name: 'Tom Effernelli' }],
  creator: 'Tom Effernelli',
  openGraph: {
    title: 'Tom Effernelli - Model & Photographer',
    description: 'Tom Effernelli — editorial and fashion model based in Paris.',
    siteName: 'Tom Effernelli - Model & Photographer',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.className} ${archivo.variable} ${jetbrainsMono.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
