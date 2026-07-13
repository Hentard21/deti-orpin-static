'use client';

import { useEffect, useState } from 'react';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';
import { withBasePath } from '@/lib/paths';

/**
 * Фоновое видео главного экрана.
 *
 * - Статичный постер всегда в разметке: виден до загрузки видео,
 *   в облегчённом режиме, в старых браузерах и без JavaScript.
 * - <video> создаётся только после первого рендера на клиенте
 *   и НИКОГДА не создаётся в performance mode — файл не загружается
 *   даже скрытым.
 * - preload="metadata" вместо preload="auto".
 */
export default function HeroVideo() {
  const { enabled: performanceMode } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showVideo = mounted && !performanceMode && !videoFailed;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Постер-fallback (первый кадр видео) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${withBasePath('/hero-poster.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'var(--color-navy-900)',
        }}
      />
      {showVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={withBasePath('/hero-poster.jpg')}
          onError={() => setVideoFailed(true)}
        >
          <source src={withBasePath('/deti.mp4')} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
