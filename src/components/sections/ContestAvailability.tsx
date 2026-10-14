'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { contestPhase, creativeContest } from '@/data/october-program';

// A static export must not freeze a deadline status at build time.
export function useContestPhase() {
  const [phase, setPhase] = useState<ReturnType<typeof contestPhase> | null>(creativeContest.scheduleStatus === 'pending' ? 'pending' : null);
  useEffect(() => {
    if (creativeContest.scheduleStatus === 'pending') return;
    const update = () => setPhase(contestPhase(new Date()));
    update();
    const timer = window.setInterval(update, 60000);
    window.addEventListener('focus', update);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', update); };
  }, []);
  return phase;
}

export default function ContestAvailability() {
  const phase = useContestPhase();
  if (creativeContest.scheduleStatus === 'pending') return <div className="space-y-4" aria-live="polite">
    <p className="font-semibold">Новые сроки конкурса уточняются.</p>
    <p>Подача работ через сайт временно недоступна. Обновлённые даты и условия сообщит оргкомитет.</p>
  </div>;
  return <div className="space-y-4" aria-live="polite">
    <p>Приём работ: {creativeContest.start} — {creativeContest.deadline} (московское время).</p>
    {phase === 'open' && <Link className="programme-button" href="/creativity/contests/apply">Как подать работу</Link>}
    {phase === 'closed' && <p className="font-semibold">Приём работ завершён. Следите за сообщениями оргкомитета об итогах.</p>}
    {phase === 'before' && <p>Приём работ ещё не начался.</p>}
  </div>;
}
