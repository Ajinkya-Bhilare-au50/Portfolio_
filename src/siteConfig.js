// Personal details used across the site — update these in one place.
export const CONTACT_EMAIL = 'ajinkya0011@gmail.com';

// Section links shared by the navbar and footer. Each one must match a section id.
export const NAV_LINKS = ['Home', 'About', 'Expertise', 'Skills', 'Dashboard', 'Projects', 'Contact'];

// Links with an empty href are hidden. Add your LinkedIn URL to show it.
const ALL_SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '' },
  { label: 'GitHub', href: '' },
];

export const SOCIAL_LINKS = ALL_SOCIAL_LINKS.filter((s) => s.href);
