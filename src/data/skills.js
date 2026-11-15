// Skills shown in the Skills section and the Skills Dashboard. Edit them here.
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
export const skillsData = [
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

export const allSkills = skillsData.flatMap((c) => c.skills);
export const TECH_COUNT = allSkills.length;

// Self-rated proficiency (0–100) for the dashboard's "Core proficiency" chart.
// PLACEHOLDER VALUES — set these to your honest self-assessment.
export const proficiency = [
  { name: 'React', level: 85 },
  { name: 'JavaScript', level: 85 },
  { name: 'Tailwind CSS', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Express.js', level: 80 },
  { name: 'MongoDB', level: 75 },
  { name: 'Python', level: 70 },
  { name: 'Git & GitHub', level: 80 },
  { name: 'Generative AI', level: 65 },
  { name: 'Docker', level: 60 },
];

export const levelLabel = (level) => (level >= 80 ? 'Advanced' : level >= 60 ? 'Intermediate' : 'Learning');
