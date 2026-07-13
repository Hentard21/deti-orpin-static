import '../../styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Providers } from './providers';
import { PERF_BOOTSTRAP_SCRIPT } from '@/lib/performance-mode';

/* Веса — только реально используемые в разметке:
   Montserrat (заголовки, .font-heading): semibold 600, bold 700, extrabold 800 (логотип в шапке).
   Inter (основной текст): regular 400, medium 500, semibold 600, bold 700.
   display: 'swap' — текст сразу отображается системным fallback, шрифт не блокирует рендер. */
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Диалог поколений. Герои и дети',
  description: 'Всероссийский проект АНО "Центр патриотического воспитания и всестороннего развития детей и молодёжи «Диалог поколений. Герои и дети»"',
  keywords: 'patriotic проект, герои, дети, центр поддержки, ветераны',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: PERF_BOOTSTRAP_SCRIPT }} />
      </head>
      <body style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
