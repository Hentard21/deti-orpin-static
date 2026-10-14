// Sources: competition regulation §§1.3, 1.4, 3.1, 4, 5;
// signed tournament regulation dated 19.09.2026 §§1.3, 4, 5, 8.
// Competition award date is unconfirmed (§3.1 conflicts with §8.2).
export const octoberProgram = {
  // Archived event only; do not use this event's venue/partners/terms for Moscow.
  status: 'cancelled',
  title: 'Встреча детей Героев с городом-героем Волгоградом',
  dates: '26–28 октября 2026 года',
  organizers: ['АНО «Центр поддержки детей погибших военнослужащих»', 'РОО СОИ «Семьи и Жены Героев»'],
  email: 'anocentrdetei@yandex.ru', phone: '+7 (495) 144-42-02',
  tournament: {
    title: 'Героические страницы истории: Сталинградская битва',
    date: '27 октября 2026 года', time: '11:30–12:30', awardsTime: '12:30',
    deadline: '1 октября 2026 года',
    document: '/documents/stalingrad-tournament-2026-signed.pdf',
    location: 'Музей-заповедник «Сталинградская битва», Волгоград, ул. им. маршала Чуйкова, д. 47',
    scientificPartner: 'Центр по изучению Сталинградской битвы',
  },
} as const;

export const creativeContest = {
  // Owner reports a likely postponement; do not accept entries against the old deadline.
  scheduleStatus: 'pending' as 'pending' | 'confirmed',
  title: 'Моя Родина — Россия',
  start: 'Новые сроки уточняются', deadline: 'Новые сроки уточняются',
  // Historical bounds, inactive until new terms are explicitly confirmed.
  opensAt: '2026-09-14T21:00:00Z', closesAt: '2026-10-15T21:00:00Z',
  age: '7–17 лет', audience: 'Дети военнослужащих, погибших в СВО',
  ageCategories: ['7–11 лет включительно', '12–17 лет включительно'],
  nominations: [
    { id: 'prose-poetry', title: 'Проза и Поэзия', description: 'Одна творческая работа на тему «Русский язык — язык мира и дружбы».' },
    { id: 'recitation', title: 'Художественное слово', description: 'Конкурс чтецов: видеозапись исполнения произведения, не более 1,5 минуты. Темы: «Великий и могучий русский язык», «Я люблю тебя, моя Родина», «Россия, ты навсегда в моем сердце», «…Не надо рая, дайте родину мою…».' },
    { id: 'essay', title: 'Сочинение-рассуждение', description: 'Эссе на русском языке, DOC или DOCX, 1–2 страницы. Times New Roman, 14 кегль, интервал 1,5; поля: слева 3 см, справа 1,5 см, сверху и снизу 2 см.' },
    { id: 'art', title: 'Изобразительное искусство', description: 'Фото одной иллюстрации «Россия глазами детей». Формат оригинала 30 × 40 см; без паспарту, в развёрнутом виде.' },
    { id: 'video', title: 'Видеоролики', description: 'Горизонтальный ролик о Родине продолжительностью не более 2 минут, MP4, AVI или MPEG (HD / Full HD). Жанр выбирает участник.' },
  ],
} as const;

export function contestPhase(now: Date): 'before' | 'open' | 'closed' | 'pending' {
  if (creativeContest.scheduleStatus === 'pending') return 'pending';
  const time = now.getTime();
  if (time < Date.parse(creativeContest.opensAt)) return 'before';
  return time < Date.parse(creativeContest.closesAt) ? 'open' : 'closed';
}
