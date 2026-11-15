import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsData, TECH_COUNT, proficiency, levelLabel } from '../data/skills';
import { projects } from '../data/projects';

// ---- Data derived from the real skills + projects lists ----

const categoryRows = skillsData.map((c) => ({
  label: c.category,
  icon: c.icon,
  value: c.skills.length,
  detail: c.skills.map((s) => s.name).join(' · '),
}));

const usageRows = (() => {
  const map = new Map();
  projects.forEach((p) =>
    p.tech.forEach((t) => {
      if (!map.has(t)) map.set(t, []);
      map.get(t).push(p.title);
    })
  );
  return [...map.entries()]
    .map(([label, used]) => ({ label, value: used.length, detail: used.join(' · ') }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
    .slice(0, 8);
})();

const topTech = usageRows[0];

const KPIS = [
  { value: TECH_COUNT, label: 'Technologies', note: `across ${skillsData.length} areas` },
  { value: projects.length, label: 'Projects shipped', note: 'idea to deployment' },
  { value: skillsData.length, label: 'Skill areas', note: 'frontend to cloud' },
  { value: topTech.label, label: 'Most-used tech', note: `in ${topTech.value} of ${projects.length} projects`, small: true },
];

// ---- Building blocks ----

const Card = ({ title, subtitle, children, className = '' }) => (
  <div className={`flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 ${className}`}>
    <div className="mb-6">
      <h3 className="text-lg md:text-xl font-bold tracking-tight text-white">{title}</h3>
      {subtitle && <p className="text-sm text-white/50 mt-1">{subtitle}</p>}
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

// One horizontal bar. Hover/focus highlights it, dims its siblings and shows a tooltip.
const BarRow = ({ row, max, unit, active, onActive, index, icon: Icon }) => {
  const reduce = useReducedMotion();
  const pct = (row.value / max) * 100;
  const dimmed = active !== null && active !== index;

  return (
    <li
      tabIndex={0}
      aria-label={`${row.label}: ${row.value} ${unit}. ${row.detail}`}
      onMouseEnter={() => onActive(index)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(index)}
      onBlur={() => onActive(null)}
      className={`relative grid grid-cols-[7.5rem_1fr_2rem] sm:grid-cols-[9rem_1fr_2.5rem] items-center gap-3 py-2 rounded-lg outline-none transition-opacity duration-200 ${
        dimmed ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-white/80 truncate">
        {Icon && <Icon className="w-4 h-4 shrink-0 text-white/50" aria-hidden="true" />}
        {row.label}
      </span>

      {/* Track + bar (4px rounded data end, square at the baseline) */}
      <span className="relative h-3 rounded-r-[4px] bg-white/[0.06]">
        <motion.span
          className="absolute inset-y-0 left-0 bg-brand rounded-r-[4px]"
          initial={{ width: reduce ? `${pct}%` : 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>

      <span className="text-sm font-bold text-white tabular-nums text-right">{row.value}</span>

      {/* Tooltip */}
      {active === index && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-0 sm:left-[9rem] bottom-full mb-1 z-20 max-w-xs rounded-xl border border-white/15 bg-[#1a1a1a] px-3.5 py-2.5 text-xs text-white/70 shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
        >
          <span className="block text-white font-bold text-sm mb-0.5">
            {row.label} — {row.value} {unit}
          </span>
          {row.detail}
        </span>
      )}
    </li>
  );
};

const BarChart = ({ rows, max, unit, withIcons = false }) => {
  const [active, setActive] = useState(null);
  return (
    <ul className="flex flex-col h-full justify-around">
      {rows.map((row, i) => (
        <BarRow
          key={row.label}
          row={row}
          max={max}
          unit={unit}
          index={i}
          active={active}
          onActive={setActive}
          icon={withIcons ? row.icon : null}
        />
      ))}
    </ul>
  );
};

// Proficiency meter with quarter ticks.
const Meter = ({ name, level, index }) => {
  const reduce = useReducedMotion();
  const label = levelLabel(level);
  return (
    <li className="py-1" aria-label={`${name}: ${label}, self-rated ${level} out of 100`}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-semibold text-white/85">{name}</span>
        <span className="text-xs font-bold text-white/50 uppercase tracking-wider">{label}</span>
      </div>
      <div className="relative h-2 rounded-r-[4px] bg-white/[0.06] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-brand rounded-r-[4px]"
          initial={{ width: reduce ? `${level}%` : 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
        {[25, 50, 75].map((t) => (
          <span key={t} className="absolute inset-y-0 w-[2px] bg-ink" style={{ left: `${t}%` }} aria-hidden="true" />
        ))}
      </div>
    </li>
  );
};

// ---- Section ----

const SkillsDashboard = () => {
  const maxCategory = Math.max(...categoryRows.map((r) => r.value));

  return (
    <section id="dashboard" className="relative w-full bg-ink text-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute -top-40 right-0 w-[500px] h-[400px] bg-brand/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase text-brand mb-5">
              <span className="w-8 h-[2px] bg-brand" />
              Skills Dashboard
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              My stack, by the numbers<span className="text-brand">.</span>
            </h2>
          </div>
          <p className="text-white/55 text-base md:text-lg max-w-sm leading-relaxed">
            A live summary of the technologies I work with and how often they show up in my projects.
          </p>
        </motion.div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-5">
          {KPIS.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{k.label}</p>
              <p
                className={`font-display font-bold tracking-tight leading-none mt-3 text-white ${
                  k.small ? 'text-3xl md:text-4xl' : 'text-5xl md:text-6xl'
                }`}
              >
                {k.value}
              </p>
              <p className="text-xs md:text-sm text-white/45 mt-3">{k.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <Card title="Skills by area" subtitle="Number of technologies in each area">
            <BarChart rows={categoryRows} max={maxCategory} unit="technologies" withIcons />
          </Card>
          <Card title="Most used in projects" subtitle={`Projects using each technology (out of ${projects.length})`}>
            <BarChart rows={usageRows} max={projects.length} unit={`of ${projects.length} projects`} />
          </Card>
        </div>

        <Card title="Core proficiency" subtitle="Self-rated · ticks mark 25 / 50 / 75%">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {proficiency.map((p, i) => (
              <Meter key={p.name} {...p} index={i} />
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default SkillsDashboard;
