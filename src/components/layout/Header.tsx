'use client';

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '@/components/theme/ThemeToggle';
import BrandLogo from '@/components/ui/BrandLogo';

const navItems = [
  { name: 'Главная', href: '/' },
  {
    name: 'О нас',
    href: '/about',
    subItems: [
      { name: 'Наша команда', href: '/about' },
      { name: 'Контакты', href: '/contact' }
    ]
  },
  { name: 'Мероприятия', href: '/route' },
  {
    name: 'Герои',
    href: '/heroes',
    subItems: [
      { name: 'Герои России', href: '/heroes' },
      { name: 'Письма памяти', href: '/heroes/letters' },
    ]
  },
  {
    name: 'Творчество',
    href: '/creativity',
    subItems: [
      { name: 'Работы', href: '/creativity' },
      { name: 'Конкурсы', href: '/creativity/contests' },
    ]
  },
  { name: 'Медиа', href: '/media' },
];

/* Маршруты с большим объёмом медиа — не префетчим их в фоне,
   чтобы не создавать лишнюю нагрузку на нестабильном соединении */
const heavyRoutes = new Set(['/media', '/heroes/letters']);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);

  function closeMobileMenu() {
    setIsMenuOpen(false);
    setMobileSubOpen(null);
  }

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
      }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Container */}
          <Link
            href="/"
            aria-label="Диалог поколений. Герои и дети — на главную"
            className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0"
          >
            <div className="animate-logo-scale">
              {/* Ссылка уже имеет aria-label — логотип декоративный */}
              <BrandLogo className="w-10 h-10 sm:w-[50px] sm:h-[50px]" idPrefix="dp-logo-header" />
            </div>
            <div className="flex flex-col items-start animate-logo-text">
              <span
                className="font-heading font-extrabold uppercase leading-[1.05] text-[13px] sm:text-[16px]"
                style={{ color: 'var(--text-primary)', letterSpacing: '0.04em' }}
              >
                Диалог
              </span>
              <span
                className="font-heading font-extrabold uppercase leading-[1.05] text-[13px] sm:text-[16px]"
                style={{ color: 'var(--text-primary)', letterSpacing: '0.04em' }}
              >
                поколений
              </span>
              <div
                className="w-full mt-1 animate-logo-line"
                style={{
                  height: '2px',
                  background: 'linear-gradient(to right, #1565C0 0%, #B71C1C 100%)',
                  borderRadius: '1px',
                }}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-8 flex-1 justify-center mx-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative flex items-center">
                {item.subItems ? (
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => setIsSubMenuOpen(item.name)}
                    onMouseLeave={() => setIsSubMenuOpen(null)}
                  >
                    <button
                      className="font-medium transition-colors hover:text-crimson-600 flex items-center gap-1 py-2 px-1 whitespace-nowrap"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.name}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isSubMenuOpen === item.name ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    {isSubMenuOpen === item.name && (
                      <div className="absolute left-0 top-full pt-1 w-40 z-50">
                        <div className="rounded-md shadow-lg overflow-hidden"
                             style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                prefetch={heavyRoutes.has(subItem.href) ? false : undefined}
                                className="block px-4 py-2 text-sm transition-colors hover:bg-blue-500/10 hover:text-crimson-600"
                                style={{ color: 'var(--text-secondary)' }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={heavyRoutes.has(item.href) ? false : undefined}
                    className="font-medium transition-colors hover:text-crimson-600 py-2 px-1 whitespace-nowrap"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Actions Container */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 flex-shrink-0">
            <ThemeToggle />
            <button
              className="md:hidden transition-colors p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: 'var(--text-primary)' }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav
            className="md:hidden"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            {navItems.map((item, idx) => (
              <div
                key={item.name}
                style={{ borderBottom: idx < navItems.length - 1 ? '1px solid var(--border-color)' : 'none' }}
              >
                {item.subItems ? (
                  <>
                    {/* Parent row — toggle accordion */}
                    <button
                      onClick={() => setMobileSubOpen(mobileSubOpen === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={17}
                        className="transition-transform duration-200 flex-shrink-0"
                        style={{
                          color: 'var(--text-muted)',
                          transform: mobileSubOpen === item.name ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>

                    {/* Sub-items */}
                    {mobileSubOpen === item.name && (
                      <div
                        className="pb-2"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            prefetch={heavyRoutes.has(subItem.href) ? false : undefined}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 py-3 pr-5 text-sm font-medium transition-colors hover:text-crimson-600"
                            style={{
                              color: 'var(--text-secondary)',
                              paddingLeft: '1.25rem',
                              borderLeft: '3px solid #b71c1c',
                              marginLeft: '1.25rem',
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={heavyRoutes.has(item.href) ? false : undefined}
                    onClick={closeMobileMenu}
                    className="flex items-center px-5 py-4 font-semibold transition-colors hover:text-crimson-600"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
