import { Trophy, Calendar, MapPin, Users, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const activeContests = [
  {
    title: 'Моя Россия — моя гордость',
    type: 'Рисунки и иллюстрации',
    deadline: '1 сентября 2026',
    ageGroup: '10–17 лет',
    prizes: ['Диплом I степени + планшет', 'Диплом II степени + сертификат', 'Диплом III степени + памятный подарок'],
    description: 'Покажи свой взгляд на красоту России — виды родного края, памятные места, образы героев в изобразительном искусстве.',
    isNew: true,
  },
  {
    title: 'Слово о Родине',
    type: 'Стихи и эссе',
    deadline: '15 сентября 2026',
    ageGroup: '12–18 лет',
    prizes: ['Диплом I степени + ноутбук', 'Диплом II степени + сертификат', 'Диплом III степени + книжный набор'],
    description: 'Напиши стихотворение или эссе о любви к России, о подвиге защитников Отечества, о гордости за свою страну и историю.',
    isNew: false,
  },
  {
    title: 'История моего края',
    type: 'Исторические исследования',
    deadline: '30 сентября 2026',
    ageGroup: '13–18 лет',
    prizes: ['Диплом I степени + поездка в Москву', 'Диплом II степени + сертификат', 'Диплом III степени + памятный подарок'],
    description: 'Исследуй историю своего города, района или региона. Расскажи о местных героях, памятных событиях и людях, прославивших родной край.',
    isNew: true,
  },
];

const pastWinners = [
  {
    contest: 'Письмо Герою — 2025',
    winner: 'Анна Петрова',
    region: 'Волгоград',
    work: '«Дорогой защитник»',
    place: '1',
  },
  {
    contest: 'Образ Победы — 2025',
    winner: 'Михаил Соколов',
    region: 'Москва',
    work: '«Знамя над Берлином»',
    place: '1',
  },
  {
    contest: 'Слово о Родине — 2025',
    winner: 'Ольга Иванова',
    region: 'Санкт-Петербург',
    work: '«Берёзы у дороги»',
    place: '1',
  },
  {
    contest: 'История края — 2025',
    winner: 'Артём Новиков',
    region: 'Екатеринбург',
    work: '«Уральские герои»',
    place: '1',
  },
];

const requirements = [
  'Участник должен быть гражданином Российской Федерации',
  'Возрастные ограничения указаны в условиях каждого конкурса',
  'Работы принимаются только в электронном виде',
  'Работа должна быть авторской и ранее не публиковавшейся',
  'К работе прилагается заявка с данными участника и его региона',
  'Один участник может подать не более одной работы в каждой номинации',
];

export default function ContestsPage() {
  return (
    <div className="space-y-0">

      {/* Hero */}
      <section className="hero-section hero-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="label-dark animate-fade-up">
              Конкурсы
            </div>

            <h1
              className="font-heading text-4xl md:text-6xl font-bold leading-tight animate-fade-up-delay"
              style={{ color: 'var(--text-primary)' }}
            >
              Творческие
              <br />
              <span className="text-crimson-500">конкурсы проекта</span>
            </h1>

            <hr className="divider-ru max-w-xs mx-auto" />

            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Участвуй в конкурсах по рисунку, поэзии, эссе и краеведению —
              побеждай и получай признание на всероссийском уровне
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-4">
              {[
                { value: '3', label: 'Активных конкурса' },
                { value: '1 200+', label: 'Участников' },
                { value: '45', label: 'Регионов' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading text-3xl font-bold text-crimson-500">{stat.value}</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Active Contests */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <span className="label-red mb-6 inline-block">Приём заявок открыт</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Текущие конкурсы
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Подай заявку до указанного срока и прими участие в борьбе за первенство
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {activeContests.map((contest, i) => (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden transition duration-300 hover:shadow-lg"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                {/* Top accent */}
                <div className="h-1" style={{ background: 'linear-gradient(to right, #b71c1c, #c9a227)' }} />

                <div className="p-8">
                  <div className="flex flex-wrap items-start gap-4 mb-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                          style={{ backgroundColor: 'rgba(183,28,28,0.12)', color: 'var(--color-crimson-600)' }}>
                          {contest.type}
                        </span>
                        {contest.isNew && (
                          <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                            style={{ backgroundColor: 'rgba(201,162,39,0.15)', color: 'var(--color-gold-500)' }}>
                            Новый
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {contest.title}
                      </h3>
                    </div>
                    <Trophy size={40} className="text-crimson-600 flex-shrink-0 opacity-60" />
                  </div>

                  <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {contest.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-crimson-600" />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Дедлайн: <strong style={{ color: 'var(--text-primary)' }}>{contest.deadline}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-crimson-600" />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Возраст: <strong style={{ color: 'var(--text-primary)' }}>{contest.ageGroup}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Prizes */}
                  <div className="mb-6">
                    <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                      Призы
                    </p>
                    <div className="space-y-2">
                      {contest.prizes.map((prize, pi) => (
                        <div key={pi} className="flex items-center gap-3">
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{
                              background: pi === 0
                                ? 'linear-gradient(135deg, #c9a227, #e8c96a)'
                                : pi === 1
                                ? 'linear-gradient(135deg, #9ba5b0, #cfd4d9)'
                                : 'linear-gradient(135deg, #b87333, #d4956b)',
                              color: '#fff',
                            }}
                          >
                            {pi + 1}
                          </span>
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{prize}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold bg-crimson-600 text-white hover:bg-crimson-700 transition-colors"
                  >
                    Подать заявку <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 animate-fade-up">
              <span className="label-red mb-6 inline-block">Важно знать</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Требования к участникам
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((req, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl border"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                >
                  <CheckCircle size={20} className="text-crimson-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {req}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past Winners */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <span className="label-red mb-6 inline-block">Зал славы</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Победители прошлых конкурсов
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Юные авторы, чьи работы вошли в историю проекта
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {pastWinners.map((winner, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-heading font-bold text-xl"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #e8c96a)', color: '#0a192f' }}
                >
                  I
                </div>
                <h3 className="font-heading font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {winner.winner}
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                  {winner.region}
                </p>
                <p className="text-sm font-medium italic mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {winner.work}
                </p>
                <span
                  className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(183,28,28,0.1)', color: 'var(--color-crimson-600)' }}
                >
                  {winner.contest}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="theme-panel-ru rounded-2xl p-10 md:p-14 text-center">
              <Trophy size={48} className="mx-auto mb-6 opacity-80" style={{ color: 'var(--color-gold-400)' }} />
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                Стань следующим победителем
              </h3>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Все работы публикуются на платформе проекта. Победители
                получают дипломы и ценные призы на торжественной церемонии.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/creativity"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg bg-white hover:bg-gray-100 transition-colors"
                  style={{ color: '#b71c1c' }}
                >
                  Галерея работ <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  Задать вопрос
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
