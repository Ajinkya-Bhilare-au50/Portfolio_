import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const ArrowIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const GithubIcon = ({ className = '' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

// Shown when a project has no screenshot yet: a styled browser window.
const Mockup = ({ title, index }) => (
  <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#ff2a2a] via-[#c41616] to-[#1a0505]">
    <div className="flex items-center gap-1.5 px-4 py-3 bg-black/25">
      <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/35" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <span className="ml-3 flex-1 h-5 rounded-md bg-white/10" />
    </div>
    <div className="relative flex-1 flex items-center justify-center p-8 overflow-hidden">
      <span className="absolute -right-4 -bottom-10 text-[11rem] font-black text-white/10 leading-none select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative w-full max-w-sm flex flex-col gap-3">
        <div className="h-4 w-1/2 rounded bg-white/80" />
        <div className="h-3 w-3/4 rounded bg-white/35" />
        <div className="h-3 w-2/3 rounded bg-white/35" />
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="h-16 rounded-lg bg-white/15" />
          <div className="h-16 rounded-lg bg-white/15" />
          <div className="h-16 rounded-lg bg-white/15" />
        </div>
        <p className="mt-2 text-white font-black text-xl tracking-tight">{title}</p>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project, index }) => {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
    >
      {/* Visual */}
      <div className={`relative ${flip ? 'lg:order-2' : ''}`}>
        <div
          className="relative aspect-[16/10] rounded-3xl overflow-hidden border transition-all duration-700
                     border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)]
                     group-hover:shadow-[0_40px_80px_rgba(255,42,42,0.25)] group-hover:-translate-y-2"
        >
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-[1.04]">
            {project.image ? (
              <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="w-full h-full object-cover object-top" />
            ) : (
              <Mockup title={project.title} index={index} />
            )}
          </div>
        </div>
        {/* Floating number badge */}
        <span
          className={`absolute -top-5 ${flip ? '-right-3 lg:-right-5' : '-left-3 lg:-left-5'} w-14 h-14 rounded-2xl bg-[#ff2a2a] text-white
                      font-black text-lg flex items-center justify-center shadow-[0_10px_30px_rgba(255,42,42,0.45)] rotate-[-6deg]
                      group-hover:rotate-0 transition-transform duration-500`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className={flip ? 'lg:order-1' : ''}>
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#ff2a2a] mb-3">{project.tagline}</p>
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-black dark:text-white mb-5">{project.title}</h3>
        <p className="text-black/60 dark:text-white/60 text-base md:text-lg leading-relaxed mb-6">{project.description}</p>

        {project.highlights?.length > 0 && (
          <ul className="flex flex-col gap-2.5 mb-7">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm font-semibold text-black/75 dark:text-white/75">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ff2a2a] shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold border
                         bg-black/[0.03] border-black/10 text-black/70 dark:bg-white/[0.05] dark:border-white/10 dark:text-white/75"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff2a2a] text-white text-sm font-black
                         hover:shadow-[0_12px_30px_rgba(255,42,42,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Live Demo
              <ArrowIcon className="w-4 h-4 group-hover/btn:rotate-45 transition-transform duration-300" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black border transition-all duration-300 hover:-translate-y-0.5
                         border-black/15 text-black hover:bg-black hover:text-white
                         dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <GithubIcon className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => (
  <section id="projects" className="relative w-full bg-white dark:bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 overflow-hidden">
    <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-[#ff2a2a]/5 dark:bg-[#ff2a2a]/10 rounded-full blur-[140px] pointer-events-none" />

    <div className="relative z-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-24"
      >
        <div>
          <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase text-[#ff2a2a] mb-5">
            <span className="w-8 h-[2px] bg-[#ff2a2a]" />
            Selected Work
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white tracking-tight leading-[1.05]">
            Featured Projects<span className="text-[#ff2a2a]">.</span>
          </h2>
        </div>
        <p className="text-black/55 dark:text-white/50 text-base md:text-lg max-w-sm leading-relaxed">
          {projects.length} completed projects — from idea to deployment.
        </p>
      </motion.div>

      {/* Project list */}
      <div className="flex flex-col gap-24 md:gap-32">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
