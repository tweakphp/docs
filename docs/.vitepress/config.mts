import {defineConfig} from 'vitepress'
import fetch from "node-fetch";

let version = 'beta';
let changelog = '';
await fetch('https://api.github.com/repos/tweakphp/tweakphp/releases/latest')
  .then(response => response.json()).then((data: any) => {
    version = data.tag_name;
    changelog = data.html_url;
  });

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "TweakPHP",
  description: "Easily tweak your PHP code",
  head: [
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
      {text: 'SSH', link: '/ssh'},
      {text: 'Client Library', link: '/client'},
    ],
    socialLinks: [
      {icon: 'github', link: 'https://github.com/tweakphp/tweakphp'},
      {icon: 'discord', link: 'https://discord.gg/Et3UTT4xwC'},
      {icon: 'twitter', link: 'https://twitter.com/saeed_vz'},
      {icon: 'youtube', link: 'https://www.youtube.com/@saeedvaziry'},
    ],
    footer: {
      message: 'Made with ❤️',
      copyright: 'Copyright © 2024-present Saeed Vaziry'
    }
  }
})
