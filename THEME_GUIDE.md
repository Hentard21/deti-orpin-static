# 🎨 Система переключения темы - Руководство

## 🚀 Быстрый старт

Тумблер для переключения между светлой и тёмной темой уже встроен в Header справа.

### Использование в компонентах

```tsx
'use client';

import { useTheme } from '@/components/theme/ThemeProvider';

export default function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Текущая тема: {theme}</p>
      <button onClick={toggleTheme}>Переключить</button>
    </div>
  );
}
```

## 🎯 Стилизация под тему

### Способ 1: CSS Variables (рекомендуется)

```css
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

### Способ 2: Inline styles

```tsx
<div style={{ color: 'var(--text-primary)' }}>Текст</div>
```

### Способ 3: Tailwind классы

```tsx
<div className="text-white dark:text-black">Текст</div>
```

## 📋 Доступные CSS переменные

### Текст
- `--text-primary` - основной цвет текста
- `--text-secondary` - вторичный цвет
- `--text-muted` - приглушённый цвет

### Фон
- `--bg-primary` - основной фон
- `--bg-secondary` - вторичный фон
- `--bg-tertiary` - третичный фон

### Цвета бренда
- `--color-navy-950` до `--color-navy-50` - оттенки синего
- `--color-crimson-700` до `--color-crimson-400` - красный (патриотизм)
- `--color-gold-600` до `--color-gold-300` - золото (акценты)

### Glass Morphism
- `--glass-navy` - стиль стекла (темное)
- `--glass-dark` - тёмное стекло
- `--glass-gold` - золотистое стекло

## 🌙 Тёмная тема (по умолчанию)

```
[data-theme='dark']
```

- Фон: Глубокий navy (#0a192f)
- Текст: Белый (#ffffff)
- Акценты: Красный (#b71c1c) + Золото (#c9a227)
- Иконка: 🌙 Луна (золотая)

## ☀️ Светлая тема

```
[data-theme='light']
```

- Фон: Белый (#ffffff)
- Текст: Тёмный navy (#0f1b2e)
- Акценты: Красный (#d43333) + Золото (#d4b045)
- Иконка: ☀️ Солнышко (голубое)

## 💾 Сохранение выбора

Выбранная тема автоматически сохраняется в `localStorage` под ключом `theme`:

```typescript
localStorage.getItem('theme') // 'light' | 'dark'
localStorage.setItem('theme', 'light')
```

## 🎬 Анимации

Все переходы между темами имеют плавную анимацию (0.3s ease):

```css
transition: background-color 0.3s ease, color 0.3s ease;
```

## 🧪 Тестирование

1. Откройте сайт
2. Нажмите на иконку в правом углу хедера
3. Проверьте смену темы
4. Перезагрузите страницу - тема должна сохраниться

## 📱 Мобильная версия

Тумблер доступен на всех устройствах. На мобильных он находится в том же месте (справа в хедере).

## ⚙️ Изменение темы вручную

Если нужно установить тему программно:

```tsx
// В компоненте с использованием useTheme
const { toggleTheme } = useTheme();

// или напрямую через DOM
document.documentElement.setAttribute('data-theme', 'light');
localStorage.setItem('theme', 'light');
```

## 🐛 Решение проблем

### Тема не сохраняется
- Проверьте, включен ли localStorage в браузере

### Компонент не видит тему
- Убедитесь, что компонент использует `'use client'`
- Проверьте, что компонент находится внутри Providers

### Стили не применяются
- Используйте `var(--variable-name)` в CSS
- Или используйте inline styles с `var()`

## 📚 Дополнительная информация

- [README в компоненте](/src/components/theme/README.md)
- [Tailwind Config](/tailwind.config.js)
- [Global Styles](/styles/globals.css)
