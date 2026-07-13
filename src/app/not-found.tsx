import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-24">
      <div className="max-w-md text-center space-y-6">
        <div className="font-heading text-6xl font-bold" style={{ color: 'var(--color-crimson-600)' }}>
          404
        </div>
        <h1 className="font-heading text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Страница не найдена
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Возможно, страница была перемещена или удалена.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
          style={{ background: 'var(--color-crimson-600)', color: '#ffffff' }}
        >
          <Home size={16} /> На главную
        </Link>
      </div>
    </div>
  );
}
