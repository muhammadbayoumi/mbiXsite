# mbiXsite — Excel Intelligence Platform

A professional, high-performance website for the mbiX Excel Add-in.

**Live Site:** https://muhammadbayoumi.github.io/mbiXsite/

---

## 🚀 Quick Start (VS Code)

### Step 1 — Install Prerequisites

1. Download and install **Node.js LTS** (v20+):  
   👉 https://nodejs.org  
   (Download the LTS version, run the installer, keep all defaults)

2. Install **VS Code**:  
   👉 https://code.visualstudio.com

3. Install VS Code extensions (recommended):
   - **ESLint** (Microsoft)
   - **Prettier** (Prettier)
   - **Sass** (Syler)
   - **Live Preview** (Microsoft) — optional

### Step 2 — Open Project in VS Code

```bash
# 1. Open VS Code
# 2. File → Open Folder... → Select your mbiXsite folder
# 3. Open Terminal: Terminal → New Terminal (or Ctrl+`)
```

### Step 3 — Install Dependencies

In the VS Code terminal, run:

```bash
npm install
```

> ⏱️ This downloads all packages. Takes ~2 minutes on first run.

### Step 4 — Run Dev Server (localhost)

```bash
npm run dev
```

This will:
- Start Vite dev server on **http://localhost:3000**
- Open your browser automatically
- Enable Hot Module Replacement (HMR) — changes appear instantly

### Step 5 — Build for Production

```bash
npm run build
```

Output goes to `/dist` folder. This is what GitHub Pages serves.

### Step 6 — Preview Production Build Locally

```bash
npm run preview
```

Serves the built `/dist` folder on **http://localhost:4173**

---

## 📁 Project Structure

```
mbiXsite/
├── .github/workflows/deploy.yml   # GitHub Actions — auto deploy
├── public/                         # Static assets (icons, OG image)
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── og-image.png
├── src/
│   ├── js/
│   │   ├── main.js                 # Entry point
│   │   ├── animations.js           # GSAP + ScrollTrigger
│   │   ├── navbar.js               # Scroll behavior + mobile menu
│   │   ├── i18n.js                 # Language switcher (EN/AR)
│   │   ├── links.js                # Dynamic link injection
│   │   ├── icons-loader.js         # Ribbon icon loader
│   │   └── version-loader.js       # Live version from GitHub
│   ├── scss/                       # 15 SCSS modules (ITCSS)
│   │   ├── main.scss               # Entry point
│   │   ├── _tokens.scss            # CSS custom properties
│   │   ├── _base.scss              # Reset + accessibility
│   │   ├── _layout.scss            # Grid + sections
│   │   ├── _navbar.scss            # Nav styles
│   │   ├── _buttons.scss           # Pill buttons
│   │   ├── _hero.scss              # Hero section
│   │   ├── _stats.scss             # Stats counters
│   │   ├── _cards.scss             # Feature + download cards
│   │   ├── _timeline.scss          # About timeline
│   │   ├── _dialogs.scss           # W11 + VSTO dialogs
│   │   ├── _ribbon.scss            # Excel ribbon mockup
│   │   ├── _footer.scss            # Footer + about
│   │   ├── _sections.scss          # How it works + schema
│   │   ├── _animations.scss        # CSS animations + scroll states
│   │   ├── _rtl.scss               # Arabic support
│   │   └── _responsive.scss        # Media queries
│   └── data/
│       └── links.json              # All URLs in one place
├── index.html                      # Homepage (SEO optimized)
├── about.html                      # About page
├── install.html                    # Installation guide
├── vite.config.js                  # Build config + PWA
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR (port 3000) |
| `npm run build` | Production build to `/dist` |
| `npm run preview` | Preview production build (port 4173) |
| `npm run analyze` | Build + open bundle size analyzer |
| `npm run lint` | Run ESLint on `src/` |
| `npm run format` | Run Prettier on all files |

---

## 🌐 GitHub Pages Deployment

The project auto-deploys via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions runs `npm ci` + `npm run build`
3. `/dist` folder is deployed to GitHub Pages

**To enable Pages:**
1. Go to repo → Settings → Pages
2. Source: **GitHub Actions**
3. Push once — deployment starts automatically

---

## 🎨 Design System

### Colors (WhatsApp Dark Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--mbx-green` | `#24c05f` | Primary brand, buttons, accents |
| `--mbx-dark1` | `#111b21` | Card backgrounds |
| `--mbx-dark3` | `#0b131a` | Page background |
| `--mbx-cream` | `#fff5eb` | Primary text (dark pages) |
| `--mbx-light` | `#fff5eb` | Light page background |
| `--mbx-text2` | `#8899b4` | Secondary text |
| `--mbx-text3` | `#4a5c78` | Muted text, borders |

### Typography

- **Font:** Inter (Google Fonts) — loaded via CSS
- **Weights:** 300, 400, 500, 600, 700, 800, 900
- **Monospace:** JetBrains Mono / Consolas

### Spacing Scale

`--space-xs: 0.25rem` → `--space-2xl: 3rem`

---

## ♿ Accessibility

- ✅ Skip links for keyboard navigation
- ✅ ARIA labels on all interactive elements
- ✅ Focus-visible styles (green outline)
- ✅ Semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`)
- ✅ `prefers-reduced-motion` support
- ✅ RTL support for Arabic

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| **Vite** | Build tool & dev server |
| **Bootstrap 5** | CSS grid + utilities |
| **Bootstrap Icons** | Icon font |
| **GSAP + ScrollTrigger** | Professional animations |
| **Sass** | CSS preprocessor |
| **Vite PWA** | Progressive Web App |
| **Vite Compression** | Gzip + Brotli |

---

## ⚡ Performance Optimizations

- Code-splitting: Bootstrap + GSAP in separate chunks
- Gzip + Brotli compression for production
- CSS minification via esbuild
- JS tree-shaking + terser minification
- `console.log` removal in production
- Preconnect hints for external domains
- Lazy-loaded images via `loading="lazy"`
- Font display: swap for Inter

---

## 📝 How to Make Any Edit

### 1. Change Text

Open `src/js/i18n.js`. Find the text key, edit the value:

```js
en: {
  hero_title: 'Your New Title Here',  // ← Change this
}
```

### 2. Change Colors

Open `src/scss/_tokens.scss`. Edit the CSS variable:

```scss
:root {
  --mbx-green: #24c05f;  // ← Change hex code
}
```

### 3. Change Links

Open `src/data/links.json`. Edit any URL:

```json
{
  "social": {
    "github_user": "https://github.com/YOURNAME"
  }
}
```

### 4. Add a New Page

1. Create `newpage.html` (copy structure from `about.html`)
2. Add to `vite.config.js` → `rollupOptions.input`
3. Add link to navbar in all HTML files

### 5. Add a Feature Card

In `index.html`, find the `features-grid` section, copy an `<article>` block and edit:

```html
<article class="feature-card">
  <div class="feature-icon">🚀</div>
  <h3 class="feature-title" data-i18n="feat_new_title">New Feature</h3>
  <p class="feature-desc" data-i18n="feat_new_desc">Description here.</p>
</article>
```

Then add the translations in `src/js/i18n.js`.

### 6. Update Profile Photo

In `about.html`, replace the placeholder:

```html
<div class="about-photo-wrap mx-auto">
  <img src="your-photo.jpg" alt="Your Name" 
       style="width:100%; height:100%; border-radius:50%; object-fit:cover;">
</div>
```

### 7. Deploy Changes

```bash
# 1. Save all files in VS Code (Ctrl+S)
# 2. Stage changes
git add .

# 3. Commit
git commit -m "Your update message"

# 4. Push to main
git push origin main

# 5. GitHub Actions auto-deploys in ~2 minutes
```

---

## 🆘 Troubleshooting

### `npm install` fails
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js v20+ is installed: `node --version`

### `npm run dev` port already in use
- Vite will auto-pick next port (3001, 3002, ...)
- Or kill existing process: `npx kill-port 3000`

### Build fails
- Check all HTML files have closing tags
- Check SCSS syntax (no missing semicolons)
- Run `npm run lint` to find JS errors

### GitHub Pages shows old version
- Clear browser cache (Ctrl+Shift+R)
- Check Actions tab in GitHub for build errors
- Ensure repo Settings → Pages source is "GitHub Actions"

---

## 📄 License

MIT © Muhammad Bayoumi
