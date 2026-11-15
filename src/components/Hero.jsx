import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroImage from '../assets/hero/hero.jpg';
import { projects } from '../data/projects';
import { TECH_COUNT } from '../data/skills';

const HIGHLIGHTS = [`${projects.length} projects shipped`, `${TECH_COUNT} technologies`, 'Open to work'];

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
      {/* Background image (1920×1080). On narrow screens keep the portrait side in view. */}
      <img
        src={heroImage}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[72%_center] md:object-center z-0 animate-[hero-zoom_18s_ease-out_forwards] motion-reduce:animate-none"
      />

      {/* Readability overlays: left fade for the text, bottom fade into the page */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
      {/* Mobile: darker fade behind the text, which sits low on the screen */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent z-10 pointer-events-none" />

      <div className="absolute inset-0 z-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start text-left w-full h-full pb-16 md:pb-0 md:pt-[12%]">
        <div className="flex flex-col items-start text-left max-w-lg lg:max-w-2xl w-full">
          <p
            data-aos="fade-up"
            className="inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-white/80 mb-5"
          >
            <span className="w-8 h-[2px] bg-brand" />
            Hi, I&apos;m
          </p>

          <h1
            data-aos="fade-up"
            data-aos-delay="50"
            className="font-display text-white text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight leading-[0.95]"
          >
            Ajinkya Bhilare<span className="text-brand">.</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-brand"
          >
            Full Stack &amp; AI Developer
          </p>

          <p
            data-aos="fade-up"
            data-aos-delay="250"
            className="text-white/85 text-sm md:text-base lg:text-lg font-medium mb-8 max-w-sm md:max-w-md leading-relaxed"
          >
            I build fast, scalable and modern web applications using React, Node.js and Tailwind CSS.
          </p>

          <div data-aos="fade-up" data-aos-delay="350" className="flex flex-row items-center gap-4 w-full">
            <a
              href="#projects"
              className="px-6 py-2.5 md:px-7 md:py-3 text-xs md:text-sm rounded-full bg-white text-black font-bold hover:bg-brand hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg inline-block text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 md:px-7 md:py-3 text-xs md:text-sm rounded-full bg-black/10 border border-white text-white font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 inline-block text-center"
            >
              Contact Me
            </a>
          </div>

          <ul
            data-aos="fade-up"
            data-aos-delay="450"
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm font-semibold text-white/70"
          >
            {HIGHLIGHTS.map((h, i) => (
              <li key={h} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${i === HIGHLIGHTS.length - 1 ? 'bg-emerald-400 animate-pulse' : 'bg-brand'}`} />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        data-aos="fade-up"
        data-aos-delay="800"
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <span className="block animate-bounce motion-reduce:animate-none">
          <svg className="w-5 h-5 text-white opacity-70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </a>
    </section>
  );
};

export default Hero;
