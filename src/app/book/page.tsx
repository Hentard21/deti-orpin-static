import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, BookOpen, Download, MapPin, Users } from 'lucide-react';
import BookReader from '@/components/book/BookReader';
import manifest from '@/data/book-manifest.json';
import { withBasePath } from '@/lib/paths';

export const metadata: Metadata = {
  title: 'Книга «Письма памяти»',
  description: 'Электронная версия всероссийской книги «Письма памяти» — истории семей и письма детей героям.',
};

export default function BookPage() {
  return (
    <div className="book-site">
      <section className="book-hero">
        <div className="book-hero-glow" aria-hidden="true" />
        <div className="book-container book-hero-grid">
          <div className="book-cover-wrap">
            <div className="book-cover-shadow" aria-hidden="true" />
            <Image
              src={withBasePath(manifest.cover)}
              alt="Обложка книги «Письма памяти»"
              width={1430}
              height={1100}
              priority
              unoptimized
              className="book-cover"
            />
          </div>
          <div className="book-hero-copy">
            <p className="book-kicker">ВСЕРОССИЙСКАЯ КНИГА</p>
            <h1>Письма памяти</h1>
            <p className="book-hero-subtitle">Голоса детей героев, семейные фотографии и подлинные рукописи — в одном документальном издании.</p>
            <div className="book-stat-row" aria-label="О книге">
              <div><Users /><strong>{manifest.familyCount}</strong><span>семейных историй</span></div>
              <div><BookOpen /><strong>{manifest.interiorPages}</strong><span>внутренних страниц</span></div>
              <div><MapPin /><strong>Вся Россия</strong><span>от Калининграда до Камчатки</span></div>
            </div>
            <div className="book-hero-actions">
              <a href="#book-reader-title" className="book-primary-action">Листать книгу <ArrowDown size={18} /></a>
              <a href={withBasePath(manifest.download)} download className="book-secondary-action"><Download size={18} /> Скачать PDF</a>
            </div>
            <p className="book-status-note">{manifest.reviewNotice}</p>
          </div>
        </div>
      </section>

      <section className="book-intro">
        <div className="book-container book-intro-grid">
          <p className="book-kicker">О КНИГЕ</p>
          <blockquote>«Пока эти письма читают, память продолжается»</blockquote>
          <div>
            <p>Каждая история соединяет портрет героя, голос ребёнка, семейный архив и физическую рукопись. Электронный просмотр сохраняет утверждённую композицию печатных разворотов.</p>
            <a href="#book-reader-title">Перейти к интерактивному содержанию</a>
          </div>
        </div>
      </section>

      <BookReader manifest={manifest} />
    </div>
  );
}
