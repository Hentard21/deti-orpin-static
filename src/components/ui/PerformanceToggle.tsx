'use client';

import { usePerformanceMode } from '@/hooks/usePerformanceMode';
import type { PerformanceSetting } from '@/lib/performance-mode';

/**
 * Переключатель «Авто / Полная анимация / Облегчённый режим».
 * Ставит/снимает класс performance-mode на <html> без перезагрузки,
 * выбор сохраняется в localStorage. Ручной выбор («Полная» / «Облегчённый»)
 * приоритетнее автоопределения устройства.
 */
export default function PerformanceToggle() {
  const { setting, setSetting } = usePerformanceMode();

  const options: { value: PerformanceSetting; label: string; aria: string }[] = [
    { value: 'auto', label: 'Авто', aria: 'Автоматический режим производительности' },
    { value: 'full', label: 'Полная анимация', aria: 'Полная анимация' },
    { value: 'performance', label: 'Облегчённый режим', aria: 'Облегчённый режим' },
  ];

  return (
    <div
      role="group"
      aria-label="Режим производительности сайта"
      className="inline-flex items-center rounded-lg p-0.5 text-xs"
      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
    >
      {options.map((opt) => {
        const active = setting === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setSetting(opt.value)}
            aria-pressed={active}
            aria-label={opt.aria}
            className="px-3 py-1.5 rounded-md font-medium transition-colors"
            style={
              active
                ? { background: 'var(--color-crimson-600)', color: '#ffffff' }
                : { background: 'transparent', color: 'var(--text-muted)' }
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
