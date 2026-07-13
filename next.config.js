/** @type {import('next').NextConfig} */

/* Тестовый статический билд для GitHub Pages (peachjoe864.github.io/deti-orpin-static).
   Отдельная копия репозитория — НЕ основной Vercel-деплой.

   basePath/assetPrefix берутся из NEXT_PUBLIC_BASE_PATH:
   - не задана (обычная локальная разработка, `npm run dev` / `npm run build`) → пусто, сайт живёт в корне;
   - задана в GitHub Actions (см. .github/workflows/deploy-pages.yml) → '/deti-orpin-static',
     сайт публикуется в подпапке.

   headers() из исходного конфига убран: `output: 'export'` не поддерживает серверные
   заголовки (Next выдаёт ошибку сборки, если оставить headers()/redirects()/rewrites()
   вместе со static export). GitHub Pages отдаёт файлы из /public как есть, без этих правил. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
