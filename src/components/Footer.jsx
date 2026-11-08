import { motion } from 'framer-motion';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../siteConfig';
import profileImage from '../assets/about/ajinkya-face.jpg';

const NAV_LINKS = ['Home', 'About', 'Expertise', 'Skills', 'Contact'];
const SERVICES = ['Frontend Development', 'Backend & APIs', 'AI & Machine Learning', 'Cloud & Deployment'];

const ArrowIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#0a0a0a] text-white w-full overflow-hidden border-t border-white/10">
      {/* Red glow */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#ff2a2a]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28">
        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 md:pb-20 border-b border-white/10"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#ff2a2a] mb-5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to new opportunities
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-2xl">
              Have an idea? <br />
              <span className="text-white/40">Let&apos;s make it real.</span>
            </h2>
          </div>

          <a
            href="#contact"
            className="group relative shrink-0 w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#ff2a2a] flex flex-col items-center justify-center gap-1
                       font-black text-sm md:text-base hover:scale-105 hover:shadow-[0_0_60px_rgba(255,42,42,0.45)] transition-all duration-500 self-start md:self-auto"
          >
            Let&apos;s Talk
            <ArrowIcon className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
          </a>
        </motion.div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 py-16">
          <div className="col-span-2 md:col-span-5">
            <a href="#home" className="group inline-flex items-center gap-4">
              <img
                src={profileImage}
                alt="Ajinkya Bhilare"
                width={520}
                height={520}
                loading="lazy"
                decoding="async"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#ff2a2a]/70 ring-offset-4 ring-offset-[#0a0a0a] group-hover:ring-[#ff2a2a] transition-all"
              />
              <span>
                <span className="block text-2xl font-black tracking-tight leading-none">
                  Ajinkya<span className="text-[#ff2a2a]">.</span>
                </span>
                <span className="block text-xs font-semibold text-white/50 mt-1.5">Ajinkya Bhilare · Full Stack Developer</span>
              </span>
            </a>
            <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-sm">
              Full Stack Developer crafting fast, scalable and modern web applications with React, Node.js, AI and the cloud.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group mt-6 inline-flex items-center gap-2 text-base font-bold border-b border-white/20 pb-1 hover:border-[#ff2a2a] hover:text-[#ff2a2a] transition-colors"
            >
              {CONTACT_EMAIL}
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-5">Navigate</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-semibold text-white/75 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-5">What I Do</h4>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm font-semibold text-white/75">{s}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-5">Socials</h4>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 hover:text-white transition-colors"
                  >
                    {s.label}
                    <ArrowIcon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Giant name */}
      <div className="relative z-10 w-full overflow-hidden select-none pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[21vw] leading-[0.8] font-black tracking-tighter text-center uppercase
                     bg-gradient-to-b from-white/90 via-white/25 to-transparent bg-clip-text text-transparent"
        >
          Ajinkya<span className="text-[#ff2a2a]">.</span>
        </motion.h2>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-medium">
          <p>&copy; {year} Ajinkya Bhilare. All rights reserved.</p>
          <p className="hidden md:block">Designed &amp; built with React + Tailwind</p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold uppercase tracking-widest"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#ff2a2a] group-hover:border-[#ff2a2a] transition-all">
              <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
