'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Search, X, BookOpen, Download } from 'lucide-react';
import lettersData from '@/data/letters.json';
import { withBasePath } from '@/lib/paths';

interface Letter {
  id: number;
  page: number;
  relation: string;
  heroName: string;
  childNames: string;
  region: string;
  city: string;
}

const letters: Letter[] = lettersData as Letter[];

// Уникальные города для фильтра
const cities = Array.from(new Set(letters.map(l => l.city).filter(Boolean))).sort();

function LetterCard({ letter, index }: { letter: Letter; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pdfUrl = `${withBasePath('/MemoryLatters.pdf')}#page=${letter.page}`;
  const childList = letter.childNames.split(/[,и&]/).map(n => n.trim()).filter(Boolean);
  const relationWord = letter.relation.replace(/^(МОЙ|НАШ|МОЯ|НАША)\s+/i, '').toLowerCase();

  return (
    <a
      ref={ref}
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.5s ease ${(index % 6) * 60}ms, transform 0.5s ease ${(index % 6) * 60}ms`,
      }}
    >
      <div
        className="letter-card relative rounded-xl overflow-hidden h-full"
        style={{
          background: 'linear-gradient(145deg, #fffdf7 0%, #f5edd6 100%)',
          border: '1px solid rgba(201,162,39,0.35)',
        }}
      >
        {/* Gold top stripe */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #b8860b, #e8c96a, #b8860b)' }} />

        <div className="p-5">
          {/* Relation + hero name */}
          <div className="mb-3">
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#9b7b3a' }}>
              {letter.relation}
            </div>
            <div className="font-heading font-bold text-xl leading-tight" style={{ color: '#1a1208' }}>
              {letter.heroName}
            </div>
          </div>

          {/* Decorative lines (letter imitation) */}
          <div className="space-y-1.5 mb-4">
            {[92, 78, 85, 65, 88].map((w, j) => (
              <div key={j} className="h-1 rounded-full" style={{ width: `${w}%`, background: 'rgba(100,75,40,0.12)' }} />
            ))}
          </div>

          {/* Children */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {childList.map((name, j) => (
              <span
                key={j}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(183,28,28,0.08)', color: '#9b1515', border: '1px solid rgba(183,28,28,0.18)' }}
              >
                {name}
              </span>
            ))}
          </div>

          {/* City */}
          <div className="flex items-center gap-1.5 mt-auto">
            <MapPin size={12} style={{ color: '#9b7b3a', flexShrink: 0 }} />
            <span className="text-xs" style={{ color: '#9b7b3a' }}>{letter.city}</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'rgba(183,28,28,0.06)' }}
        >
          <span className="text-xs font-semibold" style={{ color: '#b71c1c' }}>
            Читать письмо →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function LettersPage() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const filtered = letters.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.heroName.toLowerCase().includes(q) || l.childNames.toLowerCase().includes(q) || l.city.toLowerCase().includes(q);
    const matchCity = !cityFilter || l.city === cityFilter;
    return matchSearch && matchCity;
  });

  return (
    <div className="space-y-0">

      {/* ── Header ── */}
      <section className="hero-section hero-bg pt-24 pb-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <Link href="/heroes" className="inline-flex items-center gap-2 text-sm mb-2 transition-colors hover:text-crimson-500" style={{ color: 'var(--text-muted)' }}>
              <ArrowLeft size={15} /> Герои России
            </Link>
            <div className="label-gold animate-fade-up">Слова, которые не забыть</div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold animate-fade-up-delay" style={{ color: 'var(--text-primary)' }}>
              Письма <span className="text-crimson-500">памяти</span>
            </h1>
            <hr className="divider-ru max-w-xs mx-auto" />
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              {letters.length} писем детей, обращённых к Героям России — своим папам и мамам.
              Живые слова, наполненные любовью и благодарностью.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link href="/book" prefetch={false} className="inline-flex items-center gap-2 font-medium rounded-lg px-6 py-3 bg-crimson-600 text-white">Листать новую книгу</Link>
              <a
                href={withBasePath('/MemoryLatters.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium rounded-lg px-6 py-3 transition duration-200"
                style={{ background: 'var(--color-crimson-600)', color: '#fff', boxShadow: '0 4px 20px rgba(183,28,28,0.35)' }}
              >
                <BookOpen size={16} /> Открыть исходный сборник
              </a>
              <a
                href={withBasePath('/MemoryLatters.pdf')}
                download
                className="inline-flex items-center gap-2 font-medium rounded-lg px-6 py-3 transition duration-200"
                style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)', background: 'transparent' }}
              >
                <Download size={16} /> Скачать исходный PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Имя героя, ребёнка или город..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg text-sm"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* City filter */}
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="py-2 px-3 rounded-lg text-sm"
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
          >
            <option value="">Все города</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Count */}
          <span className="text-sm flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
            {filtered.length} из {letters.length}
          </span>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <section className="py-12" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
              Ничего не найдено
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((letter, i) => (
                <LetterCard key={letter.id} letter={letter} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
