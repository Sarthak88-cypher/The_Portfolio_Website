import type { PortfolioConfig } from '@/types';

// ═══════════════════════════════════════
// PORTFOLIO CONFIGURATION
// ═══════════════════════════════════════
// Edit this file to change ALL content.
// No need to touch any component code.

const config: PortfolioConfig = {

  // ── META ──
  meta: {
    name: 'Sai Sarthak Mohapatra',
    title: 'Sai Sarthak Mohapatra — Full Stack Developer',
    description: 'Full Stack Developer specializing in distributed systems, cloud-native SaaS platforms, and scalable frontend architecture.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://saisarthakmohapatra.dev',
    ogImage: '/og-image.png',
    jobTitle: 'Full Stack Developer',
  },

  // ── 3D CHARACTER ──
  character: {
    type: 'image',
    src: '/assets/images/character.png',
    width: 5,
    height: 3,
  },

  // ── NAV ──
  nav: {
    logo: 'Sarthak.',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
      { label: 'Experience', href: '#experience' },
      { label: 'More', href: '#extras' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  // ── HERO ──
  hero: {
    overline: 'Full Stack Developer · AWS Certified · 3★ CodeChef',
    headline: 'Sai Sarthak Mohapatra.',
    subhead: 'Building scalable distributed systems, cloud-native SaaS platforms, and pixel-perfect experiences that feel effortless.',
    ctas: [
      { label: 'See my work', href: '#projects' },
      { label: 'Get in touch', href: '#contact' },
    ],
  },

  // ── ABOUT ──
  about: {
    text: "I'm a Full Stack Developer with 4+ years of experience building scalable distributed systems and cloud-native SaaS platforms at SysCloud. I specialize in React, TypeScript, Node.js, GraphQL, PostgreSQL and AWS — from crafting pixel-perfect interfaces for enterprise backup applications to engineering high-throughput orchestration engines serving 10K+ global users. I've implemented secure authentication workflows with OAuth 2.0 and PKCE, built GenAI-assisted operational diagnostics using Claude APIs, designed JSON-driven UI architectures that ship without redeployment, and directed multi-region deployments across US and Tokyo infrastructure. I'm AWS Certified and a 3-star rated competitive programmer on CodeChef. I don't just write code — I architect systems that scale invisibly and deliver experiences people genuinely enjoy using.",
  },

  // ── SKILLS ──
  skills: {
    label: 'Expertise',
    headline: 'Technologies I work with.',
    description: 'Carefully chosen tools and frameworks that let me move fast without compromising quality.',
    items: [
      // Languages
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'js' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'Python', icon: 'python' },
      { name: 'Bash', icon: 'bash' },
      { name: 'PowerShell', icon: 'powershell' },
      { name: 'GraphQL', icon: 'graphql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'CSS3', icon: 'css3' },

      // Frontend
      { name: 'Next.js', icon: 'nextjs2' },
      { name: 'React', icon: 'react' },
      { name: 'React Native', icon: 'reactnative' },
      { name: 'React Router', icon: 'reactrouter' },
      { name: 'React Query', icon: 'reactquery' },
      { name: 'Redux', icon: 'redux' },
      { name: 'MUI', icon: 'materialui' },
      { name: 'Semantic UI', icon: 'semanticui' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Vite', icon: 'vitejs' },
      { name: 'Esbuild', icon: 'esbuild' },
      { name: 'Expo', icon: 'expo' },
      { name: 'Zustand', icon: 'zustand' },

      // Backend
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express.js', icon: 'expressjs' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Prisma', icon: 'prisma' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'Zod', icon: 'zod' },

      // Databases
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Mongoose', icon: 'mongoose' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Neon', icon: 'neon' },

      // AWS
      { name: 'AWS', icon: 'aws' },
      { name: 'AWS Lambda', icon: 'amznwebserv' },
      { name: 'EC2', icon: 'ec2' },

      // Cloud & DevOps
      { name: 'Azure', icon: 'azure' },
      { name: 'Azure AI', icon: 'azureai' },
      { name: 'Google Cloud', icon: 'gcloud' },
      { name: 'Render', icon: 'render' },

      // AI & GenAI
      { name: 'Anthropic', icon: 'anthropic' },
      { name: 'Claude', icon: 'claude' },
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Gemini', icon: 'gemini' },
      { name: 'GitHub Copilot', icon: 'copilotgithub' },
      { name: 'Hugging Face', icon: 'huggingface' },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'Ollama', icon: 'ollama' },

      // Auth & Security
      { name: 'OAuth 2.0', icon: 'oauth' },
      { name: 'Passport.js', icon: 'passport' },

      // APIs & Services
      { name: 'Resend', icon: 'resend' },
      { name: 'Twilio', icon: 'twilio' },

      // Testing
      { name: 'Playwright', icon: 'playwright' },
      { name: 'Cypress', icon: 'cypress' },
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Jest', icon: 'jest' },

      // DevOps & Tooling
      { name: 'Docker', icon: 'docker' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'ESLint', icon: 'eslint' },
      { name: 'Prettier', icon: 'prettier' },
      { name: 'NPM', icon: 'npm' },
      { name: 'SonarQube', icon: 'sonarqube' },
      { name: 'Prometheus', icon: 'prometheus' },
      { name: 'Puppeteer', icon: 'puppeteer' },
      { name: 'PNPM', icon: 'pnpm' },

      // Design & Ops
      { name: 'Figma', icon: 'figma' },
      { name: 'Canva', icon: 'canva' },
      { name: 'Grafana', icon: 'grafana' },
      { name: 'Jira', icon: 'jira' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Swagger', icon: 'swagger' },
    ],
  },

  // ── PROJECTS ──
  projects: {
    label: 'Selected Work',
    headline: "Things I've built.",
    description: 'Each project represents a unique challenge — from AI-powered platforms to distributed orchestration engines.',
    items: [
      {
        title: 'MeetArc — AI Meeting Intelligence Platform',
        description: 'Full-stack AI-powered meeting intelligence platform built across three microservices. Next.js 16 frontend with React 19 Compiler, MUI v7, TanStack Query v5, and NextAuth/Supabase auth. Offline-first IndexedDB upload queue with exponential backoff and cross-session recovery. Express.js backend with Prisma/Neon PostgreSQL, BullMQ/Redis job processing, and dual AI integrations (Claude + OpenAI). Autonomous meeting bot using rebrowser-playwright for stealth Google Meet recording with state-machine lifecycle, three-layer participant detection, grace period auto-leave, and two-phase Supabase Storage upload with crash recovery. Multi-cloud storage (AWS S3, Azure Blob, Supabase), Prometheus metrics, and fully containerized with Docker Compose.',
        tags: ['Next.js', 'React 19', 'Express.js', 'Prisma', 'PostgreSQL', 'Playwright', 'Claude API', 'OpenAI', 'BullMQ', 'Docker'],
        featured: true,
      },
      {
        title: 'Backup Jobs 3.0',
        description: 'Distributed job-orchestration engine built with Node.js, GraphQL, PostgreSQL and AWS. Improved platform reliability by 40% and enabled AI-assisted failure diagnostics using Claude-based LLM pipelines for 10K+ enterprise users.',
        tags: ['Node.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Claude API'],
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: '⚡',
      },
      {
        title: 'Product Design Framework',
        description: 'Scalable React component-driven architecture that reduced frontend code changes by 70%. Includes JSON-driven UI enabling runtime interface configuration without redeployment, improving iteration velocity by 40%.',
        tags: ['React', 'TypeScript', 'Material UI', 'Design Systems'],
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        icon: '🎨',
      },
      {
        title: 'Enterprise Security & Compliance Suite',
        description: 'Modular backend architecture supporting Ransomware Detection, Compliance Monitoring, eDiscovery, Archival and Data Insights. Secure OAuth 2.0 with PKCE and AWS Lambda authorizers.',
        tags: ['Node.js', 'AWS Lambda', 'OAuth 2.0', 'PostgreSQL'],
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        icon: '🛡️',
      },
      {
        title: 'ScreenAppBot — MeetArc',
        description: 'Universal meeting bot to record Google Meet, Zoom, and Microsoft Teams with a single API. Production-ready, free to use, extend, and scale.',
        tags: ['TypeScript', 'Node.js', 'Playwright', 'WebRTC'],
        link: 'https://github.com/Sarthak88-cypher/ScreenAppBot-MeetArc',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        icon: '📹',
      },
      {
        title: 'Food Coup Mania',
        description: 'Full-stack React app with GraphQL (Apollo Client/Server), Hasura, and PostgreSQL. Features cuisine-based filtering, user auth, and restaurant offer discovery deployed on Heroku.',
        tags: ['React', 'GraphQL', 'Apollo', 'Hasura', 'PostgreSQL', 'Heroku'],
        link: 'https://github.com/Sarthak88-cypher/Food-Coup-Mania',
        gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        icon: '🍔',
      },
      {
        title: 'FoodInesta Restaurant App',
        description: 'React restaurant application with unit testing via Jest, API integrations with Axios, and responsive UI with dynamic menu rendering.',
        tags: ['React', 'JavaScript', 'Jest', 'Axios', 'CSS'],
        link: 'https://github.com/Sarthak88-cypher/FoodInesta_Restaurant_React_App',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        icon: '🍕',
      },
      {
        title: 'Plane Shooter 2D Game',
        description: 'Android 2D animated game built in Java. Shoot missiles at planes using a tank, track scores, health bar and best scores. Uses Bitmap Factory, Canvas OnDraw, and OOP concepts.',
        tags: ['Java', 'Android Studio', 'Canvas', 'OOP'],
        link: 'https://github.com/Sarthak88-cypher/Plane_Shooter_2D_Game',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        icon: '✈️',
      },
      {
        title: 'Quiz Game — Python',
        description: 'Automated quiz platform with difficulty levels (Easy, Medium, Tough), user registration, instant scoring, and a fully automated evaluation system.',
        tags: ['Python', 'Tkinter', 'OOP'],
        link: 'https://github.com/Sarthak88-cypher/Quiz_Game__Python',
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        icon: '❓',
      },
      {
        title: 'LeetCode & CodeChef Practice',
        description: 'Comprehensive competitive programming solutions from beginner to hard — a journey from scratch to 3★ CodeChef with well-documented approaches.',
        tags: ['Java', 'JavaScript', 'DSA', 'Algorithms'],
        link: 'https://github.com/Sarthak88-cypher/CodeChef_Beginner_to_Hard_PRACTICE',
        gradient: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
        icon: '🧩',
      },
    ],
  },

  // ── EXPERIENCE ──
  experience: {
    label: 'Experience',
    headline: "Where I've worked.",
    description: 'Building scalable platforms and leading cross-functional delivery at enterprise scale.',
    items: [
      {
        role: 'Senior Software Engineer',
        company: 'Syscloud Technologies',
        period: 'May 2025 – Present',
        location: 'Hyderabad, India',
        description: 'Leading architecture and development of distributed orchestration systems, AI-powered diagnostics, and multi-region enterprise SaaS infrastructure.',
        highlights: [
          'Architected Backup Jobs 3.0 — a distributed job-orchestration engine built with Node.js, GraphQL, PostgreSQL and AWS, improving platform scalability and reliability by 40%',
          'Designed modular backend architecture supporting 5 enterprise capabilities: Ransomware Detection, Compliance Monitoring, eDiscovery, Archival, and Data Insights — serving 10K+ global users',
          'Enhanced PostGraphile server internals and resolver pipelines for fine-grained orchestration control, optimizing execution flow by 25%',
          'Built GenAI-assisted operational diagnostics using Claude LLM APIs — enabling automated failure analysis, contextual debugging insights, and intelligent remediation suggestions',
          'Integrated LLM-powered sub-agents for contextual insights, anomaly summarization, and MCP orchestration workflows',
          'Directed cross-region deployments across US & Tokyo data centers with automated multi-language workflows and GenAI-assisted validation pipelines, reducing deployment overhead by 35%',
          'Drove end-to-end feature delivery as cross-functional lead — shaping architecture, AI integration strategy, and engineering best practices across teams',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'Syscloud Technologies',
        period: 'Sep 2021 – Apr 2025',
        location: 'Hyderabad, India',
        description: 'Built scalable frontend architecture, secure authentication systems, and high-throughput GraphQL APIs for enterprise SaaS backup products.',
        highlights: [
          'Engineered a scalable Product Design Framework for React-based applications — component-driven architecture that reduced frontend code changes by 70% and scaled apps by 50%',
          'Developed JSON-driven UI architecture allowing runtime interface configuration without redeployment, improving product iteration velocity by 40%',
          'Implemented secure authentication workflows using OAuth 2.0 with PKCE and custom AWS Lambda authorizers, reducing authentication-related issues by 30%',
          'Designed and optimized GraphQL APIs backed by PostgreSQL — enabling high-throughput backend services and efficient query performance across large-scale data workflows',
          'Integrated AI-assisted component generation, design validation workflows, and LLM-powered configuration assistants to accelerate delivery',
          'Crafted pixel-perfect user interfaces for SaaS backup applications using React, TypeScript, Material UI, and CSS — translating complex requirements into intuitive experiences',
        ],
      },
    ],
  },

  // ── EXTRAS (Certifications, Education, Interests) ──
  extras: {
    label: 'Background',
    headline: 'Beyond the code.',
    certifications: [
      {
        name: 'AWS Certified Developer – Associate',
        issuer: 'Amazon Web Services',
        year: '2024',
        link: process.env.NEXT_PUBLIC_AWS_CERT_URL || 'https://www.credly.com/badges/a93a8a96-d414-4b78-971b-f8b7b86e8911/public_url',
      },
    ],
    education: [
      {
        degree: 'B.Tech – Computer Science & Engineering',
        institution: 'Lovely Professional University',
        period: '2018 – 2022',
        details: 'CGPA: 7.78 · Jalandhar, Punjab',
      },
      {
        degree: 'Board of Senior Secondary Education',
        institution: 'Kendriya Vidyalaya Khurda Road',
        period: '2016 – 2018',
        details: 'Odisha, India',
      },
      {
        degree: 'Board of Secondary Education',
        institution: 'Kendriya Vidyalaya Khurda Road',
        period: '2016',
        details: 'Odisha, India',
      },
    ],
    languages: [
      { name: 'English', proficiency: 'Full Professional' },
      { name: 'Hindi', proficiency: 'Native' },
      { name: 'Odia', proficiency: 'Native' },
    ],
    softSkills: [
      { name: 'Cross-functional Leadership', emoji: '🎯', description: 'Led architecture, AI strategy, and engineering practices across distributed teams' },
      { name: 'Stakeholder Communication', emoji: '🗣️', description: 'Bridging technical and business teams to align on product direction' },
      { name: 'Problem Solving', emoji: '🧠', description: 'Diagnosing complex distributed system failures and designing robust solutions' },
      { name: 'Project Ownership', emoji: '📋', description: 'End-to-end feature delivery from architecture to deployment' },
      { name: 'Mentoring & Knowledge Sharing', emoji: '🤝', description: 'Guiding junior engineers and shaping engineering best practices' },
      { name: 'Agile & Scrum', emoji: '🔄', description: 'Sprint planning, backlog grooming, and iterative delivery' },
      { name: 'Technical Documentation', emoji: '📝', description: 'Writing clear specs, ADRs, and runbooks for complex systems' },
      { name: 'Multi-region Coordination', emoji: '🌏', description: 'Coordinating deployments across US and Tokyo infrastructure' },
    ],
    interests: [
      { name: 'Cooking', emoji: '🍳' },
      { name: 'Football', emoji: '⚽' },
      { name: 'Cricket', emoji: '🏏' },
      { name: 'F1 Racing', emoji: '🏎️' },
      { name: 'Scalable Architecture', emoji: '🏗️' },
      { name: 'Open Source', emoji: '🌐' },
      { name: 'System Design', emoji: '⚙️' },
      { name: 'Competitive Programming', emoji: '🧩' },
    ],
  },

  // ── CONTACT ──
  contact: {
    headline: "Let's build\nsomething great.",
    subhead: "Open to new opportunities. Have an idea or just want to say hello — my inbox is always open.",
    email: process.env.NEXT_PUBLIC_EMAIL_ID || 'saisarthakmohapatra@gmail.com',
    web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
    links: [
      { label: 'Say Hello', href: `mailto:${process.env.NEXT_PUBLIC_EMAIL_ID || 'saisarthakmohapatra@gmail.com'}`, icon: 'mail', variant: 'primary' },
      { label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Sarthak88-cypher', icon: 'github', variant: 'secondary' },
      { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/saisarthakmohapatra88', icon: 'linkedin', variant: 'secondary' },
    ],
  },

  // ── FOOTER ──
  footer: {
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
      { label: 'Experience', href: '#experience' },
      { label: 'Contact', href: '#contact' },
    ],
    copyright: `© ${new Date().getFullYear()} Sai Sarthak Mohapatra. All rights reserved.`,
  },
};

export default config;
