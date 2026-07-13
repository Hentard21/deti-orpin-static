/**
 * Централизованный механизм «облегчённого режима» (performance mode).
 *
 * Режим включается классом `performance-mode` на <html>. Класс ставится:
 *  1. Inline-скриптом в <head> (PERF_BOOTSTRAP_SCRIPT) — до первой отрисовки,
 *     чтобы не было вспышки тяжёлых эффектов на слабых устройствах.
 *  2. Вручную пользователем через setPerformanceSetting() — сохраняется в localStorage.
 *
 * Настройка пользователя: 'auto' | 'full' | 'performance'.
 * Ручной выбор ('full'/'performance') всегда приоритетнее автоопределения.
 *
 * Автоопределение по приоритетам:
 *  — однозначно включаем: Windows 7 и старее, Chrome/Chromium ≤ 109,
 *    prefers-reduced-motion: reduce;
 *  — вероятно слабое устройство: одновременно мало ядер (≤4) И мало памяти (≤4 ГБ).
 *    По одному из этих признаков режим НЕ включается — иначе под него ошибочно
 *    попадают современные телефоны с 4 ядрами.
 *
 * Все функции безопасны для SSR: на сервере ничего не делают и возвращают false.
 */

export type PerformanceSetting = 'auto' | 'full' | 'performance';

export const PERF_CLASS = 'performance-mode';
export const PERF_STORAGE_KEY = 'perf-mode';
export const PERF_EVENT = 'perfmodechange';

/** Текущее состояние режима (по классу на <html>). SSR → false. */
export function isPerformanceMode(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains(PERF_CLASS);
}

/** Сохранённая настройка пользователя. SSR → 'auto'. */
export function getPerformanceSetting(): PerformanceSetting {
  if (typeof window === 'undefined') return 'auto';
  try {
    const saved = localStorage.getItem(PERF_STORAGE_KEY);
    if (saved === 'performance' || saved === 'on') return 'performance'; // 'on' — старый формат
    if (saved === 'full' || saved === 'off') return 'full'; // 'off' — старый формат
  } catch {}
  return 'auto';
}

/** Применяет настройку и сохраняет её. 'auto' → решает автоопределение. */
export function setPerformanceSetting(setting: PerformanceSetting): void {
  if (typeof document === 'undefined') return;
  const on = setting === 'performance' || (setting === 'auto' && detectLowEndDevice());
  document.documentElement.classList.toggle(PERF_CLASS, on);
  try {
    localStorage.setItem(PERF_STORAGE_KEY, setting);
  } catch {
    // localStorage может быть недоступен (приватный режим) — режим всё равно применится до перезагрузки
  }
  window.dispatchEvent(new Event(PERF_EVENT));
}

/** Автоопределение слабого устройства (только на клиенте). */
export function detectLowEndDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  // Однозначные признаки
  const ua = navigator.userAgent || '';
  const oldWindows = /Windows NT (5\.\d|6\.[01])/.test(ua); // XP / Vista / 7
  const chromeMatch = ua.match(/Chrom(?:e|ium)\/(\d+)/);
  const oldChromium = !!chromeMatch && parseInt(chromeMatch[1], 10) <= 109;
  let reducedMotion = false;
  try {
    reducedMotion =
      !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {}
  if (oldWindows || oldChromium || reducedMotion) return true;

  // Вероятно слабое устройство: мало ядер И мало памяти одновременно.
  // deviceMemory доступен не везде; без него по одним ядрам не решаем.
  const lowCpu =
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency > 0 &&
    navigator.hardwareConcurrency <= 4;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  return lowCpu && lowMemory;
}

/**
 * Скрипт для <head>: применяет режим до первой отрисовки.
 * Логика продублирована в ES5-синтаксисе, чтобы выполняться даже
 * в очень старых браузерах без поддержки современного JS.
 */
export const PERF_BOOTSTRAP_SCRIPT = `
(function () {
  try {
    var d = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem('${PERF_STORAGE_KEY}'); } catch (e) {}
    var on;
    if (saved === 'performance' || saved === 'on') { on = true; }
    else if (saved === 'full' || saved === 'off') { on = false; }
    else {
      var ua = navigator.userAgent || '';
      var oldWindows = /Windows NT (5\\.\\d|6\\.[01])/.test(ua);
      var m = ua.match(/Chrom(?:e|ium)\\/(\\d+)/);
      var oldChromium = !!m && parseInt(m[1], 10) <= 109;
      var reduced = false;
      try {
        reduced = !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (e) {}
      var lowCpu = typeof navigator.hardwareConcurrency === 'number' &&
        navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
      var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
      on = oldWindows || oldChromium || reduced || (lowCpu && lowMemory);
    }
    if (on) { d.className += ' ${PERF_CLASS}'; }
  } catch (e) {}
})();
`;
