import Link from 'next/link';
import { moscowProgram } from '@/data/moscow-program';

export default function RoutePreview({ showEarlierStages = false }: { showEarlierStages?: boolean }) {
  return <section className="programme-section" id="moscow-program">
    <div className="programme-container">
      <p className="programme-kicker">МОСКВА · ВДНХ</p>
      <div className="programme-heading">
        <h2>{moscowProgram.dates}</h2>
        <Link href="/route#moscow-program">Программа акции →</Link>
      </div>
      <p className="programme-lead mb-6">{moscowProgram.title}</p>
      <p className="programme-change-note mb-8">{moscowProgram.replaces}</p>
      <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>Все интервалы указаны по московскому времени.</p>
      <div className="grid md:grid-cols-2 gap-5">
        {moscowProgram.stages.map((stage) => <article key={stage.id} data-stage-id={stage.id} className="programme-card programme-detail-card !min-h-0">
          <p className="programme-kicker"><time dateTime={stage.dateTime}>{stage.date}</time></p>
          <p className="programme-stage-time">{stage.time}</p>
          <h3>{stage.title}</h3>
          <p className="mb-4"><strong>{stage.room}</strong></p>
          <p>{stage.description}</p>
          {showEarlierStages && stage.venueNote && <p className="mt-4">{stage.venueNote}</p>}
        </article>)}
      </div>
      {showEarlierStages && <div className="mt-10 space-y-4">
        <h3 className="font-heading text-2xl font-bold">Изменение программы</h3>
        <p>Ранее опубликованные место, даты и положение волгоградского турнира не относятся к московской программе. Условия участия и регистрации в Москве будут опубликованы после подтверждения организаторами.</p>
        <p>Сведения о других этапах маршрута обновляются отдельно после подтверждения их проведения.</p>
      </div>}
    </div>
  </section>;
}
