/**
 * Логотип «Диалог поколений» — inline SVG прямо в серверном HTML.
 *
 * Заменяет next/image + /LogoSVG/logo_clean3.svg: логотип критичен для шапки,
 * поэтому не должен зависеть от отдельного сетевого запроса. Виден даже
 * при отключённом JavaScript и при отказе загрузки остальных медиа.
 *
 * Самодостаточен: без внешних sprite, масок, фильтров, изображений и шрифтов.
 * idPrefix нужен, чтобы id градиентов не конфликтовали, когда логотип
 * встречается на странице несколько раз (шапка + футер).
 */
interface BrandLogoProps {
  className?: string;
  /** Уникальный префикс для id градиентов внутри SVG */
  idPrefix?: string;
  /** Доступное имя; по умолчанию логотип декоративный (aria-hidden) */
  label?: string;
}

export default function BrandLogo({ className, idPrefix = 'dp-logo', label }: BrandLogoProps) {
  const blue = `${idPrefix}-blue`;
  const red = `${idPrefix}-red`;
  const overlap = `${idPrefix}-overlap`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 569 614"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {label ? <title>{label}</title> : null}
      <defs>
        <linearGradient id={blue} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f6cf0" />
          <stop offset="0.55" stopColor="#2347d7" />
          <stop offset="1" stopColor="#1b32bf" />
        </linearGradient>
        <linearGradient id={red} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f55a2d" />
          <stop offset="0.55" stopColor="#ec3620" />
          <stop offset="1" stopColor="#dc2117" />
        </linearGradient>
        <linearGradient id={overlap} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#241d57" />
          <stop offset="0.6" stopColor="#33204b" />
          <stop offset="1" stopColor="#3d2342" />
        </linearGradient>
      </defs>
      {/* Синий пузырь */}
      <path
        d="M 8 53 Q 8 8 53 8 L 410 8 Q 455 8 455 53 L 455 343 Q 455 388 410 388 L 62 388 L 8 437 Z"
        fill={`url(#${blue})`}
      />
      {/* Красный пузырь */}
      <path
        d="M 148 260 Q 148 215 193 215 L 517 215 Q 562 215 562 260 L 562 608 L 491 540 L 193 540 Q 148 540 148 495 Z"
        fill={`url(#${red})`}
      />
      {/* Зона пересечения */}
      <path
        d="M 148 260 Q 148 215 193 215 L 455 215 L 455 343 Q 455 388 410 388 L 148 388 Z"
        fill={`url(#${overlap})`}
      />
    </svg>
  );
}
