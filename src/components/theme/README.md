# Theme Toggle System

## Описание

Реализована система переключения между тёмной и светлой темой с использованием React Context API и CSS Custom Properties (CSS Variables).

## Компоненты

### 1. ThemeProvider (`src/components/theme/ThemeProvider.tsx`)
Провайдер, который обёртывает приложение и предоставляет context для управления темой.

**Функциональность:**
- Сохранение выбранной темы в `localStorage`
- Установка атрибута `data-theme` на элемент `<html>`
- Использование системного предпочтения темы, если пользователь ещё не выбирал
- Экспорт hook `useTheme()` для доступа к теме и функции переключения

### 2. ThemeToggle (`src/components/theme/ThemeToggle.tsx`)
Кнопка для переключения между темами.

**Функциональность:**
- Плавная анимация при переключении между темами
- Солнышко (☀️) для светлой темы (голубого цвета)
- Луна (🌙) для тёмной темы (золотого цвета с глоу эффектом)
- Адаптивный стиль кнопки в зависимости от текущей темы

## Использование

### В компонентах

```tsx
'use client';

import { useTheme } from '@/components/theme/ThemeProvider';

export default function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Текущая тема: {theme}</p>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
}
```

### Стили

Используйте CSS переменные в стилях для адаптации к теме:

```css
/* Тёмная тема (по умолчанию) */
:root,
[data-theme='dark'] {
  --text-primary: #ffffff;
  --bg-primary: #0a192f;
  /* ... другие переменные */
}

/* Светлая тема */
[data-theme='light'] {
  --text-primary: #0f1b2e;
  --bg-primary: #ffffff;
  /* ... другие переменные */
}
```

Затем используйте переменные в классах:

```css
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## CSS Переменные

Доступные переменные для обеих тем:

- `--text-primary` - основной цвет текста
- `--text-secondary` - вторичный цвет текста
- `--text-muted` - приглушённый цвет текста
- `--bg-primary` - основной фон
- `--bg-secondary` - вторичный фон
- `--bg-tertiary` - третичный фон
- `--color-navy-*` - оттенки синего
- `--color-crimson-*` - оттенки красного (патриотизм)
- `--color-gold-*` - оттенки золота (акценты)
- `--glass-navy` - стиль стекло для тёмной темы
- `--glass-dark` - тёмное стекло
- `--glass-gold` - золотистое стекло
- `--scrollbar-track` - трек скролбара
- `--scrollbar-thumb` - большой палец скролбара

## Структура Layout

```tsx
// src/app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <ClientHeader />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

```tsx
// src/app/providers.tsx
'use client';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

## Особенности дизайна

### Светлая тема:
- ☀️ Солнышко в голубом цвете (#1565C0)
- Белый фон с мягкими градиентами
- Мягкие тени
- Хорошая контрастность для читаемости
- Сохранены элементы патриотизма

### Тёмная тема:
- 🌙 Луна в золотом цвете (#d4b045) с эффектом свечения
- Тёмно-синий фон (navy)
- Глубокие тени и глоу эффекты
- Красные и золотые акценты выделяются
- Патриотическая палитра

## Сохранение состояния

Выбранная тема автоматически сохраняется в `localStorage` под ключом `theme` и восстанавливается при следующем посещении.

## Браузерная поддержка

- Работает во всех современных браузерах
- CSS Variables поддерживаются во всех браузерах кроме IE11
- localStorage поддерживается во всех браузерах кроме приватного режима некоторых браузеров
