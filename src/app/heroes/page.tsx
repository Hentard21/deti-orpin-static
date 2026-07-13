import Link from 'next/link';
import { ArrowRight, MapPin, Users, Heart, Star } from 'lucide-react';

const stats = [
  { value: '76', label: 'Писем от детей', icon: <Heart size={20} className="text-crimson-500" /> },
  { value: '47', label: 'Регионов России', icon: <MapPin size={20} className="text-crimson-500" /> },
  { value: '100+', label: 'Встреч с Героями', icon: <Users size={20} className="text-crimson-500" /> },
  { value: '254', label: 'Страниц памяти', icon: <Star size={20} className="text-crimson-500" /> },
];

const heroPlaceholders = [
  { title: 'Герой России', subtitle: 'Участник СВО', region: 'Новосибирская область' },
  { title: 'Герой России', subtitle: 'Участник СВО', region: 'Республика Хакасия' },
  { title: 'Герой России', subtitle: 'Участник СВО', region: 'Нижегородская область' },
];

export default function HeroesPage() {
  return (
    <div className="space-y-0">

      {/* ── Hero header ── */}
      <section className="hero-section hero-bg pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="label-dark animate-fade-up">Проект «Диалог поколений»</div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight animate-fade-up-delay" style={{ color: 'var(--text-primary)' }}>
              Герои <span className="text-crimson-500">России</span>
            </h1>
            <hr className="divider-ru max-w-xs mx-auto" />
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Живые примеры самопожертвования и гражданского мужества.
              Люди, ради которых дети пишут письма — и которые отвечают своей жизнью.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-10 ornament-top" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="font-heading font-bold text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Heroes grid ── */}
      <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="label-red mb-3">Участники проекта</div>
            <h2 className="font-heading text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Герои, с которыми встречаются дети
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroPlaceholders.map((h, i) => (
              <div key={i} className="card-dark rounded-xl overflow-hidden hover-lift">
                <div className="h-56 flex flex-col items-center justify-center gap-3 theme-bg-navy">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center font-heading font-bold text-2xl border-2"
                    style={{ borderColor: 'rgba(201,162,39,0.5)', background: 'rgba(201,162,39,0.08)', color: 'rgba(255,255,255,0.3)' }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>Фото появится</span>
                </div>
                <div className="p-6">
                  <div className="label-gold mb-2 text-xs">Герой России</div>
                  <h3 className="font-heading text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {h.subtitle}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <MapPin size={13} />
                    {h.region}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Letters teaser ── */}
      <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            style={{
              background: 'linear-gradient(135deg, var(--color-navy-900) 0%, var(--color-navy-800) 100%)',
              border: '1px solid rgba(201,162,39,0.20)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            }}
          >
            {/* Stacked letters visual */}
            <div className="relative w-40 h-48 flex-shrink-0 select-none">
              {[
                { rot: '-6deg', tx: '-18px', ty: '10px', z: 1, bg: '#f0e9d6' },
                { rot: '-2deg', tx: '-6px',  ty: '4px',  z: 2, bg: '#f7f2e4' },
                { rot:  '2deg', tx:  '0px',  ty: '0px',  z: 3, bg: '#fffdf7' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-lg"
                  style={{
                    transform: `rotate(${s.rot}) translateX(${s.tx}) translateY(${s.ty})`,
                    background: s.bg,
                    border: '1px solid rgba(201,162,39,0.4)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                    zIndex: s.z,
                  }}
                >
                  {i === 2 && (
                    <div className="p-4 h-full flex flex-col">
                      <div style={{ height: '2px', background: 'linear-gradient(90deg,#b8860b,#e8c96a,#b8860b)', borderRadius: '1px', marginBottom: '10px' }} />
                      <div className="space-y-1.5 flex-1">
                        {[90,75,85,60,80,65].map((w,j) => (
                          <div key={j} className="h-1 rounded-full" style={{ width:`${w}%`, background:'rgba(100,75,40,0.15)' }} />
                        ))}
                      </div>
                      <div className="text-right text-xs font-medium italic" style={{ color: '#9b7b3a' }}>
                        — с любовью
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="label-gold mb-3">Сборник</div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3" style={{ color: '#ffffff' }}>
                Письма памяти
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.70)' }}>
                76 детей из 47 регионов написали письма своим папам-героям.
                Каждое — живое свидетельство любви и памяти.
              </p>
              <Link
                href="/heroes/letters"
                className="inline-flex items-center gap-2 font-semibold rounded-lg px-6 py-3 transition duration-200"
                style={{ background: 'var(--color-crimson-600)', color: '#ffffff', boxShadow: '0 4px 20px rgba(183,28,28,0.35)' }}
              >
                Читать все письма <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <blockquote
            className="text-xl md:text-2xl font-medium leading-relaxed italic text-center p-8 rounded-xl"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderLeft: '3px solid var(--color-gold-500)',
              color: 'var(--text-primary)',
            }}
          >
            «Герои — это не просто люди, а живые примеры самопожертвования и
            гражданской ответственности. Общение с ними вдохновляет молодёжь
            на служение Отечеству».
          </blockquote>
          <div className="text-center mt-5">
            <div className="font-heading font-semibold" style={{ color: 'var(--color-gold-500)' }}>В.В. Путин</div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Президент Российской Федерации</div>
          </div>
        </div>
      </section>

    </div>
  );
}
