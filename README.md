<div align="center">

# Portfolio – Lucas Giza

Personal portfolio & blog built with Next.js 16, React 19, and Tailwind CSS v4.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Docker%20%2F%20Dokploy-2496ED?logo=docker)](https://lucasgiza.com)

</div>

---

## About

Modern portfolio showcasing my projects, professional experience, technical skills, and a Markdown-powered blog. Fully static, dark-themed, responsive design with performance optimizations.

## Tech Stack

- **Next.js 16** — App Router, Server Components, SSG
- **React 19** — Custom components and hooks
- **Tailwind CSS v4** — Design system with CSS custom properties (`tokens.css`)
- **Markdown blog** — `gray-matter` + `remark` pipeline
- **Docker standalone** — Deployed via Dokploy
- **ESLint 9 + Prettier** — Code quality and formatting

## Features

### Portfolio
- Responsive navigation (desktop sidebar + mobile floating nav)
- Scroll spy with active section tracking
- Glass-morphism UI with design tokens
- Optimized SEO (Open Graph, Twitter Cards, JSON-LD, sitemap)

### Blog
- Markdown articles in `content/blog/` with YAML frontmatter
- RSS feed at `/blog/feed.xml`
- Full-text search (title, description, tags)
- Category filtering
- Table of contents (auto-generated from headings)
- Reading progress bar
- Previous / next article navigation
- Related articles by shared tags
- JSON-LD structured data (`BlogPosting` + `BreadcrumbList`)
- Automatic WebP image optimization at build time
- Reading time estimation
- Draft support (`draft: true` hides from production)

## Installation

```bash
# Clone and install
git clone https://github.com/The-Genium007/lucasgiza.git
cd lucasgiza
npm install

# Development (port 3005)
npm run dev

# Production build
npm run build
npm start

# Lint & format
npm run lint
npm run format
```

## Project Structure

```
├── app/            # Pages (App Router)
│   └── blog/       # Blog pages + RSS feed route
├── components/     # Reusable UI components
├── sections/       # Page sections (home, blog, experience, projects, skills)
├── content/blog/   # Markdown articles (.md)
├── data/           # Static data (projects, skills, experience, site config)
├── lib/            # Hooks, utilities, blog engine, metadata
├── styles/         # Global CSS, design tokens, component styles
└── public/         # Static assets (images, favicon)
```

## Customization

### Content
- `data/projects.js` — Projects list
- `data/experience.js` — Work experience
- `data/skills.js` — Technical skills
- `data/site.js` — Site metadata (name, URL, description)

### Blog
Add a new article by creating a `.md` file in `content/blog/`:

```yaml
---
title: "My Article Title"
date: 2026-04-04
category: dev
tags:
  - javascript
  - react
description: "Short description for SEO and previews."
thumbnail: "/images/blog/my-image.png"
draft: false
---

Article content in Markdown...
```

Images referenced in `thumbnail` are automatically converted to WebP at build time.

---

<div align="center">

**Lucas Giza** • [Portfolio](https://lucasgiza.com) • [LinkedIn](https://linkedin.com/in/lucas-giza-610093138) • [RSS](https://lucasgiza.com/blog/feed.xml)

</div>
