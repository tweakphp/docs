<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import AppIcon from './AppIcon.vue'
import { useGithubStars } from '../composables/useGithubStars'

const { isDark } = useData()

/**
 * App screenshots shown in the hero — theme aware.
 * To update them: replace the files in `docs/public/` (or change the paths here).
 */
const appScreenshot = {
  light: '/light.png',
  dark: '/dark.png',
}

/**
 * Accent themes — the exact palettes the TweakPHP app uses
 * (src/renderer/theme-primary-colors.ts). Picking one recolors the
 * whole site (via --hp-accent-* vars) and swaps the hero screenshot
 * (docs/public/themes/<id>.png).
 */
const ACCENTS = [
  { id: 'dracula', name: 'Dracula', color: '#bd93f9', image: '/themes/dracula.png' },
  { id: 'nord', name: 'Nord', color: '#88c0d0', image: '/themes/nord.png' },
  { id: 'monokai', name: 'Monokai', color: '#a6e22e', image: '/themes/monokai.png' },
  { id: 'github-light', name: 'GitHub Light', color: '#0366d6', image: '/themes/githublight.png' },
  { id: 'catppuccin', name: 'Catppuccin', color: '#ca9ee6', image: '/themes/catppuccin.png' },
  { id: 'night-owl', name: 'Night Owl', color: '#c792ea', image: '/themes/nightowl.png' },
  { id: 'rose-pine', name: 'Rose Pine', color: '#eb6f92', image: '/themes/rosepine.png' },
  { id: 'ultra-dark', name: 'Ultra Dark', color: '#7aa2f7', image: '/themes/ultradark.png' },
]

const DEFAULT_ACCENT = 'dracula'
const ACCENT_STORAGE_KEY = 'tweakphp_accent'

const selectedAccent = ref(DEFAULT_ACCENT)

const applyAccent = (id) => {
  selectedAccent.value = id
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.accent = id
  }
}

const restoreAccent = () => {
  try {
    const saved = localStorage.getItem(ACCENT_STORAGE_KEY)
    applyAccent(saved && ACCENTS.some((accent) => accent.id === saved) ? saved : DEFAULT_ACCENT)
  } catch {
    applyAccent(DEFAULT_ACCENT)
  }
}

const setAccent = (id) => {
  heroFallback.value = false
  applyAccent(id)
  // Lasts for the current visit only — the next load picks a new
  // random accent (see the head script in config.mts)
  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, id)
  } catch {}
}

const selectedAccentName = computed(
  () => ACCENTS.find((accent) => accent.id === selectedAccent.value)?.name ?? ''
)

/** Themed app screenshot — falls back to the original light/dark shots on error */
const heroFallback = ref(false)
const heroScreenshot = computed(() => {
  if (heroFallback.value) {
    return isDark.value ? appScreenshot.dark : appScreenshot.light
  }
  return ACCENTS.find((accent) => accent.id === selectedAccent.value)?.image ?? appScreenshot.light
})

/** Mobile carousel — which side is in view (0 = projects, 1 = editor) */
const activeSlide = ref(0)
const onCarouselScroll = (e) => {
  const { scrollLeft, clientWidth } = e.currentTarget
  if (clientWidth > 0) {
    activeSlide.value = Math.min(1, Math.round(scrollLeft / clientWidth))
  }
}

const isVisible = ref(false)

/** Hero typewriter — first word of the title (edit the list freely) */
const WORDS = ['Tweak', 'Test', 'Debug', 'Develop', 'Refactor', 'Run']
const typedWord = ref('Tweak')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let alive = true

const runTypewriter = async () => {
  let index = 0
  while (alive) {
    const word = WORDS[index % WORDS.length]
    for (let i = 1; i <= word.length && alive; i++) {
      typedWord.value = word.slice(0, i)
      await sleep(110)
    }
    await sleep(1700)
    for (let i = word.length; i >= 0 && alive; i--) {
      typedWord.value = word.slice(0, i)
      await sleep(50)
    }
    await sleep(350)
    index++
  }
}

/** GitHub stars — cached 1h, shared with the navbar pill (useGithubStars) */
const { stars: githubStars, fetchStars: fetchGithubStars } = useGithubStars()

onMounted(() => {
  restoreAccent()
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  fetchGithubStars()
  typedWord.value = ''
  runTypewriter()


})

onBeforeUnmount(() => {
  alive = false
})
</script>

<template>
  <div class="home-page">
    <!-- Background -->
    <div class="hero-background">
      <div class="grid-pattern"></div>
      <div class="hero-glow"></div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content" :class="{ visible: isVisible }">
        <h1 class="hero-title">
          <span class="title-line">
            <span class="typed-word">{{ typedWord }}</span><span class="typed-caret"></span> Your
          </span>
          <span class="title-gradient">PHP Code</span>
          <span class="title-line">Anywhere</span>
        </h1>

        <p class="hero-description">
          The <b>open source playground</b> cross-platform desktop app for <b>testing and running PHP code.</b>
          Connect to local projects, Docker containers, Kubernetes pods, SSH servers, or Laravel Vapor
          with a beautiful Monaco-powered editor.
        </p>

        <div class="hero-actions">
          <a href="/getting-started/installation" class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Now
            <div class="flex items-center space-x-1">
              <AppIcon name="mac" :size="18" />
              <AppIcon name="linux" :size="18" />
              <AppIcon name="windows" :size="18" />
            </div>
          </a>
          <a href="/getting-started/introduction" class="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Documentation
          </a>
        </div>
      </div>

      <!-- App screenshot -->
      <div class="hero-visual" :class="{ visible: isVisible }">
        <!-- Desktop: full screenshot -->
        <div class="screenshot-window">
          <img
            class="screenshot"
            :src="heroScreenshot"
            alt="TweakPHP app"
            @error="heroFallback = true"
          />
        </div>

        <!-- Mobile: full-height sides — projects, then editor -->
        <div
          class="screenshot-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="TweakPHP app preview"
        >
          <div class="carousel-track" @scroll="onCarouselScroll">
            <figure class="carousel-slide">
              <div class="slide-window">
                <img
                  class="slide-img slide-img-left"
                  :src="heroScreenshot"
                  alt="TweakPHP app — projects sidebar"
                  @error="heroFallback = true"
                />
              </div>
              <figcaption class="slide-caption">
                <strong>Your projects</strong> — local, Docker, SSH and Vapor in one place
              </figcaption>
            </figure>

            <figure class="carousel-slide">
              <div class="slide-window">
                <img
                  class="slide-img slide-img-right"
                  :src="heroScreenshot"
                  alt="TweakPHP app — Monaco editor and output"
                  @error="heroFallback = true"
                />
              </div>
              <figcaption class="slide-caption">
                <strong>Monaco editor</strong> — AI completion, run code, inspect output
              </figcaption>
            </figure>
          </div>

          <div class="carousel-dots" aria-hidden="true">
            <span
              v-for="i in 2"
              :key="i"
              :class="{ active: activeSlide === i - 1 }"
            ></span>
          </div>
        </div>
      </div>

      <div class="hero-accents">
        <span class="platforms-label">Accent</span>
        <div class="accent-swatches" role="group" aria-label="Accent color theme">
          <button
              v-for="accent in ACCENTS"
              :key="accent.id"
              type="button"
              class="accent-swatch"
              :class="{ active: selectedAccent === accent.id }"
              :style="{ '--swatch': accent.color }"
              :title="accent.name"
              :aria-label="`${accent.name} accent`"
              :aria-pressed="selectedAccent === accent.id"
              @click="setAccent(accent.id)"
          />
        </div>
        <span class="accent-name">{{ selectedAccentName }}</span>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <p class="section-eyebrow">Features</p>
        <h2 class="section-title">Elevate your PHP development</h2>
        <p class="section-subtitle">TweakPHP is packed with production-ready features designed to accelerate your workflow and make testing PHP code a breeze.<br>Built by developers, for developers.</p>
      </div>


      <!-- Feature cards -->
      <div class="features-grid">
        <a href="/projects" class="feature-card">
          <AppIcon name="local" :size="24" class="feature-icon" />
          <h3>Local Projects</h3>
          <p>Run code directly on your local PHP projects with automatic framework detection.</p>
        </a>

        <a href="/docker" class="feature-card">
          <AppIcon name="docker" :size="24" class="feature-icon" />
          <h3>Docker Support</h3>
          <p>Execute code inside Docker containers. Perfect for isolated testing environments.</p>
        </a>

        <a href="/kubernetes" class="feature-card">
          <AppIcon name="kubernetes" :size="24" class="feature-icon" />
          <h3>Kubernetes Support</h3>
          <p>Execute code inside Kubernetes pods. Ideal for testing in cluster environments.</p>
        </a>

        <a href="/ssh" class="feature-card">
          <AppIcon name="ssh" :size="24" class="feature-icon" />
          <h3>SSH Connections</h3>
          <p>Run code on remote servers via SSH.</p>
        </a>

        <a href="/ai-completion" class="feature-card">
          <AppIcon name="ai" :size="24" class="feature-icon" />
          <h3>AI Auto Completion</h3>
          <p>Intelligent code suggestions powered by AI.</p>
        </a>

        <a href="/getting-started/introduction" class="feature-card">
          <AppIcon name="lsp" :size="24" class="feature-icon" />
          <h3>LSP Integration</h3>
          <p>Intelligent code autocompletion.</p>
        </a>

        <a href="/getting-started/introduction" class="feature-card">
          <AppIcon name="framework" :size="24" class="feature-icon" />
          <h3>Framework Support</h3>
          <p>Laravel, Symfony, and more, detected automatically.</p>
        </a>

        <a href="/vapor" class="feature-card">
          <AppIcon name="vapor" :size="24" class="feature-icon" />
          <h3>Laravel Vapor</h3>
          <p>Run code against your Laravel Vapor environments without leaving your editor.</p>
        </a>

        <a href="/mcp-server" class="feature-card">
          <AppIcon name="mcp" :size="24" class="feature-icon" />
          <h3>MCP Server</h3>
          <p>Connect TweakPHP to AI assistants through the Model Context Protocol.</p>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
  overflow: hidden;

  /* Local design tokens (inertiajs.com style) */
  --hp-border: #e5e5e5;
  --hp-muted: #737373;
  --hp-line: rgba(23, 23, 23, 0.045);
  --hp-glow: color-mix(in srgb, var(--hp-accent-500) 13%, transparent);
}

.dark .home-page {
  --hp-border: #26282e;
  --hp-muted: #a1a1aa;
  --hp-line: rgba(255, 255, 255, 0.04);
  --hp-glow: color-mix(in srgb, var(--hp-accent-500) 16%, transparent);
}

/* Background — subtle square grid + soft blue glow */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 130vh;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--hp-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--hp-line) 1px, transparent 1px);
  background-size: 56px 56px;
}

.hero-glow {
  position: absolute;
  top: -260px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 620px;
  background: radial-gradient(closest-side, var(--hp-glow), transparent 72%);
  filter: blur(60px);
}

/* Hero Section */
.hero-section {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6.5rem 1.5rem 5rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 780px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--hp-border);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--hp-muted);
  margin-bottom: 1.75rem;
}

.badge-dot {
  width: 7px;
  height: 7px;
  background: var(--hp-accent-500);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.hero-title {
  font-size: clamp(2.75rem, 7vw, 4.5rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.06;
  margin-bottom: 1.5rem;
}

.title-line {
  display: block;
  color: var(--vp-c-text-1);
}

.typed-word {
  color: var(--vp-c-text-1);
}

.typed-caret {
  display: inline-block;
  width: 4px;
  height: 0.82em;
  margin-left: 0.1em;
  border-radius: 2px;
  background: var(--hp-accent-500);
  vertical-align: -0.06em;
  animation: cursor-blink 1s step-end infinite;
}

.title-gradient {
  display: block;
  background: linear-gradient(120deg, var(--hp-accent-600) 0%, var(--hp-accent-500) 60%, var(--hp-accent-400) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  max-width: 620px;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2.25rem;
  margin-bottom: 2.5rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.75rem;
  background: var(--hp-accent-600);
  color: #ffffff;
  font-weight: 500;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.btn-primary:hover {
  background: var(--hp-accent-700);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--hp-accent-500) 25%, transparent);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.75rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid var(--hp-border);
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--vp-c-bg-soft);
  border-color: #d4d4d4;
}

.dark .btn-secondary:hover {
  border-color: #3f3f46;
}

.hero-platforms {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.platforms-label {
  font-size: 0.8125rem;
  color: var(--hp-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.platform-icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.platform-icon {
  width: 18px;
  height: 18px;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.platform-icon:hover {
  opacity: 1;
}

/* Accent theme picker — the same themes as the TweakPHP app */
.hero-accents {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.accent-swatches {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.accent-swatch {
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--swatch);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.accent-swatch:hover {
  transform: scale(1.2);
}

.accent-swatch.active {
  box-shadow: 0 0 0 2px var(--vp-c-bg), 0 0 0 4px var(--swatch);
}

.accent-swatch:focus-visible {
  outline: 2px solid var(--swatch);
  outline-offset: 3px;
}

.accent-name {
  font-size: 0.8125rem;
  color: var(--hp-muted);
  min-width: 7rem;
  text-align: left;
}

/* Hero Visual — App screenshot */
.hero-visual {
  /* Same effective width as the features grid: the 1200px section cap
     minus the 1.5rem side padding. Flex children may overflow the hero
     column; align-items: center keeps it centered. */
  width: min(100vw - 3rem, 1152px);
  max-width: none;
  margin-top: 3.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;
}

.hero-visual.visible {
  opacity: 1;
  transform: translateY(0);
}

.screenshot-window {
  background: var(--vp-c-bg);
  border: 1px solid var(--hp-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.18);
}

.screenshot {
  display: block;
  width: 100%;
  height: auto;
}

/* Mobile carousel — the screenshot shown in two full-height sides */
.screenshot-carousel {
  display: none;
}

@media (max-width: 767px) {
  .screenshot-window {
    display: none;
  }

  .screenshot-carousel {
    display: block;
  }

  .carousel-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .carousel-track::-webkit-scrollbar {
    display: none;
  }

  .carousel-slide {
    flex: 0 0 100%;
    scroll-snap-align: center;
    margin: 0;
    padding: 0 8px;
  }

  .slide-window {
    background: var(--vp-c-bg);
    border: 1px solid var(--hp-border);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.18);
    height: 72vh;
    height: 72svh;
  }

  .slide-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slide-img-left {
    object-position: left center;
  }

  .slide-img-right {
    /* Shift the crop window left so the output panel's values
       ("Sunday", ...) aren't cut at the left edge */
    object-position: 75% center;
  }

  .slide-caption {
    margin: 0.875rem 0 0;
    padding: 0 1.25rem;
    text-align: center;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  .slide-caption strong {
    color: var(--vp-c-text-1);
    font-weight: 600;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .carousel-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--hp-border);
    transition: background-color 0.25s;
  }

  .carousel-dots span.active {
    background: var(--hp-accent-500);
  }
}

/* Sections */
.features-section,
.contributors-section {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-title {
  font-size: clamp(1.9rem, 4vw, 2.75rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
}

.section-squares span {
  width: 16px;
  height: 16px;
  border: 1px solid var(--hp-border);
  border-radius: 5px;
}

.section-squares span.is-blue {
  background: var(--hp-accent-500);
  border-color: var(--hp-accent-500);
}

.section-eyebrow {
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--hp-muted);
  margin-bottom: 0.75rem;
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.feature-card {
  display: block;
  text-decoration: none;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--hp-border);
  border-radius: 14px;
  padding: 1.5rem;
  text-align: left;
  transition: border-color 0.2s ease;
}

.feature-card:hover {
  border-color: #c7c7cc;
  text-decoration: none;
}

.dark .feature-card:hover {
  border-color: #3f3f46;
}

.feature-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 1rem;
  opacity: 0.75;
}

.feature-card h3 {
  font-size: 1.0625rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.step-card h3 {
  font-size: 1.0625rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.step-card p {
  color: var(--vp-c-text-2);
  line-height: 1.65;
  font-size: 0.9375rem;
}

.cta-section h2 {
  font-size: clamp(1.9rem, 4vw, 2.75rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.cta-section > p {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto 2.25rem;
  line-height: 1.7;
}

.cta-actions {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.btn-large {
  padding: 1.1rem 2.25rem;
  font-size: 1.0625rem;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.1rem 2rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid var(--hp-border);
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: var(--vp-c-bg-soft);
  border-color: #d4d4d4;
}

.dark .btn-ghost:hover {
  border-color: #3f3f46;
}

.star-count {
  padding: 0.15rem 0.55rem;
  margin-left: 0.25rem;
  background: rgba(23, 23, 23, 0.06);
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.4;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}

.dark .star-count {
  background: rgba(255, 255, 255, 0.08);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-section {
    padding: 4.5rem 1.5rem 4rem;
  }

  .demo-panels {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .hero-description {
    font-size: 1.0625rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
  }

  .hero-platforms {
    flex-direction: column;
    gap: 0.75rem;
  }

  .hero-accents {
    flex-direction: column;
    gap: 0.75rem;
  }

  .accent-name {
    min-width: 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .demo-panels {
    gap: 1rem;
  }

  .cta-actions {
    flex-direction: column;
  }

  .section-title {
    font-size: 1.75rem;
  }
}

</style>
