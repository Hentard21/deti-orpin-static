import RoutePreview from '@/components/sections/RoutePreview';

export default function RoutePage() {
  return <div>
    <section className="hero-section hero-bg pt-24 pb-20">
      <div className="container mx-auto px-4 text-center max-w-5xl space-y-8">
        <p className="label-dark">МАРШРУТ ПРОЕКТА</p>
        <h1 className="font-heading text-4xl md:text-6xl font-bold">Календарь <span className="text-crimson-500">мероприятий</span></h1>
        <hr className="divider-ru max-w-xs mx-auto" />
        <p className="text-xl" style={{color:'var(--text-secondary)'}}>Всероссийский форум «Симфония единства и героизма». Москва, ВДНХ, 8–9 декабря 2026 года.</p>
      </div>
    </section>
    <RoutePreview showEarlierStages />
  </div>;
}
