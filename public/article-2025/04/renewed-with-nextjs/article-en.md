---
title: Reborn with Next.js!
date: "2025-04-28"
description: "Couldn't transfer the article data (´・ω・)"
---

# Next.js

Hello, World!

Hi! I'm The Infinity's!
This time! Finally! I've successfully replaced my site with Next.js!

## Why I Decided to Switch to Next.js

There were various reasons for wanting to change my website to Next.js,
but the biggest factors were **performance improvement**, **enhanced development experience**,
and the realization of **SSG (Static Site Generation)**.

### Performance Improvement (About SSG)

In my previous site, slow display speed during increased traffic was a challenge. That's when I focused on Next.js's SSG (Static Site Generation). SSG is attractive because it **generates HTML files in advance, allowing for fast page display when users access the site**.

It's like having popular menu items prepared in advance at a restaurant, rather than cooking after receiving an order. This reduces server load and allows for **lightning-fast content delivery**!

### Enhanced Development Experience (TypeScript, TSX)

Another major reason was the improvement in development experience.
I had been interested in **development with TypeScript and JSX**,
and wanted to work more efficiently with type-safe, component-based development.

Next.js has built-in TypeScript support,
and when combined with React's JSX, it allows for writing **more modern and maintainable code**.
Learning TSX was quite challenging, but once I started development, I could really feel its benefits.
I've noticed improved code readability and easier bug detection.
Learning new technology was tough, but I feel it was definitely worth it! 💻

#### TypeScript Example

```tsx title="example.tsx" showLineNumbers
"use client";

import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // Show after scrolling 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      aria-label="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="36"
        height="36"
      >
        <path d="M12 4l-8 8h4l4 8l4 -8h4z" />
      </svg>
    </button>
  );
}
```

### Desired Feature: SSG

And the most desired feature was **SSG (Static Site Generation)**, which I mentioned earlier.
For a site primarily focused on static content like a blog, I thought we could maximize the benefits of SSG.

**By generating content in advance, not only does display speed improve, but it's also advantageous from a security perspective**.
It also works well with CDNs, enabling more stable content delivery.
This migration to Next.js was realized from a strong desire to provide a more comfortable website experience by utilizing SSG.

## Summary and Future Outlook

This migration to Next.js has been a significant step for me, bringing performance improvements, enhanced development experience, and most importantly, the realization of a fast and stable website through SSG. Although there were unexpected challenges with article data migration, the process of rebuilding the site while learning and experiencing new technology was very stimulating and enjoyable.

Since we've just completed the migration, I feel we need to further utilize Next.js's features. In the future, I plan to challenge various things using this new foundation, such as introducing dynamic content and achieving more refined UI/UX.

Please continue to support The Infinity's!
