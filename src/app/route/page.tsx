import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';

const cities = [
  {
    city: 'Смоленск',
    date: 'Октябрь 2025',
    status: 'passed',
    description: 'Стартовый этап проекта',
    highlights: ['Встреча с ветеранами', 'Экскурсия по историческим местам', 'Торжественное открытие'],
  },
  {
    city: 'Волгоград',
    date: '31 мая - 02 июня 2026',
    status: 'current',
    description: 'Текущий этап — возложение венков на Мамаевом кургане',
    highlights: ['Возложение венков', 'Встреча с Героями России', 'Патриотический концерт'],
  },
  {
    city: 'Санкт-Петербург',
    date: 'Июль 2026',
    status: 'upcoming',
    description: 'Встреча с ветеранами и участие в параде',
    highlights: ['Парад на Дворцовой площади', 'Встреча с ветеранами ВОВ', 'Экскурсия по музеям'],
  },
  {
    city: 'Минск',
    date: 'Сентябрь 2026',
    status: 'upcoming',
    description: 'Межгосударственная встреча поколений',
    highlights: ['Межгосударственный форум', 'Встреча с ветеранами', 'Культурная программа'],
  },
  {
    city: 'Москва',
    date: 'Ноябрь 2026',
    status: 'upcoming',
    description: 'Финальный форум с Героями России',
    highlights: ['Итоговый форум', 'Награждение участников', 'Презентация результатов'],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'passed':
      return <CheckCircle size={24} className="text-green-600" />;
    case 'current':
      return <Clock size={24} className="text-crimson-600" />;
    case 'upcoming':
      return <Star size={24} className="text-gold-500" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'passed':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Завершён
        </span>
      );
    case 'current':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-crimson-600/15 text-crimson-600 border border-crimson-600/30">
          Текущий
        </span>
      );
    case 'upcoming':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-500/15 text-gold-600 border border-gold-500/30">
          Предстоящий
        </span>
      );
    default:
      return null;
  }
};

export default function RoutePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="hero-section hero-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="label-dark animate-fade-up">
              Маршрут проекта
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight animate-fade-up-delay" style={{ color: 'var(--text-primary)' }}>
              Календарь
              <br />
              <span className="text-crimson-500">мероприятий</span>
            </h1>

            <hr className="divider-ru max-w-xs mx-auto" />

            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              В течение 2025-2026 годов проект охватит ключевые города России и
              стран СНГ, объединяя ветеранов, Героев России и детей погибших
              военнослужащих.
            </p>
          </div>
        </div>
      </section>

      {/* Route Timeline */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Этапы маршрута
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Следите за продвижением проекта по городам России
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {cities.map((city, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < cities.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5" style={{ backgroundColor: 'var(--text-muted)', opacity: 0.3 }} />
                )}

                <div className="flex gap-6 mb-12">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                      style={{
                        backgroundColor: city.status === 'current' ? 'var(--color-crimson-600)' : 'var(--bg-secondary)',
                        borderColor: city.status === 'current' ? 'var(--color-crimson-600)' : 'var(--text-muted)',
                      }}>
                      {getStatusIcon(city.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow pb-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                          {city.city}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-crimson-600" />
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {city.date}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(city.status)}
                    </div>

                    <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {city.description}
                    </p>

                    <div className="space-y-2">
                      {city.highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-crimson-600)' }} />
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              География проекта
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Проект охватывает ключевые города России и стран СНГ
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="aspect-video rounded-xl border flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'rgba(15,27,46,0.10)' }}>
              <MapPin size={64} className="text-crimson-600 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="theme-panel-ru rounded-2xl p-12 md:p-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-white">
                Присоединяйтесь к проекту
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Станьте частью важного дела по воспитанию патриотизма и сохранению памяти о героях
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium text-white bg-crimson-600 hover:bg-crimson-700 transition-colors shadow-md shadow-crimson-600/20"
                >
                  Связаться с нами
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  Узнать больше
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
