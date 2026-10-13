import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import manifest from '@/data/book-manifest.json';
import { withBasePath } from '@/lib/paths';

export default function BookFeature() {
  return <section className="book-feature">
    <div className="book-container book-feature-grid">
      <Link href="/book" prefetch={false} className="book-feature-cover" aria-label="Открыть книгу «Письма памяти»">
        <Image src={withBasePath(manifest.cover)} alt="Обложка книги «Письма памяти»" width={1430} height={1100} unoptimized />
      </Link>
      <div className="book-feature-copy">
        <p className="book-kicker">ПИСЬМА ДЕТЕЙ ГЕРОЕВ</p>
        <h2>Письма памяти</h2>
        <p>Подлинные рукописи, семейные фотографии и истории {manifest.familyCount} семей. На компьютере книгу можно листать разворотами, на телефоне — по одной странице.</p>
        <div className="book-feature-meta"><span>{manifest.interiorPages} страниц</span><span>{manifest.familyCount} семей</span><span>Электронная версия</span></div>
        <Link href="/book" prefetch={false} className="book-primary-action">Открыть книгу <ArrowRight size={18} /></Link>
      </div>
    </div>
  </section>;
}
