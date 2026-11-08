import {defineConfig} from 'vitepress'
import fetch from "node-fetch";

let version = 'beta';
let changelog = '';
let stars = 0;

// Fallbacks above are kept when GitHub is unreachable or rate-limited
// (its error pages are HTML, which would otherwise crash the config —
// and with it the dev server and every build).
try {
  const response = await fetch('https://api.github.com/repos/tweakphp/tweakphp');
  if (response.ok) {
    const data: any = await response.json();
    if (typeof data?.stargazers_count === 'number') {
      stars = data.stargazers_count;
    }
  }
} catch {}

try {
  const response = await fetch('https://api.github.com/repos/tweakphp/tweakphp/releases/latest');
  if (response.ok) {
    const data: any = await response.json();
    if (typeof data?.tag_name === 'string') {
      version = data.tag_name;
      changelog = typeof data.html_url === 'string' ? data.html_url : '';
    }
  }
} catch {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "TweakPHP",
  description: "Easily tweak your PHP code",
  // Baked into the bundle so the GitHub stars pill always has a value,
  // even when the client-side API fetch is rate-limited
  vite: {
    define: {
      __GITHUB_STARS_FALLBACK__: JSON.stringify(stars),
    },
  },
  head: [
    // Random accent on every page load, applied BEFORE the first paint
    // (no flash of the previous/default palette). The value is stored so
    // the hero screenshot and swatches agree with the applied palette;
    // the ids list must stay in sync with ACCENTS in HomePage.vue.
    [
      'script',
      {},
      "try{var ids=['dracula','nord','monokai','github-light','catppuccin','night-owl','rose-pine','ultra-dark'];var a=ids[Math.floor(Math.random()*ids.length)];localStorage.setItem('tweakphp_accent',a);document.documentElement.setAttribute('data-accent',a)}catch(e){}",
    ],
    // [
    //   'script',
    //   {
    //     src: 'https://www.googletagmanager.com/gtag/js?id=G-9N4ER7K7M6',
    //   },
    // ],
    // [
    //   'script',
    //   {},
    //   "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-9N4ER7K7M6');",
    // ]
  ],
  themeConfig: {
    logo: "/icon.png",

    nav: [
      {
        text: 'Docs',
        items: [
          {text: 'Get Started', link: '/getting-started/introduction'},
          {text: 'Installation', link: '/getting-started/installation'},
        ]
      },
      {
        text: version,
        items: [
          {text: 'Changelog', link: changelog},
          {text: 'Contribute', link: '/prologue/contribution-guide'},
        ]
      }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: 'DHNQBJ81R2',
        apiKey: '0f2511abdffcfeca4792b249b6baf752',
        indexName: 'tweakphp',
      }
    },

    sidebar: [
      {
        text: 'Prologue',
        items: [
          {text: 'Contribution Guide', link: '/prologue/contribution-guide'}
        ]
      },
      {
        text: 'Getting Started',
        items: [
          {text: 'Introduction', link: '/getting-started/introduction'},
          {text: 'Installation', link: '/getting-started/installation'},
          {text: 'Settings', link: '/getting-started/settings'},
        ]
      },
      {text: 'Start Tweaking', link: '/start'},
      {text: 'Docker', link: '/docker'},
      {text: 'Kubernetes', link: '/kubernetes'},
      {text: 'SSH', link: '/ssh'},
      {text: 'Vapor', link: '/vapor'},
      {text: 'MCP Server', link: '/mcp-server'},
      {text: 'Client Library', link: '/client'},
      {text: 'Custom Loaders', link: '/custom-loaders'},
    ],
    socialLinks: [],
    footer: {
      message: 'Made with ❤️',
      copyright: 'Copyright © 2024-present David Galet, Saeed Vaziry and TweakPHP contributors',
    }
  }
})
