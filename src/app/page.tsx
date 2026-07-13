import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import ContestBanner from '@/components/sections/ContestBanner';
import RoutePreview from '@/components/sections/RoutePreview';
import Partners from '@/components/sections/Partners';

export default function Home() {
  return (
    <div>
      <Hero />
      <Overview />
      <ContestBanner />
      <RoutePreview />
      <Partners />
    </div>
  );
}
