import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import profileImage from '../assets/about/ajinkya.png';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../siteConfig';

const initialForm = { firstName: '', lastName: '', email: '', phone: '', message: '', permission: false };

const Field = ({ id, label, type = 'text', value, onChange, textarea = false, ...rest }) => {
  const shared = {
    id,
    name: id,
    value,
    onChange,
    required: true,
    ...rest,
    placeholder: ' ',
    className:
      'peer w-full rounded-2xl px-5 pt-7 pb-3 text-base resize-none transition-all duration-300 focus:outline-none focus:border-[#ff2a2a] ' +
      'bg-black/[0.03] border border-black/10 text-black focus:bg-white ' +
      'dark:bg-white/[0.03] dark:border-white/10 dark:text-white dark:focus:bg-white/[0.06]',
  };

  return (
    <div className="relative">
      {textarea ? <textarea rows={5} {...shared} /> : <input type={type} {...shared} />}
      <label
        htmlFor={id}
        className="absolute left-5 top-5 text-black/40 dark:text-white/40 text-base pointer-events-none transition-all duration-200
                   peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-[#ff2a2a]
                   peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px]
                   peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase"
      >
        {label}
      </label>
    </div>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.permission) {
      setError('Please allow me to contact you at this email address.');
      return;
    }
    setStatus('sending');

    // Netlify Forms only exists on the deployed site — simulate success on the local dev server.
    if (import.meta.env.DEV) {
      console.info('[dev] Netlify Forms is not available locally. Payload:', formData);
      setTimeout(() => setStatus('sent'), 700);
      return;
    }

    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        'bot-field': e.target.elements['bot-field']?.value || '',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        permission: formData.permission ? 'yes' : 'no',
      });
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
    } catch (err) {
      console.error('Form submission failed:', err);
      setStatus('idle');
      setError(`Something went wrong. Please try again or email me directly at ${CONTACT_EMAIL}.`);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setStatus('idle');
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-white dark:bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden border-t border-black/5 dark:border-gray-900 py-28 md:py-36 px-6 md:px-12"
    >
      {/* Huge parallax background text */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex justify-center items-start pointer-events-none z-0 pt-10"
      >
        <h1
          className="text-[25vw] leading-[0.75] font-black text-black/[0.035] dark:text-white/[0.04] uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Red glow accents */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#ff2a2a]/10 dark:bg-[#ff2a2a]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#ff2a2a]/5 dark:bg-[#ff2a2a]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-stretch">
        {/* Left: profile + info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col justify-between gap-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#ff2a2a] mb-6">
              <span className="w-8 h-[2px] bg-[#ff2a2a]" />
              Get in touch
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white leading-[1.05] tracking-tight mb-6">
              Let&apos;s build something <span className="text-[#ff2a2a]">great</span> together.
            </h2>
            <p className="text-black/60 dark:text-white/60 text-base md:text-lg leading-relaxed max-w-md">
              Have a project in mind, a role to fill, or just want to say hi? Drop a message and I&apos;ll get back to you soon.
            </p>
          </div>

          {/* Profile card */}
          <div className="flex items-center gap-5 p-4 pr-6 rounded-3xl backdrop-blur-md w-fit bg-white border border-black/10 shadow-sm dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none">
            <div className="relative shrink-0">
              <img
                src={profileImage}
                alt="Ajinkya Bhilare"
                width={1254}
                height={1254}
                loading="lazy"
                decoding="async"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover object-[center_35%] ring-2 ring-[#ff2a2a]/60"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-[3px] border-white dark:border-[#0a0a0a]">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
              </span>
            </div>
            <div>
              <p className="text-black dark:text-white font-black text-lg md:text-xl tracking-tight">Ajinkya Bhilare</p>
              <p className="text-black/50 dark:text-white/50 text-sm font-medium">Full Stack Developer</p>
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-1.5 tracking-wide">Available for work</p>
            </div>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-center gap-4 text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors w-fit"
            >
              <span className="w-11 h-11 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center group-hover:bg-[#ff2a2a] group-hover:border-[#ff2a2a] group-hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="font-semibold">{CONTACT_EMAIL}</span>
            </a>
            <div className="flex gap-3 mt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-full border text-sm font-bold transition-all duration-300
                             border-black/15 text-black/70 hover:text-black hover:border-black
                             dark:border-white/15 dark:text-white/70 dark:hover:text-white dark:hover:border-white"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: form card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative rounded-[2rem] backdrop-blur-xl p-6 sm:p-10 overflow-hidden
                     bg-white/90 border border-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                     dark:bg-[#111]/80 dark:border-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#ff2a2a] to-transparent" />

          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[460px] flex flex-col items-center justify-center text-center gap-5"
              >
                <div className="w-20 h-20 rounded-full bg-[#ff2a2a] flex items-center justify-center shadow-[0_0_40px_rgba(255,42,42,0.5)]">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-black dark:text-white">Thanks, {formData.firstName}!</h3>
                <p className="text-black/60 dark:text-white/60 max-w-xs">Your message is on its way. I&apos;ll reply to {formData.email} shortly.</p>
                <button
                  onClick={resetForm}
                  className="mt-4 px-6 py-2.5 rounded-full border text-sm font-bold transition-all duration-300
                             border-black/20 text-black hover:bg-black hover:text-white
                             dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                <h3 className="text-black dark:text-white text-2xl font-black tracking-tight mb-2">Send a message</h3>

                {/* Honeypot: hidden from people, bots fill it and Netlify discards the submission */}
                <p className="hidden" aria-hidden="true">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="firstName" label="First name" value={formData.firstName} onChange={handleChange} />
                  <Field id="lastName" label="Last name" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="email" type="email" label="Email address" value={formData.email} onChange={handleChange} autoComplete="email" />
                  <Field
                    id="phone"
                    type="tel"
                    label="Contact number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="\+?[0-9\s\-\(\)]{7,20}"
                    title="Enter a valid phone number, e.g. +91 98765 43210"
                  />
                </div>
                <Field id="message" label="Your message" value={formData.message} onChange={handleChange} textarea />

                <label htmlFor="permission" className="flex items-start gap-3 text-sm text-black/60 dark:text-white/60 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="permission"
                    checked={formData.permission}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 cursor-pointer"
                    style={{ accentColor: '#ff2a2a' }}
                  />
                  I give permission to contact me at this email address.
                </label>

                {error && <p className="text-[#ff2a2a] text-sm font-semibold -mt-2">{error}</p>}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group mt-2 w-full py-4 rounded-2xl bg-[#ff2a2a] text-white font-black tracking-wide flex items-center justify-center gap-3
                             hover:bg-black dark:hover:bg-white dark:hover:text-[#ff2a2a] hover:shadow-[0_15px_40px_rgba(255,42,42,0.35)] transition-all duration-300
                             disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
