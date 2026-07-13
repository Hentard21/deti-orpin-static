'use client';

import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition duration-300"
      style={{
        background: theme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(21, 101, 192, 0.1)',
        border: theme === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.12)'
          : '1px solid rgba(21, 101, 192, 0.2)',
        boxShadow: theme === 'dark'
          ? '0 0 12px rgba(201, 162, 39, 0.15)'
          : '0 0 12px rgba(21, 101, 192, 0.1)',
      }}
      aria-label="Переключить тему"
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Солнце для светлой темы */}
        <Sun
          size={20}
          className="absolute transition duration-300 text-blue-600"
          style={{
            opacity: theme === 'light' ? 1 : 0,
            transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0)',
          }}
        />
        
        {/* Луна для тёмной темы */}
        <Moon
          size={20}
          className="absolute transition duration-300"
          style={{
            color: theme === 'dark' ? '#d4b045' : '#1565C0',
            opacity: theme === 'dark' ? 1 : 0,
            transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(180deg) scale(0)',
          }}
        />
      </div>
    </button>
  );
}
