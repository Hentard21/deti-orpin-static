'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { contestPhase, creativeContest } from '@/data/october-program';

// A static export must not freeze a deadline status at build time.
export function useContestPhase() {
  const [phase, setPhase] = useState<ReturnType<typeof contestPhase> | null>(null);
  useEffect(() => {
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
  return <div className="space-y-4" aria-live="polite">
    <p>Приём работ: {creativeContest.start} — {creativeContest.deadline} (московское время).</p>
    {phase === 'open' && <Link className="programme-button" href="/creativity/contests/apply">Как подать работу</Link>}
    {phase === 'closed' && <p className="font-semibold">Приём работ завершён. Следите за сообщениями оргкомитета об итогах.</p>}
    {phase === 'before' && <p>Приём работ ещё не начался.</p>}
  </div>;
}
