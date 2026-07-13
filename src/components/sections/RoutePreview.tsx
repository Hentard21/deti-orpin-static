import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const cities = [
  {
    city: 'Смоленск',
    date: 'Октябрь 2025',
    status: 'passed',
    description: 'Стартовый этап проекта',
  },
  {
    city: 'Волгоград',
    date: '31 мая - 02 июня 2026',
    status: 'current',
    description: 'Текущий этап — возложение венков на Мамаевом кургане',
  },
  {
    city: 'Санкт-Петербург',
    date: 'Июль 2026',
    status: 'upcoming',
    description: 'Встреча с ветеранами и участие в параде',
  },
  {
    city: 'Минск',
    date: 'Сентябрь 2026',
    status: 'upcoming',
    description: 'Межгосударственная встреча поколений',
  },
  {
    city: 'Москва',
    date: 'Ноябрь 2026',
    status: 'upcoming',
    description: 'Финальный форум с Героями России',
  },
];

export default function RoutePreview() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Календарь мероприятия
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            В течение 2025-2026 годов проект охватит ключевые города России и
            стран СНГ, объединяя ветеранов, Героев России и детей погибших
            военнослужащих.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {cities.map((city, index) => (
            <Link
              key={index}
              href="/route"
              className={`group relative overflow-hidden rounded-xl border-2 transition duration-300 hover:-translate-y-1 ${
                city.status === 'current'
                  ? 'border-crimson-600 shadow-lg shadow-crimson-600/10'
                  : city.status === 'passed'
                  ? 'border-gray-200'
                  : 'border-gray-100 hover:border-crimson-600'
              }`}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      city.status === 'current'
                        ? 'bg-crimson-600 text-white'
                        : city.status === 'passed'
                        ? 'bg-gray-200 text-gray-600'
                        : 'theme-bg-navy text-white'
                    }`}
                  >
                    {city.status === 'passed' ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : city.status === 'current' ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                      >
                        <path d="M12 4V2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                    )}
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {city.city}
                </h3>

                <div className="flex items-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar size={16} className="mr-2 text-crimson-600" />
                  <span className="text-sm">{city.date}</span>
                </div>

                <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'var(--text-muted)' }}>
                  {city.description}
                </p>

                <div className="flex items-center mt-auto pt-4 border-t border-gray-200 group-hover:border-crimson-200 transition-colors">
                  {city.status !== 'passed' && (
                    <>
                      <span
                        className={`text-sm font-medium ${
                          city.status === 'current'
                            ? 'text-crimson-600'
                            : 'text-crimson-700'
                        }`}
                      >
                        Подробнее
                      </span>
                      <ArrowRight
                        size={16}
                        className={`ml-2 ${
                          city.status === 'current'
                            ? 'text-crimson-600'
                            : 'text-crimson-700'
                        }`}
                      />
                    </>
                  )}
                </div>
              </div>

              {city.status === 'current' && (
                <div className="absolute top-0 right-0 bg-crimson-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  ТЕКУЩИЙ ЭТАП
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/route"
            className="inline-flex items-center font-medium text-crimson-600 hover:text-crimson-700"
          >
            Полный маршрут проекта
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
