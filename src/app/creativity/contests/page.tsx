import { creativeContest, octoberProgram } from '@/data/october-program';
import ContestAvailability from '@/components/sections/ContestAvailability';

export default function ContestsPage() {
  return <div className="programme-shell">
    <section className="programme-section"><div className="programme-container max-w-5xl">
      <p className="programme-kicker">ВСЕРОССИЙСКИЙ ТВОРЧЕСКИЙ КОНКУРС</p>
      <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">«{creativeContest.title}»</h1>
      <p className="programme-lead mb-8">В рамках акции «{octoberProgram.title}».</p>
      <ContestAvailability />
    </div></section>
    <section className="programme-section programme-tint"><div className="programme-container">
      <div className="programme-heading"><h2>КТО МОЖЕТ УЧАСТВОВАТЬ</h2></div>
      <p className="text-lg mb-4">{creativeContest.audience} в возрасте {creativeContest.age}. Участие добровольное.</p>
      <p className="mb-4">Возрастные категории: {creativeContest.ageCategories.join('; ')}.</p>
      <p>Работа может быть индивидуальной или коллективной. Каждый участник или коллектив представляет не более одной работы на конкурс.</p>
    </div></section>
    <section className="programme-section"><div className="programme-container">
      <div className="programme-heading"><h2>ПЯТЬ НОМИНАЦИЙ</h2></div>
      <div className="grid md:grid-cols-2 gap-5">{creativeContest.nominations.map((nomination, i) => <article key={nomination.id} className="programme-card programme-detail-card !min-h-0">
        <p className="programme-kicker">0{i + 1}</p><h3>{nomination.title}</h3><p>{nomination.description}</p>
      </article>)}</div>
      <p className="mt-6">Работы должны соответствовать тематике конкурса; материалы рекламного характера и материалы, оскорбляющие достоинство и чувства других людей, не принимаются.</p>
    </div></section>
    <section className="programme-section programme-tint"><div className="programme-container max-w-5xl space-y-5">
      <h2 className="text-3xl font-heading font-bold">Подача работ и итоги</h2>
      <p>Работу и заявку по установленной форме направьте в электронном виде на <a className="underline break-all" href={`mailto:${octoberProgram.email}`}>{octoberProgram.email}</a>. Форму заявки и согласие на обработку персональных данных можно запросить у оргкомитета.</p>
      <p>Экспертная оценка: 15–20 октября. Подведение итогов: 20–25 октября 2026 года. Победители и лауреаты награждаются дипломами и призами организаторов и деловых партнёров.</p>
      <p>Окончательную дату и время церемонии награждения сообщит оргкомитет.</p>
      <h2 className="text-2xl font-heading font-bold pt-4">Организаторы конкурса</h2>
      <ul className="list-disc pl-5 space-y-2">{octoberProgram.organizers.map(name => <li key={name}>{name}</li>)}</ul>
      <p>Телефон для справок: <a className="underline" href="tel:+74951444202">{octoberProgram.phone}</a>.</p>
    </div></section>
  </div>;
}
