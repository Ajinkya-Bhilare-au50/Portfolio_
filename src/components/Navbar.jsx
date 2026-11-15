import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../useTheme';
import { NAV_LINKS } from '../siteConfig';

const sectionIds = NAV_LINKS.map((l) => l.toLowerCase());

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the link for the section currently in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Mobile menu: close on Esc and lock page scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Over the hero video / open red menu everything is white; once scrolled it follows the theme.
  const onDarkSurface = isOpen || !isScrolled;
  const toggleClasses = onDarkSurface
    ? 'text-white border-white/25 bg-white/10 backdrop-blur-md hover:bg-white hover:text-black'
    : 'text-gray-900 border-gray-300 bg-white hover:bg-gray-900 hover:text-white dark:text-white dark:border-white/20 dark:bg-white/5 dark:hover:bg-white dark:hover:text-black';

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOpen
          ? 'bg-brand py-4'
          : isScrolled
            ? 'bg-white/70 dark:bg-black/60 backdrop-blur-xl py-3 border-b border-gray-200/50 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className={`font-display text-2xl font-bold tracking-tight transition-colors duration-500 ${
            onDarkSurface ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}
        >
          Ajinkya<span className={isOpen ? 'text-black' : 'text-brand'}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-7 lg:space-x-8">
          {NAV_LINKS.map((link) => {
            const id = link.toLowerCase();
            const isActive = active === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`font-semibold text-sm tracking-wide relative group transition-colors duration-500 ${
                  isScrolled
                    ? isActive
                      ? 'text-gray-950 dark:text-white'
                      : 'text-gray-600 hover:text-gray-950 dark:text-white/70 dark:hover:text-white'
                    : isActive
                      ? 'text-white'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                {link}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-brand transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Desktop: theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={toggleTheme} className={toggleClasses} />
          <a
            href="#contact"
            className={`px-6 py-2.5 rounded-full text-sm font-black transition-all duration-500 ${
              isScrolled
                ? 'bg-gray-900 text-white hover:bg-brand dark:bg-white dark:text-black dark:hover:bg-brand dark:hover:text-white hover:shadow-[0_10px_25px_rgba(255,42,42,0.25)]'
                : 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md'
            }`}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} className={toggleClasses} />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg transition-colors duration-500 ${
              onDarkSurface ? 'text-white' : 'text-gray-900 dark:text-white'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[460px] py-6 opacity-100 bg-brand shadow-2xl' : 'max-h-0 opacity-0 pointer-events-none invisible'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-black font-extrabold text-base border-b border-white/10 pb-2.5 transition-colors"
            >
              {link}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="inline-block px-6 py-3 rounded-full bg-white text-brand font-black hover:bg-gray-950 hover:text-white transition-all duration-300 w-full text-center shadow-xl"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
