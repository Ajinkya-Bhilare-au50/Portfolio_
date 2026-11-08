import { motion } from 'framer-motion';
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiPython, SiJsonwebtokens, SiMysql, SiMongodb,
  SiGit, SiGithub, SiDocker, SiPostman, SiLinux, SiGithubactions, SiFigma,
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import {
  TbApi, TbBrain, TbMessageLanguage, TbSparkles, TbMessageChatbot, TbEye, TbPrompt,
  TbLayout, TbServer, TbCloud,
} from 'react-icons/tb';

// `color` is the brand color; `light` overrides it on white backgrounds where contrast is poor.
// `mono` icons follow the text color (black in light mode, white in dark mode).
const skillsData = [
  {
    category: 'Frontend',
    icon: TbLayout,
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB', light: '#149ECA' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', light: '#D4B000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#2965F1' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8', light: '#06B6D4' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#8B5CF6', light: '#7952B3' },
    ],
  },
  {
    category: 'Backend',
    icon: TbServer,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express.js', icon: SiExpress, mono: true },
      { name: 'Java', icon: FaJava, color: '#F89820', light: '#E76F00' },
      { name: 'Python', icon: SiPython, color: '#FFD43B', light: '#3776AB' },
      { name: 'REST APIs', icon: TbApi, color: '#ff4d4d', light: '#ff2a2a' },
      { name: 'JWT Auth', icon: SiJsonwebtokens, color: '#D63AFF' },
      { name: 'MySQL', icon: SiMysql, color: '#4FA3D1', light: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    category: 'AI & ML',
    icon: TbBrain,
    skills: [
      { name: 'Machine Learning', icon: TbBrain, color: '#ff4d4d', light: '#ff2a2a' },
      { name: 'NLP', icon: TbMessageLanguage, color: '#A78BFA', light: '#8B5CF6' },
      { name: 'Generative AI', icon: TbSparkles, color: '#FBBF24', light: '#F59E0B' },
      { name: 'LLMs', icon: TbMessageChatbot, color: '#10A37F' },
      { name: 'Computer Vision', icon: TbEye, color: '#38BDF8', light: '#0EA5E9' },
      { name: 'Prompt Engineering', icon: TbPrompt, color: '#F472B6', light: '#EC4899' },
    ],
  },
  {
    category: 'Tools & Cloud',
    icon: TbCloud,
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, mono: true },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Linux', icon: SiLinux, color: '#FCC624', mono: 'light' },
      { name: 'CI/CD', icon: SiGithubactions, color: '#2088FF' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    ],
  },
];

const allSkills = skillsData.flatMap((c) => c.skills);
const half = Math.ceil(allSkills.length / 2);
const rowOne = allSkills.slice(0, half);
const rowTwo = allSkills.slice(half);

// Icon colored per theme via CSS variables.
const SkillIcon = ({ icon: Icon, color, light, mono, className }) => {
  if (mono === true) return <Icon className={`${className} text-black dark:text-white`} aria-hidden="true" />;
  const lightColor = mono === 'light' ? '#000000' : light || color;
  return (
    <Icon
      className={`${className} text-(--c-light) dark:text-(--c-dark)`}
      style={{ '--c-light': lightColor, '--c-dark': color }}
      aria-hidden="true"
    />
  );
};

const LogoPill = (skill) => (
  <div className="group/pill flex items-center gap-3 mx-2 md:mx-3 px-5 md:px-6 py-3 md:py-4 rounded-2xl shrink-0 transition-colors duration-300
                  bg-white border border-black/10 shadow-sm hover:border-black/25
                  dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none dark:hover:border-white/30 dark:hover:bg-white/[0.08]">
    <SkillIcon {...skill} className="w-7 h-7 md:w-8 md:h-8 shrink-0 group-hover/pill:scale-110 transition-transform" />
    <span className="text-black/80 dark:text-white/85 font-bold text-base md:text-lg whitespace-nowrap">{skill.name}</span>
  </div>
);

const MarqueeRow = ({ items, reverse = false, duration = '45s' }) => (
  <div className="marquee overflow-hidden py-2">
    {/* List is rendered twice so the -50% translate loops seamlessly */}
    <div className={`marquee-track ${reverse ? 'reverse' : ''}`} style={{ '--marquee-duration': duration }}>
      {[...items, ...items].map((s, i) => (
        <LogoPill key={`${s.name}-${i}`} {...s} />
      ))}
    </div>
  </div>
);

const CategoryCard = ({ category, icon: CategoryIcon, skills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    className="group relative rounded-3xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1.5
               bg-white border border-black/10 shadow-sm hover:border-[#ff2a2a]/60 hover:shadow-[0_20px_50px_rgba(255,42,42,0.12)]
               dark:bg-white/[0.03] dark:border-white/10 dark:shadow-none dark:hover:border-[#ff2a2a]/60 dark:hover:shadow-[0_20px_50px_rgba(255,42,42,0.15)]"
  >
    {/* Red top accent that grows on hover */}
    <div className="absolute top-0 left-0 h-[3px] w-12 bg-[#ff2a2a] group-hover:w-full transition-all duration-700" />

    <div className="flex items-center justify-between mb-6">
      <span className="w-11 h-11 rounded-xl bg-[#ff2a2a] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(255,42,42,0.35)]">
        <CategoryIcon className="w-6 h-6" />
      </span>
      <span className="text-5xl font-black text-black/[0.06] dark:text-white/[0.06] leading-none select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>

    <h3 className="text-xl font-black text-black dark:text-white tracking-tight mb-5">{category}</h3>

    <ul className="flex flex-col gap-3">
      {skills.map((skill) => (
        <li
          key={skill.name}
          className="flex items-center gap-3 text-sm font-semibold transition-colors text-black/65 hover:text-black dark:text-white/65 dark:hover:text-white"
        >
          <SkillIcon {...skill} className="w-5 h-5 shrink-0" />
          {skill.name}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Skills = () => (
  <section id="skills" className="relative w-full bg-[#f7f7f7] dark:bg-black py-24 md:py-32 overflow-hidden">
    {/* Red glow accents */}
    <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#ff2a2a]/10 dark:bg-[#ff2a2a]/15 rounded-full blur-[140px] pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#ff2a2a]/5 dark:bg-[#ff2a2a]/10 rounded-full blur-[120px] pointer-events-none" />

    {/* Header */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-14 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase text-[#ff2a2a] mb-5">
            <span className="w-8 h-[2px] bg-[#ff2a2a]" />
            Technical Stack
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white tracking-tight leading-[1.05]">
            Technologies I <br className="hidden sm:block" />
            Work With<span className="text-[#ff2a2a]">.</span>
          </h2>
        </div>
        <p className="text-black/55 dark:text-white/50 text-base md:text-lg max-w-sm leading-relaxed">
          Full-stack expertise across modern development, AI, and cloud infrastructure.
        </p>
      </motion.div>
    </div>

    {/* Scrolling logo bands */}
    <div className="relative z-10 flex flex-col gap-3 md:gap-4 mb-16 md:mb-24">
      <MarqueeRow items={rowOne} duration="50s" />
      <MarqueeRow items={rowTwo} reverse duration="50s" />
    </div>

    {/* Category cards */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {skillsData.map((item, i) => (
        <CategoryCard key={item.category} {...item} index={i} />
      ))}
    </div>
  </section>
);

export default Skills;
