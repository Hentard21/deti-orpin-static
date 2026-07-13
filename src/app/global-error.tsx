'use client';

// Глобальный fallback: срабатывает, если упал сам layout.
// Стили инлайновые — глобальный CSS может быть недоступен.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a192f',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Что-то пошло не так</h1>
          <p style={{ color: '#a3b9d3', marginBottom: '24px' }}>
            Не удалось загрузить сайт. Проверьте соединение и попробуйте ещё раз.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: '#b71c1c',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Повторить
          </button>
        </div>
      </body>
    </html>
  );
}
