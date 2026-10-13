'use client';

import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  Maximize2,
  Search,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { withBasePath } from '@/lib/paths';

type IntroSection = {
  section_id: string;
  title: string;
  start_page: number;
  end_page: number;
};

type FamilyEntry = {
  id: string;
  name: string;
  children: string[];
  regionId?: string | null;
  startPage: number;
  endPage: number;
};

type BookManifest = {
  title: string;
  version: string;
  interiorPages: number;
  spreadCount: number;
  download: string;
  spreadPattern: string;
  intro: IntroSection[];
  families: FamilyEntry[];
  backMatter: IntroSection[];
};

function spreadSrc(pattern: string, index: number) {
  return withBasePath(pattern.replace('{number}', String(index + 1).padStart(3, '0')));
}

export default function BookReader({ manifest }: { manifest: BookManifest }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(1);
  const [tocOpen, setTocOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [zoomed, setZoomed] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const [fullscreenNotice, setFullscreenNotice] = useState('');
  const tocRef = useRef<HTMLElement>(null);

  const spreadIndex = Math.min(
    manifest.spreadCount - 1,
    Math.max(0, Math.floor(currentPage / 2)),
  );
  const pageSide = currentPage % 2 === 0 ? 'left' : 'right';
  const imageSrc = spreadSrc(manifest.spreadPattern, spreadIndex);

  const goToPage = useCallback((page: number, nextDirection = 1) => {
    const safePage = Math.min(manifest.interiorPages, Math.max(1, page));
    setDirection(nextDirection);
    setCurrentPage(safePage);
    setZoomed(false);
    setTocOpen(false);
    window.history.replaceState(null, '', `#page-${safePage}`);
  }, [manifest.interiorPages]);

  const next = useCallback(() => {
    if (isMobile) {
      goToPage(currentPage + 1, 1);
      return;
    }
    const nextSpread = Math.min(manifest.spreadCount - 1, spreadIndex + 1);
    goToPage(nextSpread === 0 ? 1 : nextSpread * 2, 1);
  }, [currentPage, goToPage, isMobile, manifest.spreadCount, spreadIndex]);

  const previous = useCallback(() => {
    if (isMobile) {
      goToPage(currentPage - 1, -1);
      return;
    }
    const previousSpread = Math.max(0, spreadIndex - 1);
    goToPage(previousSpread === 0 ? 1 : previousSpread * 2, -1);
  }, [currentPage, goToPage, isMobile, spreadIndex]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 720px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);

    const hashPage = Number.parseInt(window.location.hash.replace('#page-', ''), 10);
    if (Number.isFinite(hashPage) && hashPage >= 1 && hashPage <= manifest.interiorPages) {
      setCurrentPage(hashPage);
    }
    return () => media.removeEventListener('change', update);
  }, [manifest.interiorPages]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setTocOpen(false); return; }
      const target = event.target as HTMLElement;
      if (tocOpen || target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      if (event.key === 'Home') goToPage(1, -1);
      if (event.key === 'End') goToPage(manifest.interiorPages, 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goToPage, manifest.interiorPages, next, previous, tocOpen]);

  useEffect(() => {
    [spreadIndex - 1, spreadIndex + 1]
      .filter((index) => index >= 0 && index < manifest.spreadCount)
      .forEach((index) => {
        const preload = new window.Image();
        preload.src = spreadSrc(manifest.spreadPattern, index);
      });
  }, [manifest.spreadCount, manifest.spreadPattern, spreadIndex]);

  useEffect(() => {
    if (!tocOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    tocRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = tocRef.current?.querySelectorAll<HTMLElement>('button, input, a[href]');
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', trapFocus);
    return () => { document.removeEventListener('keydown', trapFocus); previousFocus?.focus(); };
  }, [tocOpen]);

  const filteredFamilies = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ru');
    if (!needle) return manifest.families;
    return manifest.families.filter((family) =>
      [family.name, family.regionId || '', ...family.children]
        .join(' ')
        .toLocaleLowerCase('ru')
        .includes(needle),
    );
  }, [manifest.families, query]);

  const pageLabel = isMobile
    ? `Страница ${currentPage} из ${manifest.interiorPages}`
    : spreadIndex === 0
      ? 'Страница 1'
      : `Страницы ${spreadIndex * 2}–${Math.min(spreadIndex * 2 + 1, manifest.interiorPages)}`;

  const canGoBack = isMobile ? currentPage > 1 : spreadIndex > 0;
  const canGoForward = isMobile
    ? currentPage < manifest.interiorPages
    : spreadIndex < manifest.spreadCount - 1;

  const toggleFullscreen = async () => {
    if (!readerRef.current) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (readerRef.current.requestFullscreen) await readerRef.current.requestFullscreen();
      else throw new Error('Fullscreen unavailable');
      setFullscreenNotice('');
    } catch {
      setFullscreenNotice('Полноэкранный режим недоступен в этом браузере. Можно пользоваться обычным просмотром и увеличением.');
    }
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (zoomed) return;
    if (Math.abs(distance) < 55) return;
    if (distance < 0 && canGoForward) next();
    if (distance > 0 && canGoBack) previous();
  };

  return (
    <section className="book-reader-section" aria-labelledby="book-reader-title">
      <div className="book-container">
        <div className="book-reader-heading">
          <div>
            <p className="book-kicker">ЭЛЕКТРОННАЯ ВЕРСИЯ</p>
            <h2 id="book-reader-title">Листайте книгу</h2>
            <p>На компьютере — разворотами, на телефоне — по одной странице свайпом.</p>
          </div>
          <div className="book-reader-heading-actions">
            <button type="button" onClick={() => setTocOpen(true)}>
              <List size={19} /> Содержание
            </button>
            <a href={withBasePath(manifest.download)} download>
              <Download size={19} /> Скачать PDF
            </a>
          </div>
        </div>

        <div className="book-reader" ref={readerRef}>
          <div className="book-reader-toolbar">
            <button
              type="button"
              onClick={previous}
              disabled={!canGoBack}
              aria-label="Предыдущая страница"
            >
              <ChevronLeft size={22} />
            </button>
            <span aria-live="polite">{pageLabel}</span>
            {isMobile && (
              <button
                type="button"
                onClick={() => setZoomed((value) => !value)}
                aria-label={zoomed ? 'Уменьшить страницу' : 'Увеличить страницу'}
                aria-pressed={zoomed}
              >
                {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
            )}
            <button
              type="button"
              onClick={next}
              disabled={!canGoForward}
              aria-label="Следующая страница"
            >
              <ChevronRight size={22} />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Переключить полноэкранный режим"
            >
              <Maximize2 size={19} />
            </button>
          </div>

          <div
            className={`book-stage ${zoomed ? 'is-zoomed' : ''}`}
            onPointerDown={(event) => { pointerStart.current = event.clientX; }}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStart.current = null; }}
          >
            <button
              type="button"
              className="book-stage-arrow book-stage-arrow-left"
              onClick={previous}
              disabled={!canGoBack}
              aria-label="Предыдущая страница"
            >
              <ChevronLeft size={28} />
            </button>

            <div className={`book-paper ${isMobile ? `book-paper-mobile is-${pageSide}` : ''} ${zoomed ? 'is-zoomed' : ''}`}>
                <div
                  key={`${isMobile ? currentPage : spreadIndex}-${isMobile ? 'page' : 'spread'}`}
                  className={`book-paper-motion book-turn ${direction > 0 ? 'turn-next' : 'turn-previous'}`}
                >
                  <Image
                    src={imageSrc}
                    alt={isMobile ? `Страница ${currentPage} книги «Письма памяти»` : `Разворот ${spreadIndex + 1} книги «Письма памяти»`}
                    width={2486}
                    height={974}
                    sizes={isMobile ? '100vw' : '(max-width: 1200px) 92vw, 1280px'}
                    priority={spreadIndex < 2}
                    draggable={false}
                    unoptimized
                  />
                </div>
            </div>

            <button
              type="button"
              className="book-stage-arrow book-stage-arrow-right"
              onClick={next}
              disabled={!canGoForward}
              aria-label="Следующая страница"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="book-reader-footer">
            <span>← → на клавиатуре</span>
            <div className="book-progress" aria-hidden="true">
              <i style={{ width: `${(currentPage / manifest.interiorPages) * 100}%` }} />
            </div>
            <button type="button" onClick={() => setTocOpen(true)}>Перейти к семье</button>
          </div>

          {fullscreenNotice && <p className="book-fullscreen-notice" role="status">{fullscreenNotice}</p>}

          {tocOpen && (
            <div className="book-toc-backdrop" role="presentation" onMouseDown={() => setTocOpen(false)}>
              <aside
                className="book-toc"
                ref={tocRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="book-toc-title"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="book-toc-header">
                  <div><p>НАВИГАЦИЯ</p><h3 id="book-toc-title">Содержание</h3></div>
                  <button type="button" onClick={() => setTocOpen(false)} aria-label="Закрыть содержание"><X /></button>
                </div>
                <div className="book-toc-search">
                  <Search size={18} />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Имя героя, ребёнка или регион"
                    aria-label="Поиск по содержанию"
                  />
                </div>
                {!query && (
                  <div className="book-toc-intro">
                    {manifest.intro.filter((item) => item.end_page >= item.start_page).map((item) => (
                      <button key={item.section_id} type="button" onClick={() => goToPage(item.start_page)}>
                        <span>{item.title}</span><b>{item.start_page}</b>
                      </button>
                    ))}
                  </div>
                )}
                <div className="book-toc-list">
                  {filteredFamilies.map((family) => (
                    <button key={family.id} type="button" onClick={() => goToPage(family.startPage)}>
                      <span><b>{family.name}</b><small>{family.children.filter(Boolean).join(' · ')}</small></span>
                      <em>{family.startPage}</em>
                    </button>
                  ))}
                  {filteredFamilies.length === 0 && <p className="book-toc-empty">Ничего не найдено.</p>}
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
