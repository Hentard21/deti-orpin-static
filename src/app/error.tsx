'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

const CHUNK_RELOAD_KEY = 'chunk-error-reloaded';

function isChunkLoadError(error: Error): boolean {
  const text = `${error?.name || ''} ${error?.message || ''}`;
  return /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module/i.test(text);
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ChunkLoadError после деплоя или на нестабильном соединении:
    // безопасно перезагружаем страницу один раз за сессию
    if (isChunkLoadError(error)) {
      try {
        if (!sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
          sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
          window.location.reload();
        }
      } catch {}
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-24">
      <div className="max-w-md text-center space-y-6">
        <h1 className="font-heading text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Что-то пошло не так
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Не удалось загрузить страницу. Проверьте соединение с интернетом
          и попробуйте ещё раз.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
            style={{ background: 'var(--color-crimson-600)', color: '#ffffff' }}
          >
            <RefreshCw size={16} /> Повторить
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            <Home size={16} /> На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
