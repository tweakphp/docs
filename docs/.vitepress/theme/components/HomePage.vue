<script setup>
import { ref, onMounted } from 'vue'
import Contributors from './Contributors.vue'

const isVisible = ref(false)
const codeSnippet = `<?php

use App\\Models\\User;

// Find users with TweakPHP
$users = User::where('active', true)
    ->with(['posts', 'comments'])
    ->orderBy('created_at', 'desc')
    ->take(10)
    ->get();

foreach ($users as $user) {
    echo $user->name . "\\n";
}`

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="home-page">
    <!-- Animated Background -->
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-pattern"></div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content" :class="{ 'visible': isVisible }">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>Open Source PHP Playground</span>
        </div>

        <h1 class="hero-title">
          <span class="title-line">Tweak Your</span>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Now
          </a>
          <a href="/getting-started/introduction" class="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

      <div class="hero-visual" :class="{ 'visible': isVisible }">
        <div class="editor-window">
          <div class="window-header">
            <div class="window-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="window-title">TweakPHP</span>
            <div class="window-actions"></div>
          </div>
          <div class="editor-content">
            <div class="line-numbers">
              <span v-for="n in 15" :key="n">{{ n }}</span>
            </div>
            <pre class="code-block"><code><span class="token-tag">&lt;?php</span>

<span class="token-keyword">use</span> <span class="token-class">App\Models\User</span>;

<span class="token-comment">// Find users with TweakPHP</span>
<span class="token-variable">$users</span> = <span class="token-class">User</span>::<span class="token-function">where</span>(<span class="token-string">'active'</span>, <span class="token-keyword">true</span>)
    -><span class="token-function">with</span>([<span class="token-string">'posts'</span>, <span class="token-string">'comments'</span>])
    -><span class="token-function">orderBy</span>(<span class="token-string">'created_at'</span>, <span class="token-string">'desc'</span>)
    -><span class="token-function">take</span>(<span class="token-number">10</span>)
    -><span class="token-function">get</span>();

<span class="token-keyword">foreach</span> (<span class="token-variable">$users</span> <span class="token-keyword">as</span> <span class="token-variable">$user</span>) {
    <span class="token-keyword">echo</span> <span class="token-variable">$user</span>-><span class="token-property">name</span> . <span class="token-string">"\n"</span>;
}</code></pre>
          </div>
          <div class="editor-output">
            <div class="output-header">Output</div>
            <div class="output-content">
              <span class="output-line">John Doe</span>
              <span class="output-line">Jane Smith</span>
              <span class="output-line">Bob Wilson</span>
              <span class="output-cursor">|</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">Powerful Features</h2>
        <p class="section-subtitle">Everything you need to test and run PHP code efficiently</p>
      </div>

      <div class="bento-grid">
        <!-- Large Feature Card - Editor -->
        <div class="bento-card bento-large">
          <div class="card-icon">
            <img src="/editor.svg" alt="Monaco Editor" />
          </div>
          <h3>Monaco Editor</h3>
          <p>The same powerful editor that powers VS Code. Syntax highlighting, IntelliSense, and a seamless coding experience.</p>
          <div class="card-glow"></div>
        </div>

        <!-- Medium Feature Card - Local -->
        <div class="bento-card bento-medium">
          <div class="card-icon">
            <img src="/local.svg" alt="Local Projects" />
          </div>
          <h3>Local Projects</h3>
          <p>Run code directly on your local PHP projects with automatic framework detection.</p>
        </div>

        <!-- Medium Feature Card - Docker -->
        <div class="bento-card bento-medium">
          <div class="card-icon">
            <img src="/docker.svg" alt="Docker" />
          </div>
          <h3>Docker Support</h3>
          <p>Execute code inside Docker containers. Perfect for isolated testing environments.</p>
        </div>

        <!-- Small Feature Cards -->
        <div class="bento-card bento-small">
          <div class="card-icon">
            <img src="/ssh.svg" alt="SSH" />
          </div>
          <h3>SSH Connections</h3>
          <p>Run code on remote servers via SSH.</p>
        </div>

        <div class="bento-card bento-small">
          <div class="card-icon">
            <img src="/ai.svg" alt="AI" />
          </div>
          <h3>AI Auto Completion</h3>
          <p>Intelligent code suggestions powered by AI.</p>
        </div>

        <div class="bento-card bento-small">
          <div class="card-icon">
            <img src="/lsp.svg" alt="LSP" />
          </div>
          <h3>LSP Integration</h3>
          <p>Intelligent code autocompletion.</p>
        </div>

        <div class="bento-card bento-small">
          <div class="card-icon">
            <img src="/framework.svg" alt="Framework" />
          </div>
          <h3>Framework Support</h3>
          <p>Laravel, Symfony, and more.</p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <div class="section-header">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">Get started in three simple steps</p>
      </div>

      <div class="steps-container">
        <div class="step-card">
          <div class="step-number">01</div>
          <div class="step-content">
            <h3>Download & Install</h3>
            <p>Get TweakPHP for your operating system. Available for macOS, Linux, and Windows.</p>
          </div>
          <div class="step-line"></div>
        </div>

        <div class="step-card">
          <div class="step-number">02</div>
          <div class="step-content">
            <h3>Connect Your Project</h3>
            <p>Choose your target: local project, Docker container, SSH server, or Vapor environment.</p>
          </div>
          <div class="step-line"></div>
        </div>

        <div class="step-card">
          <div class="step-number">03</div>
          <div class="step-content">
            <h3>Start Tweaking</h3>
            <p>Write, run, and iterate on your PHP code instantly with real-time output.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <div class="cta-background">
          <div class="cta-orb cta-orb-1"></div>
          <div class="cta-orb cta-orb-2"></div>
        </div>
        <h2>Ready to Supercharge Your PHP Development?</h2>
        <p>Join thousands of developers who trust TweakPHP for their daily PHP testing needs.</p>
        <div class="cta-actions">
          <a href="/getting-started/installation" class="btn-primary btn-large">
            Download
          </a>
          <a href="https://github.com/tweakphp/tweakphp" target="_blank" rel="noopener" class="btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
          </a>
        </div>
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
}

/* Hero Background */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #be185d 0%, #ec4899 100%);
  top: -200px;
  right: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  bottom: 0;
  left: -100px;
  animation-delay: -5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  top: 50%;
  left: 50%;
  animation-delay: -10s;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.dark .grid-pattern {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(30px, -30px) rotate(5deg); }
  50% { transform: translate(-20px, 20px) rotate(-5deg); }
  75% { transform: translate(-30px, -20px) rotate(3deg); }
}

/* Hero Section */
.hero-section {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
  min-height: 90vh;
  align-items: center;
}

.hero-content {
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
  padding: 0.5rem 1rem;
  background: rgba(190, 24, 93, 0.1);
  border: 1px solid rgba(190, 24, 93, 0.3);
  border-radius: 100px;
  font-size: 0.875rem;
  color: #ec4899;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #ec4899;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.title-line {
  display: block;
  color: var(--vp-c-text-1);
}

.title-gradient {
  display: block;
  background: linear-gradient(135deg, #be185d 0%, #ec4899 50%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #be185d 0%, #db2777 100%);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(190, 24, 93, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(190, 24, 93, 0.4);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
}

.hero-platforms {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.platforms-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.platform-icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.platform-icon {
  width: 18px;
  height: 18px;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.platform-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Hero Visual - Editor */
.hero-visual {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;
}

.hero-visual.visible {
  opacity: 1;
  transform: translateX(0);
}

.editor-window {
  background: #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.1),
    0 25px 50px -12px rgba(0,0,0,0.5);
}

.window-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.window-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27ca40; }

.window-title {
  flex: 1;
  text-align: center;
  font-size: 0.875rem;
  color: #888;
}

.editor-content {
  display: flex;
  padding: 1rem;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  border-right: 1px solid #3d3d3d;
  margin-right: 1rem;
  color: #666;
  user-select: none;
}

.code-block {
  margin: 0;
  color: #d4d4d4;
  white-space: pre;
}

/* Syntax Highlighting */
.token-tag {
  color: #569cd6;
}

.token-keyword {
  color: #c586c0;
}

.token-class {
  color: #4ec9b0;
}

.token-function {
  color: #dcdcaa;
}

.token-string {
  color: #ce9178;
}

.token-variable {
  color: #9cdcfe;
}

.token-property {
  color: #9cdcfe;
}

.token-number {
  color: #b5cea8;
}

.token-comment {
  color: #6a9955;
  font-style: italic;
}

.editor-output {
  border-top: 1px solid #3d3d3d;
  background: #1a1a1a;
}

.output-header {
  padding: 8px 16px;
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #3d3d3d;
}

.output-content {
  padding: 12px 16px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
}

.output-line {
  display: block;
  color: #4ade80;
}

.output-cursor {
  animation: blink 1s step-end infinite;
  color: #fff;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Features Section */
.features-section {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem 6rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--vp-c-text-1) 0%, var(--vp-c-text-2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.3;
  padding: 0.5rem 0;
  overflow: visible;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  gap: 1.5rem;
}

.bento-card {
  position: relative;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.bento-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 20px 40px rgba(190, 24, 93, 0.1);
}

.bento-card .card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(190, 24, 93, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.bento-large {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-medium {
  grid-column: span 2;
}

.bento-small {
  grid-column: span 1;
}

.card-icon {
  width: 48px;
  height: 48px;
  padding: 12px;
  background: linear-gradient(135deg, rgba(190, 24, 93, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.card-icon img {
  width: 100%;
  height: 100%;
}

.bento-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.bento-card p {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.bento-large h3 {
  font-size: 1.75rem;
}

.bento-large p {
  font-size: 1.125rem;
}

/* How It Works Section */
.how-it-works-section {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.how-it-works-section .section-title {
  line-height: 1.3;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
}

.how-it-works-section .section-subtitle {
  line-height: 1.7;
  margin-bottom: 1rem;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.step-card {
  position: relative;
  text-align: center;
  padding: 3rem 2rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.step-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 20px 40px rgba(190, 24, 93, 0.1);
}

.step-number {
  display: block;
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #be185d 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  line-height: 1.2;
  padding: 0.5rem 0;
}

.step-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.step-content p {
  color: var(--vp-c-text-2);
  line-height: 1.8;
  font-size: 1rem;
}

.step-line {
  display: none;
}

/* CTA Section */
.cta-section {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 4rem auto;
  padding: 0 2rem;
}

.cta-content {
  position: relative;
  background: linear-gradient(135deg, #be185d 0%, #7c3aed 100%);
  border-radius: 32px;
  padding: 5rem 4rem;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(190, 24, 93, 0.3);
}

.cta-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0.1;
}

.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.cta-orb-1 {
  width: 400px;
  height: 400px;
  background: white;
  top: -100px;
  right: -100px;
}

.cta-orb-2 {
  width: 300px;
  height: 300px;
  background: white;
  bottom: -50px;
  left: -50px;
}

.cta-content h2 {
  position: relative;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.3;
  padding: 0.25rem 0;
}

.cta-content > p {
  position: relative;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.cta-actions {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.125rem;
}

.cta-section .btn-primary {
  background: white;
  color: #be185d;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.cta-section .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 2rem;
  color: white;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* Contributors Section */
.contributors-section {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 6rem;
}

.contributors-section .section-title {
  line-height: 1.3;
  padding: 0.25rem 0;
  margin-bottom: 1.5rem;
}

.contributors-section .section-subtitle {
  line-height: 1.7;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 3rem;
    min-height: auto;
    padding: 4rem 1.5rem;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-visual {
    order: -1;
  }

  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .bento-large {
    grid-column: span 2;
    grid-row: span 1;
  }

  .steps-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .step-line {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2.25rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-platforms {
    flex-direction: column;
    align-items: flex-start;
  }

  .bento-grid {
    grid-template-columns: 1fr;
  }

  .bento-large,
  .bento-medium,
  .bento-small {
    grid-column: span 1;
  }

  .cta-content {
    padding: 2rem;
  }

  .cta-content h2 {
    font-size: 1.75rem;
  }

  .cta-actions {
    flex-direction: column;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
