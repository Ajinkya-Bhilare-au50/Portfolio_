// Your projects — edit the text, tech, and links below.
// image: import a screenshot (e.g. `import shot from '../assets/projects/stackoverflow.png'`) and set `image: shot`.
//        Leave it null to show the built-in browser-window mockup instead.
// live / github: set to '' to hide that button.

import aureliaShot from '../assets/projects/aurelia-jewellery.webp';
import connectlyShot from '../assets/projects/connectly.webp';
import medikartShot from '../assets/projects/medikart.webp';

export const projects = [
  {
    title: 'Aurelia Fine Jewellery',
    tagline: 'Luxury E-Commerce Storefront',
    description:
      'A premium online jewellery boutique with an editorial, magazine-style design. Shoppers browse rings, necklaces, earrings and bracelets, explore curated collections and build their bag, all in a refined light or dark theme.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Category browsing, new arrivals and best-seller collections with live pricing and discounts',
      'Shopping bag, wishlist, account sign-in and order tracking',
      'Light / dark theme, accessible navigation and an elegant serif-led design system',
    ],
    image: aureliaShot,
    live: 'https://aurelia-jewellery-blush.vercel.app',
    github: '',
  },
  {
    title: 'Stack Overflow Website',
    tagline: 'Developer Q&A Platform',
    description:
      'A full-stack question-and-answer platform for developers, inspired by Stack Overflow. Users can post questions, share answers, and vote on the most helpful solutions.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
    highlights: [
      'Ask, answer and edit questions with tag-based organisation',
      'Upvote / downvote system for questions and answers',
      'Secure sign-up and login with JWT authentication',
    ],
    image: null,
    live: '',
    github: '',
  },
  {
    title: 'Connectly',
    tagline: 'Social Media Platform',
    description:
      'A modern social networking platform built to bring people closer through meaningful digital connections. Users sign up, share posts and photos, follow each other and join conversations through hashtags, all in a clean, responsive light or dark interface.',
    tech: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Secure user authentication with sign-up, login and personal profiles',
      'Interactive home feed: post text and images, then like, repost, comment, bookmark and share',
      'Follow suggestions, hashtag explore page, trending topics and search',
      'Responsive, mobile-friendly design with smooth light / dark mode',
    ],
    image: connectlyShot,
    live: 'https://connectly-ecru-one.vercel.app',
    github: '',
  },
  {
    title: 'MediKart+',
    tagline: 'Online Pharmacy Platform',
    description:
      'A full-featured online pharmacy where customers search and order genuine medicines, upload prescriptions for pharmacist verification and book diagnostic tests with home sample collection, all in a clean, trustworthy healthcare interface.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Render'],
    highlights: [
      'Medicine search, category browsing and bestseller collections with MRP, discounts and Rx tags',
      'Prescription upload flow with pharmacist verification for prescription-only medicines',
      'Cart, one-click reorder and order tracking with delivery-location selection',
      'Health test booking with home sample collection and online reports',
    ],
    image: medikartShot,
    live: 'https://medikart-t0dg.onrender.com',
    github: '',
  },
  {
    title: 'E-Commerce Website',
    tagline: 'Online Shopping Platform',
    description:
      'A complete online store with product browsing, a shopping cart and checkout flow, built to deliver a fast and smooth shopping experience.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    highlights: [
      'Product catalogue with search, categories and filters',
      'Shopping cart and checkout flow',
      'User accounts with order history',
    ],
    image: null,
    live: '',
    github: '',
  },
];
