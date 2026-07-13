import Link from 'next/link';

const partners = [
  {
    name: 'Федеральный Консультативный Совет',
    short: 'ФКС',
    desc: 'Официальная поддержка акции и издания книги «Письма памяти»',
  },
  {
    name: 'Межгосударственный Союз Городов-Героев',
    short: 'МСГГ',
    desc: 'Организационная поддержка акции «Встреча детей Героев с городами-героями»',
  },
  {
    name: 'Комитет по туризму города Москвы',
    short: 'Мостуризм',
    desc: 'Содействие в проведении мероприятий проекта в Москве',
  },
  {
    name: 'Главное управление Смоленской области по культурному наследию',
    short: 'Смоленск',
    desc: 'Поддержка проведения акции в городе-герое Смоленске',
  },
  {
    name: 'Центр поддержки детей погибших военнослужащих',
    short: 'АНО ЦПД',
    desc: 'Организатор и координатор всех мероприятий проекта',
  },
  {
    name: 'Совет ветеранов Северного флота',
    short: 'Сев. флот',
    desc: 'Участие ветеранов в диалоге с детьми Героев',
  },
];

export default function Partners() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-4">

        <div className="text-center mb-14">
          <div className="label-gold mb-4">Официальная поддержка</div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Партнёры проекта
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Государственные, ветеранские и общественные организации, которые
            поддерживают «Диалог поколений. Герои и дети»
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex gap-4 p-5 rounded-xl hover-lift"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-heading font-bold text-xs text-center leading-tight"
                style={{
                  background: 'rgba(183,28,28,0.08)',
                  border: '1px solid rgba(183,28,28,0.18)',
                  color: 'var(--color-crimson-600)',
                }}
              >
                {p.short}
              </div>
              <div>
                <div className="font-semibold text-sm leading-snug mb-1" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-medium transition duration-200"
            style={{
              background: 'var(--color-crimson-600)',
              color: '#ffffff',
              boxShadow: '0 4px 20px rgba(183,28,28,0.30)',
            }}
          >
            Стать партнёром
          </Link>
        </div>

      </div>
    </section>
  );
}
