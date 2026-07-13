import { Users, Heart, Award } from 'lucide-react';

export default function Overview() {
  const missionPoints = [
    {
      icon: <Users size={40} className="text-crimson-600" />,
      title: 'Соединяем поколения',
      description:
        'Создаем уникальные встречи детей погибших военнослужащих с Героями России',
    },
    {
      icon: <Heart size={40} className="text-crimson-600" />,
      title: 'Воспитание патриотизма',
      description:
        'Формируем чувство гордости за Отечество через историю подвигов и мужества',
    },
    {
      icon: <Award size={40} className="text-crimson-600" />,
      title: 'Память и поддержка',
      description:
        'Поддерживаем детей погибших героев и сохраняем их память в сердцах россиян',
    },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            О проекте и организации
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            АНО &quot;Центр патриотического воспитания и всестороннего развития детей и молодёжи «Диалог поколений. Герои и дети»&quot; реализует проект
            «Диалог поколений» для воспитания патриотического сознания у молодежи
            через личные встречи с Героями России.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {missionPoints.map((point, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-2" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'rgba(15,27,46,0.10)' }}
            >
              <div className="mb-6">{point.icon}</div>
              <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{point.title}</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 theme-panel-ru rounded-2xl overflow-hidden shadow-soft-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 md:p-16">
              <h3 className="font-heading text-3xl font-bold text-white mb-6">
                Миссия Центра
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Обеспечиваем психологическую, социальную и правовую поддержку
                детям погибших военнослужащих, а также реализуем образовательные и
                патриотические проекты, укрепляющие связь поколений.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-crimson-600 rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-300">
                    Поддержка детей погибших военнослужащих
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-crimson-600 rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-300">
                    Воспитание патриотизма через героическое наследие
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-crimson-600 rounded-full mt-2 mr-4"></div>
                  <p className="text-gray-300">
                    Сохранение памяти и исторической правды
                  </p>
                </div>
              </div>
            </div>
            <div className="theme-panel-ru-alt p-12 md:p-16">
              <h3 className="font-heading text-3xl font-bold text-white mb-8">
                Основные ценности
              </h3>
              <div className="space-y-5">
                {[
                  { num: '01', title: 'Справедливость', desc: 'Помощь каждому нуждающемуся без преференций' },
                  { num: '02', title: 'Ответственность', desc: 'Сознательный подход к выполнению задач' },
                  { num: '03', title: 'Благотворительность', desc: 'Самоотверженность и помощь без ожидания вознаграждения' },
                  { num: '04', title: 'Культура', desc: 'Сохранение традиций и формирование культурной среды' },
                ].map((v) => (
                  <div key={v.num} className="flex items-start gap-4">
                    <span className="font-heading text-xs font-bold text-crimson-400 mt-1 w-6 flex-shrink-0 opacity-70">{v.num}</span>
                    <div className="flex-1 border-b border-white/10 pb-5">
                      <h4 className="font-heading font-bold text-white mb-1">{v.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
