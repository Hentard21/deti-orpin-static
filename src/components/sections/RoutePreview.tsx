import Link from 'next/link';
import { octoberProgram } from '@/data/october-program';
import { withBasePath } from '@/lib/paths';

export default function RoutePreview({ showEarlierStages = false }: { showEarlierStages?: boolean }) {
  return <section className="programme-section" id="october-program">
    <div className="programme-container">
      <p className="programme-kicker">ОКТЯБРЬСКАЯ ПРОГРАММА · ВОЛГОГРАД</p>
      <div className="programme-heading"><h2>{octoberProgram.dates}</h2><Link href="/route#october-program">Программа акции →</Link></div>
      <p className="text-xl mb-8">«{octoberProgram.title}»</p>
      <div className="grid md:grid-cols-2 gap-5">
        <article className="programme-card programme-detail-card !min-h-0">
          <h3>Интеллектуально-патриотический турнир</h3>
          <p>«{octoberProgram.tournament.title}»</p>
          <p className="mt-4"><strong>{octoberProgram.tournament.date}, {octoberProgram.tournament.time}.</strong> Награждение команд — в {octoberProgram.tournament.awardsTime}.</p>
          <p className="mt-3">{octoberProgram.tournament.location}.</p>
          <p className="mt-3">Срок подачи заявок — до {octoberProgram.tournament.deadline} — истёк. Приём заявок по этому положению завершён.</p>
          <a className="underline inline-block mt-4" href={withBasePath(octoberProgram.tournament.document)}>Подписанное положение о турнире (PDF)</a>
        </article>
        <article className="programme-card programme-detail-card !min-h-0">
          <h3>Организаторы конкурса и турнира</h3>
          <ul className="list-disc pl-5 space-y-3">{octoberProgram.organizers.map(name => <li key={name}>{name}</li>)}</ul>
          <p className="mt-4">Научно-методическое участие в турнире: {octoberProgram.tournament.scientificPartner}.</p>
          <p className="mt-4">Оргкомитет: <a className="underline break-all" href={`mailto:${octoberProgram.email}`}>{octoberProgram.email}</a>.</p>
        </article>
      </div>
      {showEarlierStages && <div className="mt-10 space-y-4">
        <h3 className="font-heading text-2xl font-bold">Другие этапы маршрута</h3>
        <p>В ранее опубликованной программе были указаны Смоленск (октябрь 2025), Волгоград (31 мая — 2 июня 2026), Санкт-Петербург (июль 2026), Минск (сентябрь 2026) и Москва (ноябрь 2026).</p>
        <p>Даты прошедших месяцев не обозначаются как предстоящие. Сведения о проведении поездок и дальнейших этапах будут обновлены после подтверждения организаторами.</p>
      </div>}
    </div>
  </section>;
}
