import { Palette, PenLine, BookOpen, Map, ArrowRight, Star, Upload } from 'lucide-react';
import Link from 'next/link';
import ContestBanner from '@/components/sections/ContestBanner';

const categories = [
  {
    icon: <Palette size={40} className="text-crimson-600" />,
    title: 'Рисунки',
    description: 'Живопись, графика, иллюстрации на патриотическую тему — виды родного края, портреты героев, сцены из истории Отечества.',
    count: 'Творческое направление',
    color: 'from-crimson-600/20 to-crimson-700/5',
  },
  {
    icon: <PenLine size={40} className="text-crimson-600" />,
    title: 'Стихи о Родине',
    description: 'Поэзия о любви к России, о подвиге защитников Отечества, о красоте родной земли и гордости за свою страну.',
    count: 'Творческое направление',
    color: 'from-gold-600/20 to-gold-500/5',
  },
  {
    icon: <BookOpen size={40} className="text-crimson-600" />,
    title: 'Патриотические эссе',
    description: 'Размышления о смысле служения Отечеству, о памяти героев, об ответственности молодого поколения перед страной.',
    count: 'Творческое направление',
    color: 'from-navy-700/30 to-navy-800/10',
  },
  {
    icon: <Map size={40} className="text-crimson-600" />,
    title: 'Исторические исследования',
    description: 'Краеведческие работы об истории родного края, биографии местных героев, описание памятных мест и событий.',
    count: 'Творческое направление',
    color: 'from-gold-500/15 to-crimson-600/10',
  },
];

const featuredWorks = [
  {
    category: 'Рисунки',
    title: 'Защитники Отечества',
    author: 'Мария К., 14 лет',
    region: 'Москва',
    tag: 'Победитель',
  },
  {
    category: 'Стихи о Родине',
    title: 'Письмо герою',
    author: 'Андрей П., 16 лет',
    region: 'Санкт-Петербург',
    tag: 'Лауреат',
  },
  {
    category: 'Эссе',
    title: 'Что значит быть гражданином',
    author: 'Елена В., 15 лет',
    region: 'Волгоград',
    tag: 'Лауреат',
  },
  {
    category: 'Исследование',
    title: 'Герои нашего города',
    author: 'Дмитрий С., 17 лет',
    region: 'Екатеринбург',
    tag: 'Победитель',
  },
  {
    category: 'Рисунки',
    title: 'Вечный огонь',
    author: 'Анна Т., 13 лет',
    region: 'Казань',
    tag: null,
  },
  {
    category: 'Стихи о Родине',
    title: 'Берёзы России',
    author: 'Иван М., 15 лет',
    region: 'Новосибирск',
    tag: null,
  },
];

const steps = [
  { num: '01', title: 'Создайте работу', desc: 'Подготовьте произведение в одной из пяти номинаций конкурса «Моя Родина — Россия».' },
  { num: '02', title: 'Оформите заявку', desc: 'Направьте работу и установленную заявку на anocentrdetei@yandex.ru до 15 октября 2026 года включительно.' },
  { num: '03', title: 'Пройдите отбор', desc: 'Жюри рассмотрит все работы и выберет лучшие для публикации.' },
  { num: '04', title: 'Получите признание', desc: 'Победители и лауреаты получат дипломы и призы проекта.' },
];

export default function CreativityPage() {
  return (
    <div className="space-y-0">

      {/* Hero */}
      <section className="hero-section hero-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="label-dark animate-fade-up">
              Творчество
            </div>

            <h1
              className="font-heading text-4xl md:text-6xl font-bold leading-tight animate-fade-up-delay"
              style={{ color: 'var(--text-primary)' }}
            >
              Площадка для
              <br />
              <span className="text-crimson-500">творческих работ</span>
            </h1>

            <hr className="divider-ru max-w-xs mx-auto" />

            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Публикуем рисунки, стихи о Родине, патриотические эссе и
              исторические исследования участников проекта «Диалог поколений»
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/creativity/contests"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-lg bg-crimson-600 text-white hover:bg-crimson-700 transition-colors shadow-lg shadow-crimson-600/20"
              >
                Конкурсы <ArrowRight size={20} />
              </Link>
              <a
                href="#submit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-lg btn-hero-outline border-2 transition-colors"
              >
                Подать работу <Upload size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContestBanner />

      {/* Categories */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <span className="label-red mb-6 inline-block">Номинации</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Четыре направления
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Выбери то, что тебе ближе всего — и расскажи о любви к Родине своим языком
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60`}
                />
                <div className="relative">
                  <div className="mb-5">{cat.icon}</div>
                  <h3 className="font-heading text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {cat.title}
                  </h3>
                  <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {cat.description}
                  </p>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-gold-500)' }}>
                    {cat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <span className="label-red mb-6 inline-block">Галерея</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Избранные работы
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Лучшие произведения участников проекта из разных регионов России
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredWorks.map((work, i) => (
              <div
                key={i}
                className="group rounded-2xl border overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
              >
                {/* Placeholder art area */}
                <div
                  className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, var(--color-navy-800) 0%, var(--color-navy-900) 100%)' }}
                >
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ background: 'linear-gradient(45deg, #b71c1c 0%, #c9a227 100%)' }}
                  />
                  <span className="relative font-heading font-bold text-5xl opacity-10" style={{ color: 'var(--text-primary)' }}>
                    {work.category[0]}
                  </span>
                  {work.tag && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: 'var(--color-gold-500)', color: '#0a192f' }}>
                      <Star size={12} fill="currentColor" />
                      {work.tag}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-crimson-600)' }}>
                    {work.category}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-crimson-500 transition-colors"
                    style={{ color: 'var(--text-primary)' }}>
                    {work.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {work.author}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {work.region}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to submit */}
      <section id="submit" className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <span className="label-red mb-6 inline-block">Участие</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Как подать работу
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Четыре простых шага — и твоя работа попадёт на главную площадку проекта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 font-heading font-bold text-xl"
                  style={{ background: 'linear-gradient(135deg, #b71c1c, #c9a227)', color: '#fff' }}
                >
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute mt-[-2.5rem] ml-[4.5rem] w-full h-px"
                    style={{ backgroundColor: 'var(--border-color)' }} />
                )}
                <h3 className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Panel */}
          <div className="max-w-3xl mx-auto">
            <div className="theme-panel-ru rounded-2xl p-10 md:p-14 text-center">
              <Upload size={48} className="mx-auto mb-6 opacity-80" style={{ color: 'var(--color-gold-400)' }} />
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                Готовы поделиться своим творчеством?
              </h3>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Отправьте работу на конкурс и станьте частью большой истории
                патриотического творчества России
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/creativity/contests"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg bg-white transition-colors hover:bg-gray-100"
                  style={{ color: '#b71c1c' }}
                >
                  Посмотреть конкурсы <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  Связаться с нами
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
