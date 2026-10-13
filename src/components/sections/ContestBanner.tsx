import Link from 'next/link';
import { creativeContest } from '@/data/october-program';
import ContestAvailability from './ContestAvailability';

export default function ContestBanner() {
  return <section className="programme-section programme-tint" id="contest">
    <div className="programme-container">
      <p className="programme-kicker">ВСЕРОССИЙСКИЙ ТВОРЧЕСКИЙ КОНКУРС</p>
      <div className="programme-heading"><h2>«{creativeContest.title}»</h2><Link href="/creativity/contests">Условия конкурса →</Link></div>
      <p className="mb-6">{creativeContest.audience}, {creativeContest.age}. Пять номинаций, индивидуальные и коллективные работы.</p>
      <ContestAvailability />
    </div>
  </section>;
}
