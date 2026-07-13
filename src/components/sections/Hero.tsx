import { Button } from '@/components/ui/Button';
import HeroVideo from '@/components/sections/HeroVideo';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Video background (клиентский компонент с постером-fallback) ── */}
      <HeroVideo />

      {/* ── Tint overlay: navy + crimson gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(5,13,26,0.55) 0%,
              rgba(10,25,47,0.72) 40%,
              rgba(5,13,26,0.90) 100%
            )
          `,
        }}
      />
      {/* Crimson left-side bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 8% 50%, rgba(183,28,28,0.28) 0%, transparent 65%)',
        }}
      />
      {/* Gold right subtle warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 55% at 92% 25%, rgba(201,162,39,0.10) 0%, transparent 60%)',
        }}
      />
      {/* Bottom fade to site bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full pt-24 pb-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">

            <div
              data-heavy-effect
              className="animate-fade-up inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: 'rgba(255,255,255,0.14)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.55)',
                color: '#ffffff',
                textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              }}
            >
              Всероссийский проект
            </div>

            <h1
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-up-delay"
              style={{ color: '#ffffff', textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
            >
              «Диалог поколений:
              <br />
              <span className="text-crimson-500">Герои и дети</span>»
            </h1>

            <hr className="divider-ru max-w-xs mx-auto" />

            <p
              className="text-xl max-w-3xl mx-auto leading-relaxed animate-fade-up-delay"
              style={{ color: 'rgba(255,255,255,0.82)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
            >
              Создаём пространство для общения, где дети погибших военнослужащих
              встречаются с Героями России — формируем патриотическое сознание
              будущих поколений.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Поддержать проект
              </Button>
              <button
                data-heavy-effect
                className="btn-hero-video inline-flex items-center justify-center font-medium rounded-lg px-8 py-4 text-lg"
              >
                Узнать больше
              </button>
            </div>

            {/* ── Blockquote glass card ── */}
            <div
              data-heavy-effect
              className="mt-16 p-8 rounded-xl max-w-4xl mx-auto"
              style={{
                background: 'rgba(10,25,47,0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderLeft: '3px solid var(--color-gold-500)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
              }}
            >
              <blockquote
                className="text-xl md:text-2xl font-medium leading-relaxed italic"
                style={{ color: 'rgba(255,255,255,0.92)' }}
              >
                «Герои — это не просто люди, а живые примеры самопожертвования и
                гражданской ответственности. Общение с ними вдохновляет молодёжь
                на служение Отечеству и помогает формировать истинную гражданскую
                позицию».
              </blockquote>
              <div
                className="mt-6 font-heading font-semibold"
                style={{ color: 'var(--color-gold-400)' }}
              >
                В.В. Путин
              </div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Президент Российской Федерации
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
