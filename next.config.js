/** @type {import('next').NextConfig} */

/* Статический билд для GitHub Pages, публикуется на custom domain
   www.dialog-pokoleniy.online (см. public/CNAME) — НЕ основной Vercel-деплой,
   это отдельная копия репозитория.

   basePath/assetPrefix берутся из NEXT_PUBLIC_BASE_PATH:
   - не задана (локальная разработка, `npm run dev`/`npm run build`, и текущий
     production-workflow с custom domain) → пусто, сайт живёт в корне;
   - задана явно (например, для публикации без custom domain по адресу
     <user>.github.io/deti-orpin-static/) → сайт уходит в подпапку.

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
