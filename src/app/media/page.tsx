'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ZoomIn, FileText, Download, ImageOff, Plus } from 'lucide-react';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';
import { withBasePath } from '@/lib/paths';

const photos = Array.from({ length: 38 }, (_, i) => ({
  id: i + 1,
  src: withBasePath(`/gallery/photo-${String(i + 1).padStart(2, '0')}.webp`),
  alt: `Мероприятие «Диалог поколений. Герои и дети» — фото ${i + 1}`,
}));

/* Сколько фото показываем при первом открытии и добавляем за один клик
   «Показать ещё» — страница не пытается загрузить все 38 изображений сразу */
const PHOTOS_PER_BATCH = 12;

const documents = [
  {
    name: 'Письмо поддержки — Федеральный Консультативный Совет',
    date: '12 декабря 2025',
    org: 'ФКС',
    file: '/docs/letter-fks-to-cpd.pdf',
  },
  {
    name: 'Письмо Мэру г. Москвы — Федеральный Консультативный Совет',
    date: '4 декабря 2025',
    org: 'ФКС',
    file: '/docs/letter-fks-to-sobyanin.pdf',
  },
  {
    name: 'Ответ Комитета по туризму Москвы',
    date: '12 декабря 2025',
    org: 'Мостуризм',
    file: '/docs/letter-mostourism.pdf',
  },
  {
    name: 'Поддержка Смоленского управления культурного наследия',
    date: '26 сентября 2025',
    org: 'Смоленск',
    file: '/docs/letter-smolensk.pdf',
  },
];

function PhotoCard({
  photo,
  onOpen,
  index,
  instant,
}: {
  photo: typeof photos[0];
  onOpen: () => void;
  index: number;
  instant: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (instant || visible) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [instant, visible]);

  const shown = visible || instant;

  return (
    <div
      ref={ref}
      className="group relative aspect-square rounded-xl overflow-hidden cursor-zoom-in"
      style={{
        background: 'var(--bg-secondary)', /* skeleton фиксированного размера до загрузки */
        opacity: shown ? 1 : 0,
        transform: shown ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 0.45s ease ${(index % 8) * 50}ms, transform 0.45s ease ${(index % 8) * 50}ms`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
      }}
      onClick={failed ? undefined : onOpen}
    >
      {failed ? (
        /* Ошибка одного изображения не ломает страницу — показываем заглушку */
        <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <ImageOff size={26} />
          <span className="text-xs">Фото недоступно</span>
        </div>
      ) : (
        <>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setFailed(true)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
            <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </>
      )}
    </div>
  );
}

function LightboxImage({ photo }: { photo: typeof photos[0] }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="rounded-xl w-full flex flex-col items-center justify-center gap-3 py-24"
        style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
      >
        <ImageOff size={40} />
        <span className="text-sm">Не удалось загрузить изображение</span>
      </div>
    );
  }
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={1280}
      height={854}
      className="rounded-xl object-contain w-full h-auto max-h-[88vh]"
      style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}
      onError={() => setFailed(true)}
    />
  );
}

export default function MediaPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_BATCH);
  const { enabled: performanceMode } = usePerformanceMode();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(p => p !== null ? Math.min(p + 1, photos.length) : null);
      if (e.key === 'ArrowLeft') setLightbox(p => p !== null ? Math.max(p - 1, 1) : null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  const visiblePhotos = photos.slice(0, visibleCount);
  const remaining = photos.length - visibleCount;

  return (
    <div className="space-y-0">

      {/* ── Header ── */}
      <section className="hero-section hero-bg pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="label-dark animate-fade-up">Медиа</div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight animate-fade-up-delay" style={{ color: 'var(--text-primary)' }}>
              Фотогалерея
              <br />
              <span className="text-crimson-500">проекта</span>
            </h1>
            <hr className="divider-ru max-w-xs mx-auto" />
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Мероприятия, встречи и моменты акции «Диалог поколений. Герои и дети»
            </p>
          </div>
        </div>
      </section>

      {/* ── Photo grid ── */}
      <section className="py-14" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {visiblePhotos.map((photo, i) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={i}
                instant={performanceMode}
                onOpen={() => setLightbox(photo.id)}
              />
            ))}
          </div>

          {remaining > 0 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount(c => Math.min(c + PHOTOS_PER_BATCH, photos.length))}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium transition duration-200"
                style={{
                  background: 'var(--color-crimson-600)',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(183,28,28,0.30)',
                }}
              >
                <Plus size={18} />
                Показать ещё ({remaining})
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Documents ── */}
      <section className="py-14" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="label-gold mb-3">Официально</div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Документы поддержки
            </h2>
            <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>
              Официальные письма от государственных и общественных организаций
            </p>
          </div>
          <div className="space-y-3">
            {documents.map((doc) => (
              <a
                key={doc.file}
                href={withBasePath(doc.file)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl transition duration-200 hover-lift group"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(183,28,28,0.08)', border: '1px solid rgba(183,28,28,0.15)' }}
                >
                  <FileText size={18} style={{ color: 'var(--color-crimson-600)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>{doc.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{doc.org} · {doc.date}</div>
                </div>
                <Download size={16} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox (оригинал загружается только после клика) ── */}
      {lightbox !== null && (
        <div
          data-heavy-effect
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(5,13,26,0.97)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 p-2 rounded-lg transition-colors z-10"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            onClick={() => setLightbox(null)}
            aria-label="Закрыть просмотр"
          >
            <X size={24} />
          </button>

          {/* Prev */}
          {lightbox > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 transition-colors"
              style={{ background: 'rgba(255,255,255,0.10)', color: '#ffffff' }}
              onClick={e => { e.stopPropagation(); setLightbox(l => l! - 1); }}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[88vh] w-full mx-8"
            onClick={e => e.stopPropagation()}
          >
            <LightboxImage key={lightbox} photo={photos[lightbox - 1]} />
            <div className="absolute bottom-3 left-0 right-0 text-center text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {lightbox} / {photos.length}
            </div>
          </div>

          {/* Next */}
          {lightbox < photos.length && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 transition-colors"
              style={{ background: 'rgba(255,255,255,0.10)', color: '#ffffff' }}
              onClick={e => { e.stopPropagation(); setLightbox(l => l! + 1); }}
              aria-label="Следующее фото"
            >
              ›
            </button>
          )}
        </div>
      )}

    </div>
  );
}
