import Link from 'next/link';
import { octoberProgram } from '@/data/october-program';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import PerformanceToggle from '@/components/ui/PerformanceToggle';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Footer() {
  return (
    <footer className="transition-colors duration-300" 
      style={{
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
      }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-6">
              Диалог поколений
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Всероссийский проект по воспитанию патриотизма среди молодежи через
              общение с героями России и детьми погибших военнослужащих.
            </p>
            <div className="flex space-x-4">
              {/* ВКонтакте */}
              <a href="#" className="transition-colors hover:text-crimson-600" style={{ color: 'var(--text-secondary)' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.96 13.5h-1.61c-.61 0-.79-.49-1.88-1.61-.94-1-1.36-1.15-1.59-1.15-.33 0-.42.09-.42.55v1.47c0 .39-.12.62-1.15.62-1.7 0-3.58-1.03-4.91-2.95C5 10.26 4.6 8.54 4.6 8.18c0-.23.09-.45.55-.45h1.61c.41 0 .57.18.73.62.8 2.35 2.15 4.4 2.7 4.4.21 0 .3-.09.3-.6V9.87c-.06-1.07-.63-1.16-.63-1.54 0-.2.15-.39.4-.39h2.54c.34 0 .46.18.46.57v3.06c0 .34.15.46.25.46.21 0 .39-.12.78-.52 1.21-1.35 2.07-3.44 2.07-3.44.11-.24.3-.46.71-.46h1.61c.49 0 .6.25.49.57-.2 1-.67 1.77-1.79 3.19 1.03.94 1.25 1.46 1.25 1.73-.01.2-.1.41-.56.41z" />
                </svg>
              </a>
              {/* Telegram */}
              <a href="#" className="transition-colors hover:text-crimson-600" style={{ color: 'var(--text-secondary)' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.01 9.49c-.146.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 14.447 4.23 13.54c-.645-.205-.658-.645.136-.953l10.92-4.21c.538-.194 1.009.131.836.871z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="transition-colors hover:text-crimson-600" style={{ color: 'var(--text-secondary)' }}>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="transition-colors hover:text-crimson-600" style={{ color: 'var(--text-secondary)' }}>
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-crimson-600" style={{ color: 'var(--text-secondary)' }}>
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/route" className="transition-colors hover:text-crimson-600" style={{ color: 'var(--text-secondary)' }}>
                  Маршрут
                </Link>
              </li>
              <li>
                <Link href="/media" className="transition-colors hover:text-crimson-600" style={{ color: 'var(--text-secondary)' }}>
                  Медиа
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-crimson-600" size={18} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  123007, г. Москва, Хорошевское шоссе, д. 35, корпус 1
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-crimson-600" size={18} />
                <div style={{ color: 'var(--text-secondary)' }}>
                  <div>+7 (495) 144-42-02</div>
                  <div>+7 (903) 563-01-81</div>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-crimson-600" size={18} />
                <span style={{ color: 'var(--text-secondary)' }}>Общие обращения:<br /><a href="mailto:deti.geroi@mail.ru">deti.geroi@mail.ru</a><br /><br />Конкурс и турнир:<br /><a className="break-all" href={`mailto:${octoberProgram.email}`}>{octoberProgram.email}</a></span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Проект</h4>
            <p style={{ color: 'var(--text-secondary)' }} className="mb-4">
              АНО &quot;Центр патриотического воспитания и всестороннего развития детей и молодёжи &quot;Диалог поколений. Герои и дети&quot;
            </p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Организаторы октябрьского конкурса и турнира: {octoberProgram.organizers.join('; ')}.</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              © 2026 Диалог поколений. Все права защищены.
            </p>
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--text-muted)' }}>
              <div className="flex items-center space-x-2">
                <BrandLogo className="w-8 h-8" idPrefix="dp-logo-footer" />
                <span className="font-heading font-bold">Герои и дети</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderTop: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}
        >
          <span className="text-center sm:text-left">
            Разработано для АНО &quot;Центр патриотического воспитания и всестороннего развития детей и молодёжи &quot;Диалог поколений. Герои и дети&quot;
          </span>
          <PerformanceToggle />
        </div>
      </div>
    </footer>
  );
}
