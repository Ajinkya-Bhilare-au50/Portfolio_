import { motion } from 'framer-motion';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPython } from 'react-icons/si';
import profileImage from '../assets/about/ajinkya-desk.png';
import { projects } from '../data/projects';

const CORE_STACK = [
  { name: 'React', icon: SiReact, color: '#149ECA' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Express', icon: SiExpress, color: '#000000' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
];

const STATS = [
  { value: String(projects.length), label: 'Projects completed' },
  { value: '29+', label: 'Technologies' },
  { value: '4', label: 'Expertise areas' },
];

const Star = ({ className, style }) => (
  <div className={`absolute text-black opacity-25 animate-pulse pointer-events-none ${className}`} style={style}>
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
    </svg>
  </div>
);

const About = () => {
  return (
    <section id="about" className="bg-[#ff2a2a] pt-24 pb-40 md:pb-48 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[340px_1fr] gap-16 lg:gap-24 items-center">
        {/* ID badge */}
        <div className="flex justify-center mt-16 md:mt-0">
          <div data-aos="drop-bounce" className="relative w-full max-w-[290px]">
            {/* Lanyard */}
            <div className="absolute -top-40 left-1/2 w-3 h-44 bg-black -translate-x-1/2 z-0" />
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-300 rounded border border-gray-400 -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]" />

            <div className="relative z-20 bg-[#111] rounded-3xl p-3 pb-5 shadow-[0_30px_60px_rgba(0,0,0,0.45)] -rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Clip slot */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-[#111] rounded-t-xl -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/50 rounded-full" />
              </div>

              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200">
                <img
                  src={profileImage}
                  alt="Ajinkya Bhilare"
                  width={1032}
                  height={982}
                  className="w-full h-full object-cover object-[60%_center]"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[10px] font-bold text-white tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>

              {/* Badge details */}
              <div className="px-2 pt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-white font-black text-lg leading-tight tracking-tight">Ajinkya Bhilare</p>
                  <p className="text-[#ff2a2a] text-xs font-bold uppercase tracking-[0.15em] mt-1">Full Stack Developer</p>
                </div>
                {/* Faux barcode */}
                <div className="flex items-end gap-[2px] h-8 opacity-70 shrink-0" aria-hidden="true">
                  {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2].map((w, i) => (
                    <span key={i} className="bg-white h-full" style={{ width: w }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20"
        >
          <span className="inline-flex items-center gap-3 text-xs font-black tracking-[0.25em] uppercase text-black/70 mb-5">
            <span className="w-8 h-[2px] bg-black/70" />
            About Me
          </span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[0.95] mb-7">
            Hello! I&apos;m <br />
            <span className="text-white">Ajinkya.</span>
          </h2>

          <p className="text-lg md:text-xl font-semibold text-white leading-relaxed max-w-2xl mb-4">
            A passionate <span className="text-black font-black">full-stack developer</span> dedicated to crafting clean,
            functional, and highly scalable web applications.
          </p>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mb-10">
            I enjoy turning ideas into products — from pixel-perfect React interfaces to secure APIs, databases, and
            AI-powered features — and shipping them to the cloud.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 max-w-lg mb-10 border-y border-black/15">
            {STATS.map((s, i) => (
              <div key={s.label} className={`py-5 ${i > 0 ? 'pl-5 border-l border-black/15' : ''}`}>
                <p className="text-4xl md:text-5xl font-black text-black leading-none">{s.value}</p>
                <p className="text-xs md:text-sm font-bold text-white/85 mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Core stack */}
          <p className="text-xs font-black tracking-[0.2em] uppercase text-black/70 mb-4">Core Stack</p>
          <div className="flex flex-wrap gap-3 mb-10">
            {CORE_STACK.map(({ name, icon: Icon, color }, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="inline-flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] cursor-default"
              >
                <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />
                <span className="text-sm font-black text-black">{name}</span>
              </motion.span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-full bg-black text-white text-sm font-black hover:bg-white hover:text-black hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
            >
              See My Projects
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full border-2 border-black text-black text-sm font-black hover:bg-black hover:text-white hover:-translate-y-0.5 transition-all duration-300"
            >
              Let&apos;s Talk
            </a>
          </div>
        </motion.div>
      </div>

      {/* Wave divider — matches the next section's background in both themes */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white dark:fill-[#0a0a0a]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
        </svg>
      </div>

      <Star className="top-12 right-10 md:right-20 w-16 h-16" />
      <Star className="bottom-36 left-4 md:left-16 w-20 h-20" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default About;
