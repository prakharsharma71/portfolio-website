import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Check,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MousePointer2,
  Palette,
  Phone,
  Search,
  ServerCog,
  ShoppingBag,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { portfolio } from './contentParser.js';
import portraitHero from '../WhatsApp Image 2026-06-19 at 15.17.27.jpeg';
import portraitStory from '../WhatsApp Image 2026-06-19 at 15.18.01.jpeg';

const navItems = ['Projects', 'Services', 'Skills', 'About', 'Contact'];
const accentPairs = [
  ['#7c3aed', '#2563eb'],
  ['#2563eb', '#f97316'],
  ['#f97316', '#7c3aed'],
  ['#0f766e', '#2563eb'],
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function useMeta(profile) {
  useEffect(() => {
    const title = `${profile.name} | Premium Web, SEO & AI Portfolio`;
    const description =
      'Premium digital experiences across Shopify, WordPress, custom websites, SEO and AI-powered business workflows.';
    document.title = title;
    const updates = [
      ['name', 'description', description],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
    ];
    updates.forEach(([attr, key, value]) => {
      const node = document.querySelector(`meta[${attr}="${key}"]`);
      if (node) node.setAttribute('content', value);
    });
  }, [profile.name]);
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function MouseGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 90, damping: 28 });
  const springY = useSpring(y, { stiffness: 90, damping: 28 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-0 hidden h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.13),rgba(37,99,235,0.08)_36%,transparent_68%)] blur-2xl md:block"
      style={{ x: springX, y: springY }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-violet via-ocean to-ember" style={{ scaleX }} />;
}

function SectionHeading({ eyebrow, title, copy, align = 'center' }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('mx-auto mb-10 max-w-3xl', align === 'center' ? 'text-center' : 'text-left')}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {copy && <p className="mt-5 text-base leading-8 text-ink/65 sm:text-lg">{copy}</p>}
    </motion.div>
  );
}

function MagneticButton({ href, children, variant = 'primary', icon: Icon = ArrowUpRight, className = '', onClick, type = 'button' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const move = (event) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2',
    variant === 'primary'
      ? 'bg-ink text-white shadow-soft hover:bg-violet'
      : 'border border-ink/10 bg-white/60 text-ink backdrop-blur-xl hover:border-violet/30 hover:text-violet',
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={move}
        onMouseLeave={reset}
        style={{ x: springX, y: springY }}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={classes}
    >
      {content}
    </motion.button>
  );
}

function Header({ profile }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <nav className="mx-auto flex w-[calc(100vw-2rem)] max-w-[22.5rem] items-center justify-between rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-[0_14px_50px_rgba(23,21,31,0.08)] backdrop-blur-2xl md:max-w-7xl">
        <a href="#home" className="flex items-center gap-3" aria-label="Prakhar Sharma home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-bold text-white">PS</span>
          <span className="hidden text-sm font-semibold text-ink sm:block">{profile.name}</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition hover:bg-ink/5 hover:text-ink">
              {item}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <a href={profile.github} aria-label="GitHub" className="rounded-full p-2 text-ink/70 transition hover:bg-ink/5 hover:text-ink">
            <Github className="h-4 w-4" />
          </a>
          <MagneticButton href="#contact" className="min-h-10 px-4 py-2" icon={Mail}>
            Start a project
          </MagneticButton>
        </div>
        <button
          type="button"
          aria-label="Open navigation"
          className="fixed right-8 top-8 z-[60] rounded-full border border-ink/10 bg-white/90 p-2 text-ink shadow-soft md:static md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/30 p-4 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              className="rounded-3xl border border-white/70 bg-white p-5 shadow-soft"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-semibold text-ink">{profile.name}</span>
                <button type="button" aria-label="Close navigation" className="rounded-full bg-ink/5 p-2" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-lg font-medium text-ink hover:bg-mist"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ profile, projects }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const previewY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const topProjects = projects.slice(0, 3);

  return (
    <section id="home" ref={heroRef} className="relative isolate overflow-hidden px-4 pt-32 sm:pt-36 lg:min-h-screen lg:pt-40">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(124,58,237,0.10),transparent_26%,rgba(249,115,22,0.10)_58%,rgba(37,99,235,0.10))]" />
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="w-full min-w-0 max-w-[22rem] sm:max-w-5xl">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-[0_12px_30px_rgba(16,185,129,0.12)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {profile.availability}
          </motion.div>
          <motion.h1 variants={fadeUp} className="max-w-full break-words font-display text-4xl font-semibold leading-[1.04] text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
            Premium web experiences that turn attention into business.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-ink/68 sm:text-xl">
            {profile.name} blends development, SEO and AI workflows to build websites that feel polished, load fast and help businesses convert.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row">
            <MagneticButton href="#projects" className="w-full sm:w-auto">
              Explore projects
            </MagneticButton>
            <MagneticButton href={`mailto:${profile.email}`} variant="secondary" icon={Mail} className="w-full sm:w-auto">
              Book a build
            </MagneticButton>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-[22rem] grid-cols-1 gap-3 sm:max-w-xl sm:grid-cols-3">
            {[
              ['Websites', 'Shopify + WP'],
              ['SEO', 'Technical growth'],
              ['AI', 'Workflows'],
            ].map(([title, value]) => (
              <div key={title} className="rounded-2xl border border-white/70 bg-white/60 p-4 shadow-soft backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">{title}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mx-auto min-h-[560px] w-full max-w-[22rem] overflow-hidden sm:min-h-[650px] sm:max-w-full lg:min-h-[720px]">
          <motion.div
            style={{ x: '-50%', y: imageY, rotate }}
            className="absolute left-1/2 top-8 w-[78%] max-w-[430px] overflow-hidden rounded-[2rem] border border-white/80 bg-white/40 p-3 shadow-glow backdrop-blur-xl"
          >
            <img
              src={portraitHero}
              alt={`${profile.name} portrait`}
              width="1080"
              height="1350"
              className="aspect-[4/5] w-full rounded-[1.35rem] object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>

          <motion.div
            style={{ y: previewY }}
            className="absolute bottom-0 left-0 right-0 mx-auto w-[calc(100%-1rem)] max-w-[520px] rounded-[2rem] border border-white/80 bg-white/72 p-4 shadow-soft backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-ink">Project control room</p>
                <p className="text-xs text-ink/50">Live build priorities</p>
              </div>
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">12 builds</span>
            </div>
            <div className="grid gap-3">
              {topProjects.map((project, index) => (
                <motion.a
                  key={project.name}
                  href="#projects"
                  className="group grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-2xl border border-ink/6 bg-mist/70 p-3 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet/15 via-ocean/15 to-ember/20 text-sm font-bold text-ink">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{project.name}</span>
                    <span className="text-xs text-ink/52">{project.industry}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink/40 transition group-hover:text-violet" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {['Shopify', 'React.js', 'SEO', 'AI Automation'].map((skill, index) => (
            <motion.div
              key={skill}
              className={cn(
                'absolute hidden rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-ink shadow-soft backdrop-blur-xl sm:block',
                index === 0 && 'left-0 top-28',
                index === 1 && 'right-0 top-20',
                index === 2 && 'left-4 top-[360px]',
                index === 3 && 'right-2 top-[420px]',
              )}
              animate={{ y: [0, -14, 0], rotate: [0, index % 2 ? 3 : -3, 0] }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const frame = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function TrustSection({ projects, skillGroups, industries }) {
  const stats = [
    { label: 'Experience', value: 1, suffix: '+ yrs' },
    { label: 'Projects shipped', value: projects.length, suffix: '+' },
    { label: 'Technologies', value: new Set(skillGroups.flatMap((group) => group.items)).size, suffix: '+' },
    { label: 'Industries served', value: industries.length, suffix: '+' },
  ];

  return (
    <section className="px-4 py-16 sm:py-24" aria-labelledby="trust-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid overflow-hidden rounded-[2rem] border border-white/80 bg-white/68 shadow-soft backdrop-blur-xl md:grid-cols-4"
        >
          <h2 id="trust-title" className="sr-only">
            Portfolio trust metrics
          </h2>
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="border-b border-ink/8 p-6 md:border-b-0 md:border-r last:md:border-r-0">
              <p className="font-display text-4xl font-semibold text-ink">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-ink/55">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const screenshotModules = import.meta.glob('./assets/project-screenshots/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const getProjectScreenshot = (fileName) => screenshotModules[`./assets/project-screenshots/${fileName}`] || '';

const caseStudyDetails = {
  'Lifestyle by Vivcos': {
    category: 'Commerce',
    platform: 'WordPress + Custom Development',
    overview:
      'Designed and developed a complete lifestyle e-commerce website focused on premium shopping experience, mobile responsiveness and conversion optimization.',
    roleItems: [
      'UI/UX Design',
      'Frontend Development',
      'Backend Integration',
      'Payment Setup',
      'Shipping Configuration',
      'Performance Optimization',
      'Deployment',
    ],
    deliverables: [
      'Custom Design System',
      'Mobile Optimization',
      'Product Catalog Setup',
      'Payment Gateway Integration',
      'Shipping Configuration',
      'Speed Optimization',
      'SEO Ready Structure',
    ],
    proofPoints: ['Premium shopping flow', 'Checkout-ready setup', 'Mobile-first catalog'],
  },
  'Vivansh Vasishta': {
    category: 'Portfolio',
    platform: 'WordPress',
    overview:
      'Built a personal portfolio experience that improves credibility, organizes the professional story and gives visitors a polished path to understand the profile quickly.',
    roleItems: ['WordPress Customization', 'Personal Brand Layout', 'Responsive Design', 'Content Structuring', 'Performance Cleanup'],
    deliverables: ['Brand-led Homepage', 'Portfolio Architecture', 'Mobile Experience', 'Contact Flow', 'Performance Pass'],
    proofPoints: ['Personal brand clarity', 'Fast mobile browsing', 'Credible content flow'],
  },
  Paaie: {
    category: 'Commerce',
    platform: 'Shopify',
    overview:
      'Supported a fashion and jewelry storefront with Shopify maintenance, feature implementation and ongoing performance improvements for a smoother buying experience.',
    roleItems: ['Shopify Development', 'Feature Implementation', 'Store Maintenance', 'Performance Improvements', 'Conversion Support'],
    deliverables: ['Shopify Store Updates', 'Frontend Enhancements', 'Store Optimization', 'Issue Resolution', 'Ongoing Support'],
    proofPoints: ['Retail-ready storefront', 'Ongoing improvements', 'Cleaner product journey'],
  },
  Aadiras: {
    category: 'Commerce',
    platform: 'Shopify',
    overview:
      'Managed storefront improvements for an e-commerce brand with a focus on store maintenance, search visibility and front-end refinements.',
    roleItems: ['Shopify Maintenance', 'SEO Implementation', 'Frontend Enhancements', 'Store QA', 'Content Updates'],
    deliverables: ['SEO Setup', 'Theme Improvements', 'Maintenance Workflow', 'Product Page Cleanup', 'Responsive Checks'],
    proofPoints: ['SEO-ready structure', 'Cleaner store management', 'Better mobile polish'],
  },
  Volvein: {
    category: 'Commerce',
    platform: 'WordPress + Custom Development',
    overview:
      'Created a responsive e-commerce website with stronger brand presentation, usability and mobile browsing quality.',
    roleItems: ['Custom Website Development', 'Responsive UI', 'Brand Presentation', 'Frontend Build', 'Launch Support'],
    deliverables: ['Responsive Pages', 'Brand-led Layouts', 'Catalog Experience', 'Mobile Optimization', 'Deployment Support'],
    proofPoints: ['Brand-first shopping experience', 'Responsive delivery', 'Client-ready launch'],
  },
  Learnlith: {
    category: 'Web App',
    platform: 'React.js + Node.js',
    overview:
      'Recovered and rebuilt critical education-platform functionality so the product could keep operating with improved reliability and maintainability.',
    roleItems: ['Functionality Recovery', 'React Development', 'Node.js Support', 'Bug Fixing', 'Platform Maintenance'],
    deliverables: ['Recovered Features', 'Improved App Flow', 'Frontend Repairs', 'Backend Support', 'Stability Improvements'],
    proofPoints: ['Critical functionality restored', 'Improved reliability', 'Education platform support'],
  },
  Vivcos: {
    category: 'Company Site',
    platform: 'WordPress',
    overview:
      'Designed, developed and maintained a complete company website with a clean structure for brand presence and service discovery.',
    roleItems: ['Website Design', 'WordPress Development', 'Content Structuring', 'Maintenance', 'Responsive QA'],
    deliverables: ['Company Website', 'Service Pages', 'Mobile Layouts', 'CMS Setup', 'Maintenance Support'],
    proofPoints: ['Clear company presence', 'Maintainable CMS', 'Responsive pages'],
  },
  'Deepak Sharma Portfolio': {
    category: 'Portfolio',
    platform: 'HTML + Tailwind CSS + JavaScript',
    overview:
      'Developed a custom-coded portfolio with SEO fundamentals, sitemap generation, robots.txt setup and responsive layouts.',
    roleItems: ['Custom Frontend Development', 'SEO Setup', 'Responsive Build', 'Sitemap Configuration', 'Deployment'],
    deliverables: ['Custom Portfolio', 'SEO Ready Markup', 'Sitemap.xml', 'Robots.txt', 'Responsive Experience'],
    proofPoints: ['Custom coded delivery', 'SEO-ready foundation', 'Responsive portfolio'],
  },
  'RKK Masale': {
    category: 'Business Site',
    platform: 'HTML + Tailwind CSS + JavaScript + Firebase',
    overview:
      'Built a static food-business website with a clean local-business presence, SEO structure and deployment-ready implementation.',
    roleItems: ['Static Website Development', 'SEO Implementation', 'Firebase Setup', 'Responsive Design', 'Deployment'],
    deliverables: ['Business Website', 'Local SEO Structure', 'Responsive Pages', 'Firebase Integration', 'Launch Setup'],
    proofPoints: ['Local search foundation', 'Fast static delivery', 'Business credibility'],
  },
  'Canadian E-Commerce Project': {
    category: 'Commerce',
    platform: 'Shopify',
    overview:
      'Designed and developed a Shopify storefront for an international client with a complete commerce setup and polished buying flow.',
    roleItems: ['Shopify Store Build', 'Theme Customization', 'Product Setup', 'Commerce Configuration', 'Launch QA'],
    deliverables: ['Complete Shopify Store', 'Product Catalog', 'Theme Customization', 'Checkout Configuration', 'International Store Setup'],
    proofPoints: ['International client delivery', 'Complete store setup', 'Launch-ready commerce'],
  },
  'Smart City Traveller': {
    category: 'Web App',
    platform: 'HTML + CSS + JavaScript + PHP + MySQL',
    overview:
      'Built a travel-planning web application with route optimization, maps integration and personalized recommendation flows.',
    roleItems: ['Web App Development', 'PHP Integration', 'MySQL Database Work', 'Maps Integration', 'Route Logic'],
    deliverables: ['Travel Planner', 'Route Optimization', 'Map-Based Flow', 'Recommendation System', 'Database Integration'],
    proofPoints: ['Route-focused utility', 'Dynamic data flow', 'Personalized planning'],
  },
  'Netflix Finest Five': {
    category: 'React App',
    platform: 'React.js',
    overview:
      'Created a responsive React content-curation app that helps users discover top Netflix selections and move directly into watching.',
    roleItems: ['React Development', 'Responsive UI', 'Content Curation Flow', 'Interaction Design', 'Deployment Prep'],
    deliverables: ['React App Interface', 'Curated Content Cards', 'Responsive Layout', 'Watch Redirect Flow', 'Frontend Polish'],
    proofPoints: ['Entertainment discovery flow', 'React UI delivery', 'Responsive app experience'],
  },
};

const projectShowcaseDetails = {
  'Lifestyle by Vivcos': {
    screenshotFile: 'lifestyle-vivcos-home.png',
    visitUrl: 'https://lifestyle.vivcos.com',
    description:
      'Premium lifestyle e-commerce website built for smooth browsing, mobile shopping and conversion-focused product discovery.',
  },
  'Vivansh Vasishta': {
    screenshotFile: 'vivansh-portfolio-home.png',
    description: 'Executive portfolio website shaped around personal branding, authority and high-trust inquiry flow.',
  },
  Paaie: {
    screenshotFile: 'paaie-home.png',
    description: 'Fashion and jewelry Shopify storefront improved for cleaner shopping, merchandising and store performance.',
  },
  Aadiras: {
    screenshotFile: 'aadiras-home.png',
    description: 'Wellness commerce storefront maintained and refined for search visibility, product discovery and mobile buyers.',
  },
  Volvein: {
    screenshotFile: 'volvein-home.png',
    description: 'Premium e-commerce brand experience built around elevated visuals, responsive browsing and launch readiness.',
  },
  Learnlith: {
    screenshotFile: 'learnlith-home.png',
    description: 'Education platform recovery and rebuild focused on reliability, clearer navigation and AI-assisted learning flow.',
  },
  Vivcos: {
    screenshotFile: 'vivcos-home.png',
    description: 'Company website created to present services, brand credibility and a maintainable WordPress presence.',
  },
  'Deepak Sharma Portfolio': {
    screenshotFile: 'deepak-sharma-home.png',
    description: 'Custom professional portfolio with strong positioning, SEO foundations and responsive executive presentation.',
  },
  'RKK Masale': {
    screenshotFile: 'rkk-masale-home.png',
    description: 'Local food business website built for credibility, search readiness and fast static performance.',
  },
  'Canadian E-Commerce Project': {
    screenshotFile: 'canadian-ecommerce-home.png',
    description: 'International Shopify storefront built with complete commerce setup, product catalog and launch-ready checkout.',
  },
  'Smart City Traveller': {
    screenshotFile: 'smart-city-traveller-home.png',
    description: 'Travel planning web app with route optimization, maps integration and personalized recommendation flows.',
  },
  'Netflix Finest Five': {
    screenshotFile: 'netflix-finest-five-home.png',
    description: 'React entertainment discovery app designed for quick browsing, curated choices and direct watch paths.',
  },
};

const getCaseStudy = (project) => {
  const details = caseStudyDetails[project.name] || {};
  const showcase = projectShowcaseDetails[project.name] || {};
  const platform = details.platform || project.tech;
  return {
    ...project,
    ...details,
    ...showcase,
    platform,
    description: showcase.description || details.description || details.overview || project.role,
    overview: details.overview || project.role,
    roleItems: details.roleItems || ['Planning', 'Design Direction', 'Development', 'Optimization', 'Launch Support'],
    deliverables: details.deliverables || ['Responsive Experience', 'Performance Pass', 'SEO Ready Structure', 'Deployment Support'],
    proofPoints: details.proofPoints || ['Business-ready delivery', 'Clean user experience', 'Launch support'],
    stack: details.technologies || project.stack,
    screenshot: showcase.screenshotFile ? getProjectScreenshot(showcase.screenshotFile) : '',
    visitUrl: showcase.visitUrl || project.url || '',
  };
};

function ProjectVisual({ caseStudy, index }) {
  const [from, to] = accentPairs[index % accentPairs.length];

  if (caseStudy.screenshot) {
    return (
      <motion.div className="relative h-full min-h-[360px] overflow-hidden rounded-[1.75rem] bg-white sm:min-h-[460px]" whileHover="hover">
        <motion.img
          src={caseStudy.screenshot}
          alt={`${caseStudy.name} project screenshot`}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          variants={{ hover: { scale: 1.045 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative h-full min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:min-h-[460px] sm:p-7"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${from}16, #fffaf3 44%, ${to}18)` }} />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl" style={{ background: `${from}22` }} />
      <div className="absolute -bottom-28 left-8 h-72 w-72 rounded-full blur-3xl" style={{ background: `${to}20` }} />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-ink/8 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
              Case study
            </span>
            <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white">{caseStudy.status}</span>
          </div>
          <p className="max-w-xs font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{caseStudy.name}</p>
          <div className="mt-6 grid max-w-md gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/80 bg-white/62 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">Industry</p>
              <p className="mt-2 font-semibold text-ink">{caseStudy.industry}</p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/62 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">Platform</p>
              <p className="mt-2 font-semibold text-ink">{caseStudy.platform}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {caseStudy.proofPoints.map((point) => (
            <div key={point} className="rounded-2xl border border-white/80 bg-white/70 p-4 backdrop-blur-xl">
              <Check className="mb-3 h-4 w-4 text-violet" aria-hidden="true" />
              <p className="text-sm font-semibold leading-5 text-ink">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectScreenshot({ project, index }) {
  const [from, to] = accentPairs[index % accentPairs.length];

  if (project.screenshot) {
    return (
      <motion.img
        src={project.screenshot}
        alt={`${project.name} homepage screenshot`}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        variants={{ hover: { scale: 1.06 } }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${from}55, #fff8ee 45%, ${to}4d)` }} />
      <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute -right-20 bottom-8 h-96 w-96 rounded-full blur-3xl" style={{ background: `${to}32` }} />
      <div className="absolute inset-6 rounded-[1.6rem] border border-white/50 bg-white/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-sm" />
      <div className="absolute inset-0 grid place-items-center p-8 text-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/42">Homepage visual</p>
          <p className="mx-auto mt-5 max-w-sm font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{project.name}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onViewCaseStudy }) {
  return (
    <motion.article
      data-carousel-card="true"
      className="group relative h-[520px] w-[82vw] shrink-0 snap-center overflow-hidden rounded-[2rem] border border-white/75 bg-white shadow-[0_30px_90px_rgba(23,21,31,0.16)] sm:h-[600px] sm:w-[70vw] lg:h-[660px] lg:w-[46rem] xl:w-[50rem]"
      initial={{ opacity: 0, y: 42, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover="hover"
      transition={{ duration: 0.65, delay: Math.min(index * 0.04, 0.18), ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectScreenshot project={project} index={index} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(23,21,31,0.2)_34%,rgba(23,21,31,0.88)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/20 opacity-80" />
      <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white sm:p-7 lg:p-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/18 bg-white/18 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/86 backdrop-blur-xl">
            {project.industry}
          </span>
          <span className="rounded-full border border-white/18 bg-white/18 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/86 backdrop-blur-xl">
            {project.platform}
          </span>
        </div>
        <h3 className="max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-5xl">{project.name}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/74 sm:text-base">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            type="button"
            onClick={onViewCaseStudy}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition hover:bg-mist focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </motion.button>
          {project.visitUrl ? (
            <motion.a
              href={project.visitUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/22 bg-white/12 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <span>Visit Website</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/16 bg-white/8 px-5 py-3 text-sm font-semibold text-white/46 backdrop-blur-xl"
            >
              <span>Visit Website</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/42 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white/92 p-5 shadow-[0_40px_120px_rgba(23,21,31,0.26)] backdrop-blur-2xl sm:p-7 lg:p-9"
      >
        <div className="mb-8 flex items-start justify-between gap-5">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-violet/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-violet">
                {project.industry}
              </span>
              <span className="rounded-full bg-ocean/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ocean">
                {project.platform}
              </span>
            </div>
            <h3 id="case-study-title" className="font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">
              {project.name}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-ink/66">{project.overview}</p>
          </div>
          <button
            type="button"
            aria-label="Close case study"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/8 bg-white text-ink shadow-[0_12px_34px_rgba(23,21,31,0.10)] transition hover:bg-mist"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="overflow-hidden rounded-[1.5rem] border border-ink/8 bg-mist">
            <div className="relative aspect-[16/10] overflow-hidden">
              <ProjectScreenshot project={project} index={0} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/52 via-transparent to-transparent" />
            </div>
          </div>
          <div className="grid gap-5">
            <div className="rounded-[1.5rem] border border-ink/8 bg-white/72 p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ink/40">My role</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {project.roleItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm leading-6 text-ink/68">
                    <Check className="mt-1 h-4 w-4 flex-none text-violet" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-ink/8 bg-white/72 p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Key deliverables</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {project.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm leading-6 text-ink/68">
                    <Check className="mt-1 h-4 w-4 flex-none text-ember" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-ink/8 bg-white/72 p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ink/40">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-ink/8 bg-mist px-3 py-1.5 text-xs font-semibold text-ink/62">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ProjectsSection({ projects }) {
  const carouselRef = useRef(null);
  const dragState = useRef({ pressed: false, startX: 0, scrollLeft: 0 });
  const scrollFrame = useRef(null);
  const caseStudies = useMemo(() => projects.map(getCaseStudy), [projects]);
  const filters = useMemo(() => {
    const categories = Array.from(new Set(caseStudies.map((project) => project.category || project.industry)));
    return ['All Work', ...categories];
  }, [caseStudies]);
  const [active, setActive] = useState('All Work');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const visibleProjects =
    active === 'All Work' ? caseStudies : caseStudies.filter((project) => (project.category || project.industry) === active);

  const updateActiveIndex = () => {
    const node = carouselRef.current;
    if (!node) return;
    const cards = Array.from(node.querySelectorAll('[data-carousel-card="true"]'));
    const center = node.scrollLeft + node.clientWidth / 2;
    const nextIndex = cards.reduce(
      (closest, card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;
    setActiveIndex(nextIndex);
  };

  const handleScroll = () => {
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(updateActiveIndex);
  };

  const scrollToIndex = (index) => {
    const node = carouselRef.current;
    if (!node) return;
    const cards = Array.from(node.querySelectorAll('[data-carousel-card="true"]'));
    const nextIndex = Math.min(Math.max(index, 0), cards.length - 1);
    cards[nextIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActiveIndex(nextIndex);
  };

  const startDrag = (event) => {
    if (event.pointerType === 'touch' || event.button !== 0 || event.target.closest('a, button')) return;
    const node = carouselRef.current;
    if (!node) return;
    dragState.current = { pressed: true, startX: event.clientX, scrollLeft: node.scrollLeft };
    setIsDragging(true);
    node.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    const node = carouselRef.current;
    const state = dragState.current;
    if (!node || !state.pressed) return;
    event.preventDefault();
    node.scrollLeft = state.scrollLeft - (event.clientX - state.startX) * 1.08;
  };

  const stopDrag = (event) => {
    const node = carouselRef.current;
    if (node && dragState.current.pressed) node.releasePointerCapture?.(event.pointerId);
    dragState.current.pressed = false;
    setIsDragging(false);
    updateActiveIndex();
  };

  useEffect(() => {
    setActiveIndex(0);
    requestAnimationFrame(() => {
      const firstCard = carouselRef.current?.querySelector('[data-carousel-card="true"]');
      firstCard?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  }, [active, visibleProjects.length]);

  useEffect(
    () => () => {
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    },
    [],
  );

  return (
    <section id="projects" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects / Case Studies"
          title="Visual proof, built for real businesses."
          copy="A swipeable row of homepage-led projects with the deeper scope kept behind focused case studies."
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-8 rounded-[1.5rem] border border-white/80 bg-white/60 p-2 shadow-soft backdrop-blur-xl"
          aria-label="Project filters"
        >
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {filters.map((filter) => {
              const count =
                filter === 'All Work' ? caseStudies.length : caseStudies.filter((project) => (project.category || project.industry) === filter).length;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  className={cn(
                    'group flex min-h-12 shrink-0 items-center gap-3 rounded-[1.15rem] px-4 text-sm font-semibold transition',
                    active === filter
                      ? 'bg-ink text-white shadow-[0_18px_40px_rgba(23,21,31,0.18)]'
                      : 'bg-white/60 text-ink/62 hover:bg-white hover:text-ink',
                  )}
                >
                  <span>{filter}</span>
                  <span className={cn('rounded-full px-2 py-0.5 text-xs', active === filter ? 'bg-white/14 text-white/75' : 'bg-ink/5 text-ink/40')}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/38">Selected work</p>
            <p className="mt-1 text-sm text-ink/56">
              {String(activeIndex + 1).padStart(2, '0')} / {String(visibleProjects.length).padStart(2, '0')}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/8 bg-white/72 text-ink shadow-[0_12px_34px_rgba(23,21,31,0.08)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex >= visibleProjects.length - 1}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/8 bg-ink text-white shadow-[0_16px_40px_rgba(23,21,31,0.16)] transition hover:bg-violet disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-mist to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-mist to-transparent sm:w-24" />
        <motion.div
          ref={carouselRef}
          className={cn(
            'no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-80rem)/2))] pb-8 pt-2 sm:gap-6 lg:gap-8',
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab',
          )}
          onScroll={handleScroll}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onPointerLeave={stopDrag}
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} onViewCaseStudy={() => setSelectedProject(project)} />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-2 flex max-w-7xl items-center gap-4 px-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet via-ocean to-ember"
            animate={{ width: `${((activeIndex + 1) / Math.max(visibleProjects.length, 1)) * 100}%` }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex shrink-0 gap-2">
          {visibleProjects.map((project, index) => (
            <button
              key={project.name}
              type="button"
              aria-label={`Go to ${project.name}`}
              onClick={() => scrollToIndex(index)}
              className={cn('h-2.5 rounded-full transition-all', activeIndex === index ? 'w-8 bg-ink' : 'w-2.5 bg-ink/18 hover:bg-ink/36')}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}

const serviceIcons = {
  Development: Code2,
  SEO: Search,
  Design: Palette,
  'AI Services': Bot,
  Maintenance: ServerCog,
};

function ServicesSection({ services }) {
  return (
    <section id="services" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="A compact digital studio, carried by one builder."
          copy="From storefronts to AI workflows, each service is shaped around launch speed, polish and measurable trust signals."
        />
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.title] || Sparkles;
            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -10, rotate: index % 2 ? 1 : -1 }}
                className="rounded-[1.75rem] border border-white/80 bg-white/68 p-6 shadow-soft backdrop-blur-xl"
              >
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet/12 via-ocean/12 to-ember/18 text-ink">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3>
                <div className="mt-5 grid gap-3">
                  {service.items.slice(0, 5).map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm leading-6 text-ink/62">
                      <Check className="mt-1 h-4 w-4 flex-none text-violet" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection({ skillGroups }) {
  const [active, setActive] = useState(skillGroups[0]?.category || '');
  const activeGroup = skillGroups.find((group) => group.category === active) || skillGroups[0];

  return (
    <section id="skills" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Interactive stack map for launches, growth and AI."
          copy="The stack is intentionally broad: Prakhar can design the front door, wire the systems behind it and make the site discoverable."
        />
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-soft backdrop-blur-xl">
            <div className="grid gap-2">
              {skillGroups.map((group) => (
                <button
                  key={group.category}
                  type="button"
                  onClick={() => setActive(group.category)}
                  className={cn(
                    'flex items-center justify-between rounded-2xl px-4 py-4 text-left transition',
                    active === group.category ? 'bg-ink text-white' : 'bg-mist/70 text-ink hover:bg-white',
                  )}
                >
                  <span className="font-semibold">{group.category}</span>
                  <span className={cn('text-xs font-semibold', active === group.category ? 'text-white/60' : 'text-ink/40')}>{group.items.length} tools</span>
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div layout className="rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-soft backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-ink">{activeGroup.category}</h3>
                  <Layers3 className="h-6 w-6 text-violet" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeGroup.items.map((skill, index) => {
                    const level = 68 + ((index * 7) % 27);
                    return (
                      <div key={skill} className="rounded-2xl border border-ink/8 bg-white/72 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="font-semibold text-ink">{skill}</span>
                          <span className="text-xs font-bold text-ink/40">{level}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-ink/8">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-violet via-ocean to-ember"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.03 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ profile, summary, education, experience }) {
  return (
    <section id="about" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/60 p-3 shadow-glow backdrop-blur-xl">
              <img
                src={portraitStory}
                alt={`${profile.name} seated portrait`}
                width="720"
                height="1280"
                className="aspect-[4/5] w-full rounded-[1.65rem] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/80 bg-white/82 p-5 shadow-soft backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/45">Positioning</p>
              <p className="mt-2 font-display text-2xl font-semibold text-ink">{profile.headline.replaceAll('|', '-')}</p>
            </div>
          </motion.div>
          <div>
            <SectionHeading eyebrow="About" title="A practical builder with a premium eye." copy={summary} align="left" />
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mt-10 grid gap-4">
              {experience.map((item) => (
                <motion.article key={item.role} variants={fadeUp} className="rounded-[1.5rem] border border-white/80 bg-white/68 p-6 shadow-soft backdrop-blur-xl">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-ink">{item.role}</h3>
                      <p className="text-sm font-medium text-ink/50">{item.location}</p>
                    </div>
                    <span className="rounded-full bg-ocean/10 px-3 py-1 text-xs font-bold text-ocean">{item.period}</span>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {item.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-3 text-sm leading-6 text-ink/65">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-violet" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
              {education.map((item) => (
                <motion.article key={item.school} variants={fadeUp} className="rounded-[1.5rem] border border-white/80 bg-white/68 p-6 shadow-soft backdrop-blur-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet">Education</p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">{item.school}</h3>
                  <p className="mt-2 text-ink/62">{item.degree}</p>
                  <p className="mt-3 text-sm font-bold text-ink/45">{item.year}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AiToolkitSection({ skillGroups }) {
  const ai = skillGroups.find((group) => group.category === 'AI Toolkit')?.items || [];
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-ink p-6 text-white shadow-soft sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/50">AI toolkit</p>
            <h2 className="font-display text-3xl font-semibold sm:text-5xl">AI is treated like a production tool, not a party trick.</h2>
            <p className="mt-5 leading-8 text-white/68">
              Prakhar uses modern AI tools to accelerate research, content, automation, creative direction and assisted development while keeping the final experience human, branded and useful.
            </p>
          </motion.div>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ai.map((tool, index) => (
              <motion.div
                key={tool}
                variants={fadeUp}
                whileHover={{ y: -7, scale: 1.02 }}
                className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl"
              >
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-white text-ink">
                  {index % 3 === 0 ? <Bot className="h-5 w-5" /> : index % 3 === 1 ? <Zap className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </div>
                <p className="font-semibold">{tool}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline({ projects, experience }) {
  const milestones = [
    { label: '2024', title: 'Computer Science foundation', copy: 'Completed B.Tech in Computer Science Engineering.' },
    { label: '2025', title: 'Freelance delivery started', copy: 'Began shipping paid client work across Shopify, WordPress, custom sites and SEO.' },
    { label: 'Now', title: `${projects.length}+ project portfolio`, copy: experience[0]?.highlights?.at(-1) || 'Focused on premium digital experiences.' },
  ];

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Timeline" title="Small timeline, strong signal." copy="A focused path from engineering fundamentals to client-ready web, SEO and AI delivery." />
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-ink/10 sm:left-1/2" />
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-6">
            {milestones.map((item, index) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className={cn('relative grid gap-4 pl-12 sm:grid-cols-2 sm:pl-0', index % 2 ? 'sm:[&>div]:col-start-2' : '')}
              >
                <span className="absolute left-[9px] top-7 h-3 w-3 rounded-full border-4 border-mist bg-violet sm:left-1/2 sm:-ml-1.5" />
                <div className="rounded-[1.5rem] border border-white/80 bg-white/70 p-6 shadow-soft backdrop-blur-xl">
                  <p className="text-sm font-bold text-violet">{item.label}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 leading-7 text-ink/62">{item.copy}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name || 'Portfolio visitor'}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 rounded-[2.5rem] border border-white/80 bg-white/72 p-5 shadow-glow backdrop-blur-2xl lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
          <div className="rounded-[2rem] bg-ink p-6 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Contact</p>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Ready to make your business feel premium online?</h2>
            <p className="mt-5 leading-8 text-white/68">
              Send the brief, goal or rough idea. Prakhar can help shape it into a clear website, SEO or AI implementation plan.
            </p>
            <div className="mt-8 grid gap-3">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-2xl bg-white/8 p-4 text-white transition hover:bg-white/12">
                <Mail className="h-5 w-5 text-white/60" />
                <span>{profile.email}</span>
              </a>
              <a href={`tel:+91${profile.phone}`} className="flex items-center gap-3 rounded-2xl bg-white/8 p-4 text-white transition hover:bg-white/12">
                <Phone className="h-5 w-5 text-white/60" />
                <span>+91 {profile.phone}</span>
              </a>
              <a href={profile.linkedin} className="flex items-center gap-3 rounded-2xl bg-white/8 p-4 text-white transition hover:bg-white/12">
                <Linkedin className="h-5 w-5 text-white/60" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <form onSubmit={submit} className="grid gap-4 p-1 sm:p-4">
            <label className="grid gap-2 text-sm font-semibold text-ink">
              Name
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="min-h-14 rounded-2xl border border-ink/10 bg-white px-4 text-base font-medium outline-none transition focus:border-violet focus:ring-4 focus:ring-violet/10"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink">
              Email
              <input
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="min-h-14 rounded-2xl border border-ink/10 bg-white px-4 text-base font-medium outline-none transition focus:border-violet focus:ring-4 focus:ring-violet/10"
                placeholder="you@company.com"
                type="email"
                autoComplete="email"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink">
              Project brief
              <textarea
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                className="min-h-36 resize-y rounded-2xl border border-ink/10 bg-white px-4 py-4 text-base font-medium outline-none transition focus:border-violet focus:ring-4 focus:ring-violet/10"
                placeholder="What do you want to build, improve or automate?"
              />
            </label>
            <MagneticButton className="w-full" icon={MousePointer2} type="submit">
              Send project inquiry
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ profile }) {
  return (
    <footer className="px-4 pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-ink/8 bg-white/60 p-6 text-sm text-ink/58 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-ink">{profile.name}</p>
          <p className="mt-1">{profile.headline.replaceAll('|', '-')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-violet">
              {item}
            </a>
          ))}
          <a href={profile.github} className="transition hover:text-violet" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const { profile, projects, services, skillGroups, industries, summary, education, experience } = portfolio;
  useMeta(profile);

  return (
    <div className="relative min-h-screen overflow-hidden bg-mist text-ink">
      <ScrollProgress />
      <MouseGlow />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-0 opacity-[0.055]" />
      <Header profile={profile} />
      <main className="relative z-10">
        <Hero profile={profile} projects={projects} />
        <TrustSection projects={projects} skillGroups={skillGroups} industries={industries} />
        <ProjectsSection projects={projects} />
        <ServicesSection services={services} />
        <SkillsSection skillGroups={skillGroups} />
        <AboutSection profile={profile} summary={summary} education={education} experience={experience} />
        <AiToolkitSection skillGroups={skillGroups} />
        <ExperienceTimeline projects={projects} experience={experience} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}

export default App;
