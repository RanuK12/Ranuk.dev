# ranuk.dev

> Personal portfolio & digital showcase — Systems Engineer, Data Scientist & Python Developer.

[![GitHub](https://img.shields.io/badge/GitHub-RanuK12-181717?style=flat&logo=github)](https://github.com/RanuK12)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-emilio--ranucoli-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/emilio-ranucoli)
[![License](https://img.shields.io/badge/License-MIT-64ffda?style=flat)](#license)
[![Deploy](https://img.shields.io/badge/Live-ranuk.dev-f97316?style=flat&logo=vercel)](https://ranuk.dev)

---

## Overview

A fully hand-crafted portfolio website built from scratch with **vanilla HTML, CSS, and JavaScript** — no frameworks, no dependencies, no bloat. Just clean, performant code that showcases my work in data science, machine learning, and software engineering.

### Highlights

- **Neural Network Particle System** — Interactive background with interconnected nodes that respond to mouse movement, creating a living network visualization
- **Interactive ML Playground** — Train a neural network right in the browser. Place data points, configure hyperparameters, and watch the decision boundary form in real time. Built from scratch — forward propagation, backpropagation, and gradient descent implemented in vanilla JS
- **Trilingual Support** — Full internationalization in English, Spanish, and Italian with instant language switching and persistent preferences
- **Terminal-Style Preloader** — A boot sequence that sets the developer tone from the first millisecond
- **Glitch Typography** — CSS-only glitch effect on the hero name for that cyberpunk edge
- **Custom Cursor** — Dot + ring follower with hover states across interactive elements
- **Scroll-Triggered Animations** — IntersectionObserver-powered reveals for timeline items, project cards, skill bars, and certifications
- **Animated Stat Counters** — Eased number counters that fire when the hero section comes into view
- **Filterable Project Grid** — Category-based project filtering with smooth transitions
- **Responsive Design** — Fully responsive from 320px to ultrawide, with a mobile hamburger menu

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | Semantic HTML5 |
| **Styling** | Pure CSS3 — Custom Properties, Grid, Flexbox, Animations, Backdrop Filter |
| **Logic** | Vanilla ES6+ JavaScript — Classes, Modules, Intersection Observer, Canvas API |
| **Fonts** | Inter (UI) + Fira Code (monospace) via Google Fonts |
| **Icons** | Font Awesome 6 |
| **ML Engine** | Custom 2-layer neural network — no TensorFlow, no libraries |

**Zero dependencies. Zero build steps. Just open `index.html`.**

## Project Structure

```
ranuk.dev/
├── index.html              # Single-page application
├── css/
│   └── styles.css          # Complete stylesheet (~1400 lines)
├── js/
│   ├── app.js              # Main orchestrator
│   ├── i18n.js             # Translation engine (EN/ES/IT)
│   ├── particles.js        # Neural network particle system
│   ├── animations.js       # Scroll reveals, typing, counters, nav
│   └── ml-playground.js    # Neural network classifier from scratch
├── assets/
│   └── profile.jpg         # Profile photo
├── .gitignore
└── README.md
```

## ML Playground — Technical Details

The interactive ML lab implements a complete neural network from scratch:

- **Architecture**: 2-input → N-hidden (configurable) → 1-output
- **Activation**: ReLU (hidden layer) + Sigmoid (output)
- **Training**: Mini-batch gradient descent with backpropagation
- **Visualization**: Real-time decision boundary rendered on HTML5 Canvas using pixel-level classification
- **Configurable**: Learning rate, epochs, and hidden neuron count via sliders

This is not a library wrapper — every matrix multiplication, every gradient computation, and every weight update is written by hand.

## Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **About** | Bio, background, and a JSON-style code avatar |
| 02 | **Skills** | Animated progress bars across 4 categories |
| 03 | **Experience** | Interactive timeline — Booking.com, Accenture, Eurobrico, and more |
| 04 | **Projects** | Filterable grid of 8 featured projects with GitHub links |
| 05 | **ML Lab** | Interactive neural network playground |
| 06 | **Certifications** | AWS, Microsoft PL-300, IBM ML/DL, Google, Kaggle, HackerRank |
| 07 | **Contact** | Direct email form and social links |

## Local Development

No build tools required. Just serve the files:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Or just open index.html in your browser
```

## Deployment

Designed for **GitHub Pages** or any static hosting:

```bash
# GitHub Pages — push to main branch
git push origin main

# The site is served from the root of the repository
```

Compatible with: GitHub Pages, Vercel, Netlify, Cloudflare Pages, or any static file server.

## Performance

- **No frameworks** = minimal payload
- **No build step** = instant deploy
- **Lazy loading** on images
- **Efficient animations** using `requestAnimationFrame` and `IntersectionObserver`
- **CSS containment** for paint optimization
- **Responsive particle count** adapts to screen size

## Browser Support

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License. Feel free to fork and adapt for your own portfolio.

---

**Built with caffeine, curiosity, and clean code.**

*Emilio Ranucoli — 2026*
