<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import Contributors from './Contributors.vue'

const { isDark } = useData()

/**
 * App screenshots shown in the hero — theme aware.
 * To update them: replace the files in `docs/public/` (or change the paths here).
 */
const appScreenshot = {
  light: '/light.png',
  dark: '/dark.png',
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

/** GitHub stars — shared by the CTA button and the stats band (cached 1h) */
const githubStars = ref(null)

const fetchGithubStars = () => {
  if (typeof localStorage !== 'undefined') {
    try {
      const cached = localStorage.getItem('tweakphp_stars')
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (typeof data === 'number' && Date.now() - timestamp < 60 * 60 * 1000) {
          githubStars.value = data
          return
        }
      }
    } catch {}
  }

  fetch('https://api.github.com/repos/tweakphp/tweakphp')
    .then((res) => res.json())
    .then((data) => {
      if (data && typeof data.stargazers_count === 'number') {
        githubStars.value = data.stargazers_count
        if (typeof localStorage !== 'undefined') {
          try {
            localStorage.setItem('tweakphp_stars', JSON.stringify({ data: data.stargazers_count, timestamp: Date.now() }))
          } catch {}
        }
      }
    })
    .catch(() => {})
}

onMounted(() => {
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
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>Open Source PHP Playground</span>
        </div>

        <h1 class="hero-title">
          <span class="title-line">
            <span class="typed-word">{{ typedWord }}</span><span class="typed-caret"></span> Your
          </span>
          <span class="title-gradient">PHP Code</span>
          <span class="title-line">Anywhere</span>
        </h1>

        <p class="hero-description">
          The ultimate cross-platform desktop app for testing and running PHP code.
          Connect to local projects, Docker containers, SSH servers, or Laravel Vapor
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
          </a>
          <a href="/getting-started/introduction" class="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Documentation
          </a>
        </div>

        <div class="hero-platforms">
          <span class="platforms-label">Available on</span>
          <div class="platform-icons">
            <img src="/mac.svg" alt="macOS" title="macOS" class="platform-icon" />
            <img src="/linux.svg" alt="Linux" title="Linux" class="platform-icon" />
            <img src="/windows.svg" alt="Windows" title="Windows" class="platform-icon" />
          </div>
        </div>
      </div>

      <!-- App screenshot -->
      <div class="hero-visual" :class="{ visible: isVisible }">
        <div class="screenshot-window">
          <img
            class="screenshot"
            :src="isDark ? appScreenshot.dark : appScreenshot.light"
            alt="TweakPHP app"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <p class="section-eyebrow">Features</p>
        <h2 class="section-title">Elevate your PHP development</h2>
        <p class="section-subtitle">TweakPHP is packed with production-ready features designed to accelerate your workflow and make testing PHP code a breeze.</p>
      </div>


      <!-- Feature cards -->
      <div class="features-grid">
        <div class="feature-card">
          <img class="feature-icon" src="/local.svg" alt="Local Projects" />
          <h3>Local Projects</h3>
          <p>Run code directly on your local PHP projects with automatic framework detection.</p>
        </div>

        <div class="feature-card">
          <img class="feature-icon" src="/docker.svg" alt="Docker" />
          <h3>Docker Support</h3>
          <p>Execute code inside Docker containers. Perfect for isolated testing environments.</p>
        </div>

        <div class="feature-card">
          <img class="feature-icon" src="/ssh.svg" alt="SSH" />
          <h3>SSH Connections</h3>
          <p>Run code on remote servers via SSH.</p>
        </div>

        <div class="feature-card">
          <img class="feature-icon" src="/ai.svg" alt="AI" />
          <h3>AI Auto Completion</h3>
          <p>Intelligent code suggestions powered by AI.</p>
        </div>

        <div class="feature-card">
          <img class="feature-icon" src="/lsp.svg" alt="LSP" />
          <h3>LSP Integration</h3>
          <p>Intelligent code autocompletion.</p>
        </div>

        <div class="feature-card">
          <img class="feature-icon" src="/framework.svg" alt="Framework" />
          <h3>Framework Support</h3>
          <p>Laravel, Symfony, and more, detected automatically.</p>
        </div>

        <div class="feature-card">
          <img class="feature-icon" src="/vapor.svg" alt="Laravel Vapor" />
          <h3>Laravel Vapor</h3>
          <p>Run code against your Laravel Vapor environments without leaving your editor.</p>
        </div>

        <div class="feature-card">
          <img class="feature-icon" src="/mcp.svg" alt="MCP Server" />
          <h3>MCP Server</h3>
          <p>Connect TweakPHP to AI assistants through the Model Context Protocol.</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <div class="section-header">
        <p class="section-eyebrow">Get Started</p>
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">Get started in three simple steps</p>
      </div>

      <div class="steps-container">
        <div class="step-card">
          <span class="step-badge">1</span>
          <h3>Download &amp; Install</h3>
          <p>Get TweakPHP for your operating system. Available for macOS, Linux, and Windows.</p>
        </div>

        <div class="step-card">
          <span class="step-badge">2</span>
          <h3>Connect Your Project</h3>
          <p>Choose your target: local project, Docker container, SSH server, or Vapor environment.</p>
        </div>

        <div class="step-card">
          <span class="step-badge">3</span>
          <h3>Start Tweaking</h3>
          <p>Write, run, and iterate on your PHP code instantly with real-time output.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <h2>Ready to Supercharge Your PHP Development?</h2>
      <p>Join thousands of developers who trust TweakPHP for their daily PHP testing needs.</p>
      <div class="cta-actions">
        <a href="/getting-started/installation" class="btn-primary btn-large">
          Download
        </a>
        <a href="https://github.com/tweakphp/tweakphp" target="_blank" rel="noopener" class="btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Star on GitHub
          <span v-if="githubStars !== null" class="star-count">{{ githubStars.toLocaleString('en-US') }}</span>
        </a>
      </div>
    </section>

    <!-- Contributors Section -->
    <section class="contributors-section">
      <div class="section-header">
        <h2 class="section-title">Built by the Community</h2>
        <p class="section-subtitle">Thanks to all our amazing contributors</p>
      </div>
      <Contributors />
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
  --hp-glow: rgba(37, 99, 235, 0.13);
}

.dark .home-page {
  --hp-border: #26282e;
  --hp-muted: #a1a1aa;
  --hp-line: rgba(255, 255, 255, 0.04);
  --hp-glow: rgba(59, 130, 246, 0.16);
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
  background: #3b82f6;
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
  background: #3b82f6;
  vertical-align: -0.06em;
  animation: cursor-blink 1s step-end infinite;
}

.title-gradient {
  display: block;
  background: linear-gradient(120deg, #2563eb 0%, #3b82f6 60%, #60a5fa 100%);
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
  background: #2563eb;
  color: #ffffff;
  font-weight: 500;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.btn-primary:hover {
  background: #1d4ed8;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
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

/* Hero Visual — App screenshot */
.hero-visual {
  width: 100%;
  max-width: 1000px;
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

.window-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--hp-border);
}

.window-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27ca40; }

.window-title {
  font-size: 0.8rem;
  color: var(--hp-muted);
}

.screenshot {
  display: block;
  width: 100%;
  height: auto;
}

/* Sections */
.features-section,
.how-it-works-section,
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

/* Squares motif — inertiajs.com style */
.section-squares {
  display: grid;
  grid-template-columns: repeat(3, 16px);
  gap: 6px;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.section-squares span {
  width: 16px;
  height: 16px;
  border: 1px solid var(--hp-border);
  border-radius: 5px;
}

.section-squares span.is-blue {
  background: #3b82f6;
  border-color: #3b82f6;
}

.section-eyebrow {
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--hp-muted);
  margin-bottom: 0.75rem;
}

/* Big feature block — code demo (inertiajs.com style) */
.feature-block {
  max-width: 1000px;
  margin: 0 auto 4.5rem;
  text-align: center;
}

.feature-block-title {
  font-size: clamp(1.6rem, 3.5vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.feature-block-description {
  max-width: 640px;
  margin: 0 auto 2.5rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.demo-panels {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 1.25rem;
  text-align: left;
}

.code-window {
  display: flex;
  flex-direction: column;
  background: var(--vp-code-block-bg);
  border: 1px solid var(--hp-border);
  border-radius: 14px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid var(--hp-border);
}

.demo-dots {
  display: flex;
  gap: 6px;
}

.demo-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--hp-border);
}

.code-tab {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.code-body {
  flex: 1;
  display: flex;
  padding: 1rem 1.25rem 1.25rem 0.75rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-line-numbers {
  display: flex;
  flex-direction: column;
  padding-right: 0.9rem;
  margin-right: 0.9rem;
  border-right: 1px solid var(--hp-border);
  color: var(--vp-code-line-number-color, var(--hp-muted));
  text-align: right;
  user-select: none;
}

.code-pre {
  margin: 0;
  font: inherit;
  color: var(--vp-code-block-color, var(--vp-c-text-1));
  white-space: pre;
}

/* Syntax tokens — theme adaptive via VitePress code vars */
.tk-tag,
.tk-keyword {
  color: var(--vp-code-token-keyword, var(--vp-c-text-1));
}

.tk-class {
  color: var(--vp-code-token-function, var(--vp-c-text-1));
}

.tk-fn,
.tk-prop {
  color: var(--vp-code-token-parameter, var(--vp-c-text-1));
}

.tk-str {
  color: var(--vp-code-token-string, var(--vp-c-text-1));
}

.tk-num {
  color: var(--vp-code-token-string-expression, var(--vp-c-text-1));
}

.tk-comment {
  color: var(--vp-code-token-comment, var(--vp-c-text-2));
  font-style: italic;
}

.tk-var {
  color: var(--vp-code-color, var(--vp-c-text-1));
}

.output-body {
  flex: 1;
  padding: 1rem 1.25rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.7;
}

.output-line {
  display: block;
  color: #16a34a;
}

.dark .output-line {
  color: #4ade80;
}

.output-cursor {
  display: inline-block;
  color: var(--vp-c-text-1);
  animation: cursor-blink 1s step-end infinite;
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
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--hp-border);
  border-radius: 14px;
  padding: 1.5rem;
  text-align: left;
  transition: border-color 0.2s ease;
}

.feature-card:hover {
  border-color: #c7c7cc;
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

/* How It Works — flat numbered cards */
.steps-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.step-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--hp-border);
  border-radius: 14px;
  padding: 1.75rem;
  text-align: left;
  transition: border-color 0.2s ease;
}

.step-card:hover {
  border-color: #c7c7cc;
}

.dark .step-card:hover {
  border-color: #3f3f46;
}

.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.dark .step-badge {
  background: rgba(59, 130, 246, 0.14);
  color: #60a5fa;
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

/* CTA — flat centered (inertiajs.com style) */
.cta-section {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 3rem auto;
  padding: 3rem 1.5rem 1rem;
  text-align: center;
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
