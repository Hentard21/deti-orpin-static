/**
 * next/link и next/image сами добавляют basePath из next.config.js.
 * Но «сырые» <a href>, <video>/<source src>, CSS background-image и т.п.
 * ссылки строкой на файлы из /public — basePath не подхватывают, поэтому
 * на GitHub Pages (сайт в подпапке /deti-orpin-static) такие ссылки вели бы
 * мимо подпапки. withBasePath() унифицированно добавляет префикс везде,
 * где Next.js этого не делает автоматически.
 */
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
