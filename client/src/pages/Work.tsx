import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import type { Project } from '../components/ProjectCard';
import { useTheme } from '../context/ThemeContext';

const projects: Project[] = [
  {
    title: 'CyberSuite',
    description: 'A cybersecurity platform that provides services to keep deployed projects safe by scanning and fixing vulnerabilities.',
    longDescription: 'CyberSuite is a comprehensive cybersecurity platform designed for developers and DevOps teams. It automates vulnerability scanning across deployed applications, provides real-time threat detection, and offers one-click fixes for common security issues. Built with a microservice architecture to handle scalable, parallel security audits across multiple projects.',
    image: '/cybersuite.png',
    tags: ['Turborepo', 'Next.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker', 'Redis', 'Microservices'],
    github: 'https://github.com/ikeshav26/cybersuite',
  },
  {
    title: 'Keep-Awake',
    description: 'An npm package to keep free-tier servers awake via cron-based pinging.',
    longDescription: 'Keep-Awake is a professional TypeScript-based npm package that keeps free-tier servers awake by pinging them at scheduled intervals using cron jobs. It features robust core logic, typed configurations, and easy integration into any Node.js application, preventing spin-down delays on serverless or free hosting platforms.',
    image: '/keep-awake.png',
    tags: ['TypeScript', 'Node.js', 'NPM', 'Cron', 'Open Source'],
    github: 'https://github.com/ikeshav26/keep-awake',
    link: 'https://www.npmjs.com/package/@ikeshav26/keep-awake'
  },
  {
    title: 'Echovia',
    description: 'A full-featured music streaming platform with genre browsing, playlist management, and a sleek now-playing experience.',
    longDescription: 'Echovia is a modern music player web application that lets users discover and stream music across multiple genres. Features include genre-based browsing, custom playlist creation, real-time now-playing controls, and a premium Spotify-inspired dark UI. Built with a focus on seamless audio playback and responsive design.',
    image: '/echovia.png',
    tags: ['Express.js', 'Vite', 'Tailwind CSS', 'Node.js', 'REST API'],
    github: 'https://github.com/ikeshav26/echovia-music-player',
    link: 'https://echovia-music-player.vercel.app/'
  },
  { 
    title: 'Developer Portfolio',
    description: 'A premium, interactive developer portfolio featuring smooth scrolling, dynamic animations, and optimal performance.',
    longDescription: 'The portfolio you\'re currently viewing — a handcrafted, performance-first developer portfolio built with modern React patterns. Features include Locomotive Scroll for silky-smooth scrolling, Framer Motion for premium micro-animations, a syntax-inspired navigation bar, scroll velocity text effects, and a fully responsive glassmorphic design.',
    image: '/portfolio.png',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/ikeshav26/me',
    link: 'https://ikeshav.me'
  },
  {
    title: 'Fit-AI',
    description: 'A web application that predicts diseases from symptoms using machine learning, providing a user-friendly diagnostic interface.',
    longDescription: 'Fit-AI uses trained machine learning models to predict potential diseases based on user-input symptoms. Users can select or type their symptoms into an intuitive interface, and the model returns ranked predictions with confidence scores. Built with Streamlit for rapid prototyping and Flask for the API backend, it demonstrates practical ML deployment for healthcare.',
    image: '/fit-ai.jpg',
    tags: ['Python', 'Streamlit', 'Flask', 'Machine Learning', 'Scikit-learn'],
    github: 'https://github.com/MannuVilasara/disease-detector',
  },
  {
    title: 'CI-Tool',
    description: 'An auto AI reviewer that automatically reviews pull requests using Gemini AI, integrated seamlessly with GitHub Actions.',
    longDescription: 'CI-Tool is a developer productivity tool that hooks into your GitHub workflow via Actions. When a pull request is opened, it automatically sends the diff to the Gemini AI API for an intelligent code review. It flags potential bugs, security vulnerabilities, and code quality issues — providing critical, warning, and info-level feedback directly on the PR.',
    image: '/ci-tool.png',
    tags: ['Node.js', 'GitHub Actions', 'Gemini AI', 'JavaScript', 'CI/CD'],
    github: 'https://github.com/ikeshav26/auto_pr_reviewer',
  },
  {
    title: 'ZettaNote',
    description: 'An open-source Notion alternative — a rich, collaborative note-taking platform with real-time sync and sharing.',
    longDescription: 'ZettaNote is an open-source, self-hostable note-taking application inspired by Notion. It features a rich text editor with full formatting toolbar, real-time sync with server-side persistence, page sharing, live preview mode, and a clean dark-themed UI. Designed for developers and teams who want a powerful, private note-taking solution.',
    image: '/zettanote.png',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'Open Source'],
    github: 'https://github.com/braydenidzenga/ZettaNote',
  },
  
];

const Work = () => {
  const { theme } = useTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-18 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className={`text-5xl md:text-7xl font-bold font-['Oswald'] ${theme === 'dark' ? 'text-white' : 'text-black'} mb-6 tracking-tight`}>
          SELECTED <span className="text-orange-300">WORKS</span>
        </h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-['JetBrains_Mono'] max-w-2xl mx-auto text-lg leading-relaxed`}>
          Showcasing a collection of projects where design meets functionality. Focused on creating performant, interactive, and premium user experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...project}
            delay={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;