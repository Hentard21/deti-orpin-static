import Image from 'next/image';
import { octoberProgram } from '@/data/october-program';
import Reveal from '@/components/ui/Reveal';
import { Users, Heart, Award, Shield, BookOpen, Target, Building2, Star, Camera, Cpu, Share2, Film } from 'lucide-react';
import { withBasePath } from '@/lib/paths';

const values = [
  {
    icon: <Shield size={40} className="text-crimson-600" />,
    title: 'Патриотизм',
    description: 'Воспитываем любовь к Родине через примеры героизма и мужества',
  },
  {
    icon: <Heart size={40} className="text-crimson-600" />,
    title: 'Забота',
    description: 'Оказываем поддержку детям погибших военнослужащих',
  },
  {
    icon: <Users size={40} className="text-crimson-600" />,
    title: 'Единство',
    description: 'Объединяем поколения через диалог и общие ценности',
  },
  {
    icon: <BookOpen size={40} className="text-crimson-600" />,
    title: 'Образование',
    description: 'Передаём историческую память и знания о подвигах героев',
  },
  {
    icon: <Target size={40} className="text-crimson-600" />,
    title: 'Миссия',
    description: 'Формируем гражданскую позицию у молодого поколения',
  },
  {
    icon: <Award size={40} className="text-crimson-600" />,
    title: 'Признание',
    description: 'Сохраняем память о героях в сердцах россиян',
  },
];

const organizations = [
  'Благотворительный фонд «Бюро Жар-Птица»',
  'АНО «Центр поддержки детей военнослужащих»',
  'АНО «Диалог поколений. Герои и дети»',
];

const natalyaResponsibilities = [
  { icon: <Users size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />, text: 'Взаимодействие с ветеранскими и общественными организациями' },
  { icon: <Heart size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />, text: 'Адресная работа с семьями погибших военнослужащих' },
  { icon: <Building2 size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />, text: 'Организация выездных встреч и мероприятий в регионах' },
  { icon: <Award size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />, text: 'Координация программы «Письма памяти»' },
];

const markResponsibilities = [
  { icon: <Camera size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />, text: 'Визуальная концепция и художественный стиль проекта' },
  { icon: <Cpu size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />, text: 'Внедрение ИИ-инструментов и цифровых технологий' },
  { icon: <Share2 size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />, text: 'Контент для соцсетей и цифровая стратегия' },
  { icon: <Film size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />, text: 'Производство аудиовизуальных материалов и фильма проекта' },
];

export default function AboutPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="hero-section hero-bg pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="label-dark animate-fade-up">О проекте</div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight animate-fade-up-delay" style={{ color: 'var(--text-primary)' }}>
              Диалог поколений:
              <br />
              <span className="text-crimson-500">Герои и дети</span>
            </h1>

            <hr className="divider-ru max-w-xs mx-auto" />

            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Всероссийский проект по воспитанию патриотического сознания у молодежи
              через личные встречи с Героями России и детьми погибших военнослужащих.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <Reveal y={32} className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Наша миссия
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              АНО &quot;Центр патриотического воспитания и всестороннего развития детей и молодёжи «Диалог поколений. Герои и дети»&quot; реализует проект
              «Диалог поколений» для воспитания патриотического сознания у молодежи
              через личные встречи с Героями России.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Users size={40} className="text-crimson-600" />, title: 'Соединяем поколения', text: 'Создаем уникальные встречи детей погибших военнослужащих с Героями России' },
              { icon: <Heart size={40} className="text-crimson-600" />, title: 'Воспитание патриотизма', text: 'Формируем чувство гордости за Отечество через историю подвигов и мужества' },
              { icon: <Award size={40} className="text-crimson-600" />, title: 'Память и поддержка', text: 'Поддерживаем детей погибших героев и сохраняем их память в сердцах россиян' },
            ].map((card, i) => (
              <Reveal key={i} y={32} delay={i * 0.12}>
                <div className="p-8 rounded-xl border shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-2 h-full" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'rgba(15,27,46,0.10)' }}>
                  <div className="mb-6">{card.icon}</div>
                  <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <Reveal y={32} className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Наши ценности
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Принципы, которыми мы руководствуемся в реализации проекта
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Reveal key={index} y={32} delay={index * 0.08}>
                <div
                  className="p-8 rounded-xl border shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-2 h-full"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'rgba(15,27,46,0.10)' }}
                >
                  <div className="mb-6">{value.icon}</div>
                  <h3 className="font-heading text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {value.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto px-4">
          <Reveal y={32} className="text-center mb-16">
            <div className="label-red inline-flex mb-4">Наша команда</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Люди, которые делают проект возможным
            </h2>
            <hr className="divider-ru max-w-xs mx-auto mt-6" />
          </Reveal>

          {/* Adina Card */}
          <div className="max-w-5xl mx-auto">
            <Reveal y={32}>
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: 'rgba(15,27,46,0.10)', backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Photo */}
                  <Reveal x={-40} y={0} className="lg:w-2/5 flex-shrink-0 relative">
                    <div className="relative h-80 lg:h-full min-h-[380px]">
                      <Image
                        src={withBasePath('/Adeena2.png')}
                        alt="Тенгебаева Адина Арыковна"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
                      {/* Gold accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--color-crimson-600), var(--color-gold-500))' }} />
                    </div>
                  </Reveal>

                  {/* Content */}
                  <Reveal x={40} y={0} delay={0.15} className="lg:w-3/5 p-8 md:p-10 flex flex-col justify-center space-y-6">
                    {/* Name & Title */}
                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Тенгебаева Адина Арыковна
                      </h3>
                      <p className="text-base font-semibold" style={{ color: 'var(--color-gold-500)' }}>
                        Президент АНО «Диалог поколений. Герои и дети»
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        Общественный деятель · Предприниматель · Управленец
                      </p>
                    </div>

                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

                    {/* Bio */}
                    <div className="space-y-3 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <p>
                        Адина Арыковна — опытный управленец и общественный деятель со стажем руководства масштабными проектами. Её профессиональный путь объединяет многолетний опыт ведения крупного бизнеса в инвестиционно-строительном секторе и глубокую экспертизу в реализации социально значимых, культурных и благотворительных инициатив.
                      </p>
                      <p>
                        Пройдя через серьёзные личные вызовы и успешно победив тяжёлое онкологическое заболевание, Адина Арыковна полностью сфокусировала свои организаторские способности и ресурсы на масштабном общественном служении и системной благотворительности.
                      </p>
                    </div>

                    {/* Organizations */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                        Руководит организациями
                      </p>
                      <div className="flex flex-col gap-2">
                        {organizations.map((org, i) => (
                          <Reveal key={i} x={20} y={0} delay={0.4 + i * 0.1} className="flex items-start gap-2">
                            <Building2 size={14} className="text-crimson-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{org}</span>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Quote */}
                <Reveal y={24} delay={0.2} className="px-8 md:px-10 pb-10 pt-4">
                  <div
                    className="rounded-xl p-6 md:p-8 relative"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-navy-900) 0%, var(--color-navy-800) 100%)',
                      borderLeft: '4px solid var(--color-gold-500)',
                    }}
                  >
                    <Star size={18} className="absolute top-5 right-6 opacity-30" style={{ color: 'var(--color-gold-500)' }} />
                    <blockquote className="text-sm md:text-base leading-relaxed italic text-white mb-4">
                      «Системная благотворительность — это не просто помощь, это стратегические инвестиции в будущее нашей страны и в её подрастающее поколение. Наша миссия — создать для детей, чьи семьи столкнулись с тяжёлыми испытаниями, прочную опору, дать им лучшие возможности для образования, социализации и раскрытия своего потенциала. Мы строим работу фонда на принципах строгой подотчётности, прозрачности и измеримого результата, потому что доверие наших партнёров — это главный капитал, позволяющий нам уверенно смотреть в завтрашний день вместе с нашими подопечными.»
                    </blockquote>
                    <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-gold-500)' }}>
                      — Адина Арыковна Тенгебаева
                    </div>
                  </div>
                </Reveal>
              </div>
            </Reveal>


            {/* Mark Card */}
            <Reveal y={32} delay={0.1} className="mt-10">
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: 'rgba(15,27,46,0.10)', backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="flex flex-col lg:flex-row-reverse">
                  {/* Photo — mirrored to the right */}
                  <Reveal x={40} y={0} className="lg:w-2/5 flex-shrink-0 relative">
                    <div className="relative h-80 lg:h-full min-h-[380px]">
                      <Image
                        src={withBasePath('/Mark.png')}
                        alt="Марк Пономаренко"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/10" />
                      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--color-gold-500), var(--color-crimson-600))' }} />
                    </div>
                  </Reveal>

                  {/* Content */}
                  <Reveal x={-40} y={0} delay={0.15} className="lg:w-3/5 p-8 md:p-10 flex flex-col justify-center space-y-6">
                    {/* Name & Title */}
                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Марк Пономаренко
                      </h3>
                      <p className="text-base font-semibold" style={{ color: 'var(--color-gold-500)' }}>
                        Специалист по визуальным коммуникациям
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        Фотограф · Цифровые технологии · Контент-стратегия
                      </p>
                    </div>

                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

                    {/* Bio */}
                    <div className="space-y-3 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <p>
                        Отвечает за разработку и реализацию визуальной концепции проекта «Диалог поколений». Координирует создание фото-, видео- и графических материалов, обеспечивая единый художественный стиль и качественную визуальную подачу.
                      </p>
                      <p>
                        Занимается внедрением современных цифровых технологий, включая инструменты искусственного интеллекта, для повышения эффективности работы проекта и создания новых форм представления контента.
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                        Направления работы
                      </p>
                      <div className="flex flex-col gap-2">
                        {markResponsibilities.map((item, i) => (
                          <Reveal key={i} x={-20} y={0} delay={0.4 + i * 0.1} className="flex items-start gap-2">
                            {item.icon}
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Reveal>
            {/* Natalia Card */}
            <Reveal y={32} delay={0.1} className="mt-10">
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: 'rgba(15,27,46,0.10)', backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Photo placeholder */}
                  <Reveal x={-40} y={0} className="lg:w-2/5 flex-shrink-0 relative">
                    <div className="relative h-80 lg:h-full min-h-[380px]">
                      <Image
                        src={withBasePath('/Natalia.png')}
                        alt="Наталья Александровна"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
                      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--color-crimson-600), var(--color-gold-500))' }} />
                    </div>
                  </Reveal>

                  {/* Content */}
                  <Reveal x={40} y={0} delay={0.15} className="lg:w-3/5 p-8 md:p-10 flex flex-col justify-center space-y-6">
                    {/* Name & Title */}
                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Наталья Александровна
                      </h3>
                      <p className="text-base font-semibold" style={{ color: 'var(--color-gold-500)' }}>
                        Руководитель по работе с семьями и регионами
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        Социальная поддержка · Региональные программы · Ветеранские связи
                      </p>
                    </div>

                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

                    {/* Bio */}
                    <div className="space-y-3 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <p>
                        Наталья Александровна несёт ответственность за одно из ключевых направлений проекта — непосредственную работу с семьями погибших военнослужащих и детьми участников акции. Её опыт в социальной сфере и глубокое понимание нужд семей в трудных жизненных ситуациях делают её незаменимым членом команды.
                      </p>
                      <p>
                        Координирует региональное взаимодействие, выстраивая устойчивые связи с ветеранскими организациями, местными властями и общественными структурами по всей России — от Смоленска до Мурманска.
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                        Направления работы
                      </p>
                      <div className="flex flex-col gap-2">
                        {natalyaResponsibilities.map((item, i) => (
                          <Reveal key={i} x={20} y={0} delay={0.4 + i * 0.1} className="flex items-start gap-2">
                            {item.icon}
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-4">
          <Reveal y={32}>
            <div className="max-w-4xl mx-auto">
              <div className="theme-panel-ru rounded-2xl p-12 md:p-16 text-center">
                <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed italic text-white mb-8">
                  «Герои — это не просто люди, а живые примеры самопожертвования и
                  гражданской ответственности. Общение с ними вдохновляет молодёжь
                  на служение Отечеству и помогает формировать истинную гражданскую
                  позицию»
                </blockquote>
                <div className="font-heading font-semibold text-xl" style={{ color: 'var(--color-gold-500)' }}>
                  В.В. Путин
                </div>
                <div className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                  Президент Российской Федерации
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="programme-section programme-tint"><div className="programme-container">
        <p className="programme-kicker">ОКТЯБРЬСКАЯ ПРОГРАММА 2026</p>
        <h2 className="font-heading text-3xl font-bold mb-6">Организаторы конкурса «Моя Родина — Россия»</h2>
        <ul className="list-disc pl-5 space-y-3">{octoberProgram.organizers.map(name => <li key={name}>{name}</li>)}</ul>
      </div></section>
    </div>
  );
}
