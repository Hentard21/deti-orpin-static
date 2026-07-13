'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  isPerformanceMode,
  getPerformanceSetting,
  setPerformanceSetting,
  PERF_EVENT,
  type PerformanceSetting,
} from '@/lib/performance-mode';

/**
 * Клиентский хук облегчённого режима.
 * На сервере и при первом рендере возвращает enabled=false, setting='auto'
 * (SSR-safe), после монтирования синхронизируется с классом на <html>
 * и реагирует на переключение без перезагрузки страницы.
 */
export function usePerformanceMode() {
  const [enabled, setEnabled] = useState(false);
  const [setting, setSettingState] = useState<PerformanceSetting>('auto');

  useEffect(() => {
    const sync = () => {
      setEnabled(isPerformanceMode());
      setSettingState(getPerformanceSetting());
    };
    sync();
    window.addEventListener(PERF_EVENT, sync);
    return () => window.removeEventListener(PERF_EVENT, sync);
  }, []);

  const setSetting = useCallback((next: PerformanceSetting) => {
    setPerformanceSetting(next);
  }, []);

  /** @deprecated совместимость со старым API: on/off → performance/full */
  const setMode = useCallback((on: boolean) => {
    setPerformanceSetting(on ? 'performance' : 'full');
  }, []);

  return { enabled, setting, setSetting, setMode };
}
