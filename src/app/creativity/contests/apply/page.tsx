'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { creativeContest, octoberProgram, contestPhase } from '@/data/october-program';
import { useContestPhase } from '@/components/sections/ContestAvailability';

export default function ApplyPage() {
  const phase = useContestPhase();
  const [notice, setNotice] = useState('');
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Recheck immediately: a tab may have been left open beyond the deadline.
    if (contestPhase(new Date()) !== 'open') { setNotice('Подача работ недоступна. Уточните действующие сроки у оргкомитета.'); return; }
    const data = new FormData(event.currentTarget);
    const body = ['Конкурс «Моя Родина — Россия»',
      `Участник: ${data.get('participant')}`, `Возраст: ${data.get('age')}`,
      `Город / регион: ${data.get('region')}`, `Номинация: ${data.get('nomination')}`,
      `Законный представитель: ${data.get('representative')}`, `Контакт: ${data.get('contact')}`,
      '', 'Прилагаю конкурсную работу, заявку по установленной форме и необходимые согласия.',
    ].join('\n');
    window.location.href = `mailto:${octoberProgram.email}?subject=${encodeURIComponent('Моя Родина — Россия: конкурсная работа')}&body=${encodeURIComponent(body)}`;
    setNotice('Подготовлен черновик в почтовом приложении. Прикрепите документы и работу, проверьте письмо и отправьте его сами. Сайт ничего не отправлял.');
  }
  return <div className="programme-shell"><section className="programme-section"><div className="programme-container max-w-3xl space-y-6">
    <Link href="/creativity/contests" className="underline">← Условия конкурса</Link>
    <p className="programme-kicker">«{creativeContest.title}»</p>
    <h1 className="text-3xl md:text-5xl font-heading font-bold">Как подать работу</h1>
    <p>Новые сроки конкурса уточняются. Ранее опубликованный возраст участников: {creativeContest.age}.</p>
    <p>Вопросы о новых сроках и формах заявки можно направить в оргкомитет: <a className="underline break-all" href={`mailto:${octoberProgram.email}`}>{octoberProgram.email}</a>, {octoberProgram.phone}. Дождитесь подтверждения условий, прежде чем отправлять работу.</p>
    <p>Форма подготовки письма будет доступна после подтверждения сроков. Она не заменяет установленную заявку. Данные не загружаются на сайт.</p>
    {phase === null && <p role="status">Проверяем срок приёма…</p>}
    {phase === 'closed' && <p role="status" className="font-semibold">Приём работ завершён. Формирование новых заявок недоступно.</p>}
    {phase === 'before' && <p role="status">Приём работ ещё не начался.</p>}
    {phase === 'pending' && <p role="status" className="font-semibold">Подача работ временно недоступна. Обновлённые даты и условия сообщит оргкомитет.</p>}
    {phase === 'open' && <form onSubmit={prepareEmail} className="space-y-5">
      <label className="block">ФИО участника<input name="participant" autoComplete="name" required maxLength={150} className="block w-full border rounded-lg p-3 mt-2 bg-transparent" /></label>
      <label className="block">Возраст<input name="age" type="number" min={7} max={17} required className="block w-full border rounded-lg p-3 mt-2 bg-transparent" /></label>
      <label className="block">Город и регион<input name="region" required maxLength={200} className="block w-full border rounded-lg p-3 mt-2 bg-transparent" /></label>
      <label className="block">Номинация<select name="nomination" required defaultValue="" className="block w-full border rounded-lg p-3 mt-2" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}><option value="" disabled>Выберите номинацию</option>{creativeContest.nominations.map(n => <option key={n.id} value={n.title}>{n.title}</option>)}</select></label>
      <label className="block">ФИО законного представителя<input name="representative" required maxLength={150} className="block w-full border rounded-lg p-3 mt-2 bg-transparent" /></label>
      <label className="block">Контактный email<input name="contact" type="email" autoComplete="email" required maxLength={200} className="block w-full border rounded-lg p-3 mt-2 bg-transparent" /></label>
      <button type="submit" className="programme-button">Подготовить письмо</button>
      <p className="text-sm">Если почтовое приложение не открылось, напишите на указанный адрес вручную. Для коллективной работы перечислите всех участников в установленной заявке.</p>
    </form>}
    <p role="status" aria-live="polite">{notice}</p>
  </div></section></div>;
}
