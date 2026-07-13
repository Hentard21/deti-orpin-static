import Link from 'next/link';
import { Video, Palette, FileText, Trophy, ArrowRight, Calendar } from 'lucide-react';

const nominations = [
  {
    icon: <Video size={36} className="text-crimson-500" />,
    title: 'Лучшее видео',
    desc: 'Документальный или художественный ролик о Родине, о героях, о памятных местах. До 10 минут, форматы MP4, MOV.',
    badge: 'Видео',
    accent: 'from-crimson-700/25 to-crimson-600/5',
  },
  {
    icon: <Palette size={36} className="text-gold-400" />,
    title: 'Лучший рисунок',
    desc: 'Живопись, графика, цифровая иллюстрация на патриотическую тему. Принимаются JPG/PNG с разрешением от 1200 px.',
    badge: 'Рисунок',
    accent: 'from-gold-600/20 to-gold-500/5',
  },
  {
    icon: <FileText size={36} className="text-navy-200" />,
    title: 'Лучший рассказ',
    desc: 'Прозаическое произведение: рассказ, эссе, воспоминание. Объём — от 1 до 10 страниц, форматы DOCX, PDF.',
    badge: 'Рассказ',
    accent: 'from-navy-700/40 to-navy-800/5',
  },
];

export default function ContestBanner() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Decorative background glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(183,28,28,0.10) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-4 relative">

        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ backgroundColor: 'rgba(183,28,28,0.12)', color: 'var(--color-crimson-600)', border: '1px solid rgba(183,28,28,0.25)' }}>
            <Trophy size={13} /> Объявляем конкурс
          </div>

          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
            «Диалог поколений»
            <br />
            <span className="text-crimson-500">в твоём творчестве</span>
          </h2>

          <hr className="divider-ru max-w-xs mx-auto mb-6" />

          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Три номинации — одна большая история о любви к Родине.
            Участвуй, побеждай, попади в зал славы проекта.
          </p>

          {/* Deadline badge */}
          <div className="inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            <Calendar size={15} className="text-crimson-600" />
            Приём работ до <strong className="ml-1" style={{ color: 'var(--text-primary)' }}>1 октября 2026</strong>
          </div>
        </div>

        {/* Nomination cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {nominations.map((nom, i) => (
            <div
              key={i}
              className="relative rounded-2xl border overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl group"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
            >
              {/* Top line accent */}
              <div className="h-0.5 w-full" style={{ background: 'linear-gradient(to right, #b71c1c, #c9a227)' }} />

              {/* Background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${nom.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative p-8">
                <div className="mb-5">{nom.icon}</div>

                <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ backgroundColor: 'rgba(183,28,28,0.10)', color: 'var(--color-crimson-600)' }}>
                  {nom.badge}
                </div>

                <h3 className="font-heading text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {nom.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {nom.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/creativity/contests/apply"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-lg text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #b71c1c 0%, #9b1515 100%)', boxShadow: '0 8px 24px rgba(183,28,28,0.35)' }}
          >
            <Trophy size={22} />
            Подать заявку на конкурс
            <ArrowRight size={20} />
          </Link>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Участие бесплатное · Возраст 10–18 лет · Все регионы России
          </p>
        </div>

      </div>
    </section>
  );
}
