---
title: "Getting Started with Next.js App Router"
date: 2026-03-24
category: informatique
tags:
  - nextjs
  - react
  - javascript
description: "A quick introduction to Next.js App Router, the modern way to build React applications with server components and static generation."
thumbnail: ""
draft: false
---

## Why Next.js?

Next.js has become the go-to framework for building modern React applications. With the introduction of the **App Router**, it brings a new paradigm based on React Server Components.

### Key Features

Here are some of the most powerful features of the App Router:

- **Server Components** by default — less JavaScript sent to the browser
- **File-based routing** — create a file, get a route
- **Static Generation** — pages are built at compile time
- **Streaming** — progressive rendering for better UX

### A Simple Example

Here's what a basic page looks like:

```javascript
// app/about/page.js
export default function AboutPage() {
  return (
    <main>
      <h1>About Me</h1>
      <p>Welcome to my portfolio.</p>
    </main>
  );
}
```

The beauty of this approach is its simplicity. No configuration needed — just create the file and the route exists.

## What's Next?

In upcoming posts, I'll dive deeper into:

1. Data fetching patterns with Server Components
2. Optimizing images and fonts
3. Deploying to production with Dokploy

Stay tuned!
