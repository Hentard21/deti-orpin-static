// Source: owner's VDNH contract appendix supplied on 14 October 2026.
// Owner confirmed 8–9 December and the shifted stage dates in the same conversation.
// Registration terms and Moscow organizers are not yet confirmed.
export const moscowProgram = {
  title: 'Всероссийский форум «Симфония единства и героизма»',
  dates: '8–9 декабря 2026 года',
  city: 'Москва',
  venue: 'ВДНХ',
  timezone: 'Europe/Moscow',
  replaces: 'Октябрьская акция в Волгограде отменена. Вместо неё форум пройдёт в Москве.',
  stages: [
    {
      id: 'tournament', date: '8 декабря 2026', dateTime: '2026-12-08', time: '19:00–20:00',
      room: 'Конференц-зал Центра', title: 'Интеллектуальный турнир',
      description: 'Интеллектуальный турнир среди детско-юношеских кадетских команд 8 федеральных округов.',
      venueNote: 'За 3 часа до закрытия павильона.',
    },
    {
      id: 'rehearsal', date: '8 декабря 2026', dateTime: '2026-12-08', time: '20:00–22:00',
      room: 'Под куполом павильона №34 «Космос»', title: 'Генеральная репетиция Парада',
      description: 'Генеральная репетиция Парада 16 расчётов и оркестра под живую музыку Амурского кадетского корпуса.',
      venueNote: 'За 2 часа до закрытия павильона.',
    },
    {
      id: 'opening', date: '9 декабря 2026', dateTime: '2026-12-09', time: '10:00–11:00',
      room: 'Под куполом павильона №34', title: 'Торжественное открытие Акции и Парад',
      description: 'Торжественное открытие Акции и Парад. Исполнение кадетами 15 регионов ритуала «Круг Единства».',
      venueNote: '',
    },
    {
      id: 'awards', date: '9 декабря 2026', dateTime: '2026-12-09', time: '11:00–13:00',
      room: 'Конференц-зал Павильона', title: 'Выступления и награждение',
      description: 'Речи почётных космонавтов и награждение Героями РФ команд-победителей интеллектуального турнира.',
      venueNote: '',
    },
  ],
} as const;
