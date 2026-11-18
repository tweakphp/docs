// docs/.vitepress/config.mts
import { defineConfig } from "file:///Users/davidgalet/src/tries/2026-11-06-tweakphp-docs/node_modules/vitepress/dist/node/index.js";
import fetch from "file:///Users/davidgalet/src/tries/2026-11-06-tweakphp-docs/node_modules/node-fetch/src/index.js";
var version = "beta";
var changelog = "";
try {
  const response = await fetch("https://api.github.com/repos/tweakphp/tweakphp/releases/latest");
  if (response.ok) {
    const data = await response.json();
    if (typeof data?.tag_name === "string") {
      version = data.tag_name;
      changelog = typeof data.html_url === "string" ? data.html_url : "";
    }
  }
} catch {
}
var config_default = defineConfig({
  base: "/",
  title: "TweakPHP",
  description: "Easily tweak your PHP code",
  head: [
    // Restore the selected accent theme before hydration (no flash of
    // the default dracula palette for users who picked another theme).
    // Random per visit: users who explicitly picked an accent from the
    // swatches (tweakphp_accent_picked) always get theirs back; the ids
    // list must stay in sync with ACCENTS in HomePage.vue.
    [
      "script",
      {},
      "try{var p=localStorage.getItem('tweakphp_accent_picked')==='1';var a=localStorage.getItem('tweakphp_accent');var ids=['dracula','nord','monokai','github-light','catppuccin','night-owl','rose-pine','ultra-dark'];if(!p||!a||ids.indexOf(a)<0){a=ids[Math.floor(Math.random()*ids.length)];localStorage.setItem('tweakphp_accent',a)}if(/^[a-z-]+$/.test(a)){document.documentElement.setAttribute('data-accent',a)}}catch(e){}"
    ]
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
        text: "Docs",
        items: [
          { text: "Get Started", link: "/getting-started/introduction" },
          { text: "Installation", link: "/getting-started/installation" }
        ]
      },
      {
        text: version,
        items: [
          { text: "Changelog", link: changelog },
          { text: "Contribute", link: "/prologue/contribution-guide" }
        ]
      }
    ],
    search: {
      provider: "algolia",
      options: {
        appId: "DHNQBJ81R2",
        apiKey: "0f2511abdffcfeca4792b249b6baf752",
        indexName: "tweakphp"
      }
    },
    sidebar: [
      {
        text: "Prologue",
        items: [
          { text: "Contribution Guide", link: "/prologue/contribution-guide" }
        ]
      },
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/getting-started/introduction" },
          { text: "Installation", link: "/getting-started/installation" },
          { text: "Settings", link: "/getting-started/settings" }
        ]
      },
      { text: "Start Tweaking", link: "/start" },
      { text: "Docker", link: "/docker" },
      { text: "Kubernetes", link: "/kubernetes" },
      { text: "SSH", link: "/ssh" },
      { text: "Vapor", link: "/vapor" },
      { text: "MCP Server", link: "/mcp-server" },
      { text: "Client Library", link: "/client" },
      { text: "Custom Loaders", link: "/custom-loaders" }
    ],
    socialLinks: [],
    footer: {
      message: "Made with \u2764\uFE0F",
      copyright: "Copyright \xA9 2024-present David Galet & Saeed Vaziry & TweakPHP contributors"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGF2aWRnYWxldC9zcmMvdHJpZXMvMjAyNi0xMS0wNi10d2Vha3BocC1kb2NzL2RvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2RhdmlkZ2FsZXQvc3JjL3RyaWVzLzIwMjYtMTEtMDYtdHdlYWtwaHAtZG9jcy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGF2aWRnYWxldC9zcmMvdHJpZXMvMjAyNi0xMS0wNi10d2Vha3BocC1kb2NzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGVwcmVzcydcbmltcG9ydCBmZXRjaCBmcm9tIFwibm9kZS1mZXRjaFwiO1xuXG5sZXQgdmVyc2lvbiA9ICdiZXRhJztcbmxldCBjaGFuZ2Vsb2cgPSAnJztcblxuLy8gRmFsbGJhY2tzIGFib3ZlIGFyZSBrZXB0IHdoZW4gR2l0SHViIGlzIHVucmVhY2hhYmxlIG9yIHJhdGUtbGltaXRlZFxuLy8gKGl0cyBlcnJvciBwYWdlcyBhcmUgSFRNTCwgd2hpY2ggd291bGQgb3RoZXJ3aXNlIGNyYXNoIHRoZSBjb25maWcgXHUyMDE0XG4vLyBhbmQgd2l0aCBpdCB0aGUgZGV2IHNlcnZlciBhbmQgZXZlcnkgYnVpbGQpLlxudHJ5IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy90d2Vha3BocC90d2Vha3BocC9yZWxlYXNlcy9sYXRlc3QnKTtcbiAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgZGF0YTogYW55ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICh0eXBlb2YgZGF0YT8udGFnX25hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2ZXJzaW9uID0gZGF0YS50YWdfbmFtZTtcbiAgICAgIGNoYW5nZWxvZyA9IHR5cGVvZiBkYXRhLmh0bWxfdXJsID09PSAnc3RyaW5nJyA/IGRhdGEuaHRtbF91cmwgOiAnJztcbiAgICB9XG4gIH1cbn0gY2F0Y2gge31cblxuLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogJy8nLFxuICB0aXRsZTogXCJUd2Vha1BIUFwiLFxuICBkZXNjcmlwdGlvbjogXCJFYXNpbHkgdHdlYWsgeW91ciBQSFAgY29kZVwiLFxuICBoZWFkOiBbXG4gICAgLy8gUmVzdG9yZSB0aGUgc2VsZWN0ZWQgYWNjZW50IHRoZW1lIGJlZm9yZSBoeWRyYXRpb24gKG5vIGZsYXNoIG9mXG4gICAgLy8gdGhlIGRlZmF1bHQgZHJhY3VsYSBwYWxldHRlIGZvciB1c2VycyB3aG8gcGlja2VkIGFub3RoZXIgdGhlbWUpLlxuICAgIC8vIFJhbmRvbSBwZXIgdmlzaXQ6IHVzZXJzIHdobyBleHBsaWNpdGx5IHBpY2tlZCBhbiBhY2NlbnQgZnJvbSB0aGVcbiAgICAvLyBzd2F0Y2hlcyAodHdlYWtwaHBfYWNjZW50X3BpY2tlZCkgYWx3YXlzIGdldCB0aGVpcnMgYmFjazsgdGhlIGlkc1xuICAgIC8vIGxpc3QgbXVzdCBzdGF5IGluIHN5bmMgd2l0aCBBQ0NFTlRTIGluIEhvbWVQYWdlLnZ1ZS5cbiAgICBbXG4gICAgICAnc2NyaXB0JyxcbiAgICAgIHt9LFxuICAgICAgXCJ0cnl7dmFyIHA9bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3R3ZWFrcGhwX2FjY2VudF9waWNrZWQnKT09PScxJzt2YXIgYT1sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndHdlYWtwaHBfYWNjZW50Jyk7dmFyIGlkcz1bJ2RyYWN1bGEnLCdub3JkJywnbW9ub2thaScsJ2dpdGh1Yi1saWdodCcsJ2NhdHBwdWNjaW4nLCduaWdodC1vd2wnLCdyb3NlLXBpbmUnLCd1bHRyYS1kYXJrJ107aWYoIXB8fCFhfHxpZHMuaW5kZXhPZihhKTwwKXthPWlkc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqaWRzLmxlbmd0aCldO2xvY2FsU3RvcmFnZS5zZXRJdGVtKCd0d2Vha3BocF9hY2NlbnQnLGEpfWlmKC9eW2Etei1dKyQvLnRlc3QoYSkpe2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWNjZW50JyxhKX19Y2F0Y2goZSl7fVwiLFxuICAgIF0sXG4gICAgLy8gW1xuICAgIC8vICAgJ3NjcmlwdCcsXG4gICAgLy8gICB7XG4gICAgLy8gICAgIHNyYzogJ2h0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9Ry05TjRFUjdLN002JyxcbiAgICAvLyAgIH0sXG4gICAgLy8gXSxcbiAgICAvLyBbXG4gICAgLy8gICAnc2NyaXB0JyxcbiAgICAvLyAgIHt9LFxuICAgIC8vICAgXCJ3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcXG5mdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9XFxuZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcXG5ndGFnKCdjb25maWcnLCAnRy05TjRFUjdLN002Jyk7XCIsXG4gICAgLy8gXVxuICBdLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxvZ286IFwiL2ljb24ucG5nXCIsXG5cbiAgICBuYXY6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0RvY3MnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHt0ZXh0OiAnR2V0IFN0YXJ0ZWQnLCBsaW5rOiAnL2dldHRpbmctc3RhcnRlZC9pbnRyb2R1Y3Rpb24nfSxcbiAgICAgICAgICB7dGV4dDogJ0luc3RhbGxhdGlvbicsIGxpbms6ICcvZ2V0dGluZy1zdGFydGVkL2luc3RhbGxhdGlvbid9LFxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiB2ZXJzaW9uLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHt0ZXh0OiAnQ2hhbmdlbG9nJywgbGluazogY2hhbmdlbG9nfSxcbiAgICAgICAgICB7dGV4dDogJ0NvbnRyaWJ1dGUnLCBsaW5rOiAnL3Byb2xvZ3VlL2NvbnRyaWJ1dGlvbi1ndWlkZSd9LFxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSxcblxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6ICdhbGdvbGlhJyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgYXBwSWQ6ICdESE5RQko4MVIyJyxcbiAgICAgICAgYXBpS2V5OiAnMGYyNTExYWJkZmZjZmVjYTQ3OTJiMjQ5YjZiYWY3NTInLFxuICAgICAgICBpbmRleE5hbWU6ICd0d2Vha3BocCcsXG4gICAgICB9XG4gICAgfSxcblxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1Byb2xvZ3VlJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7dGV4dDogJ0NvbnRyaWJ1dGlvbiBHdWlkZScsIGxpbms6ICcvcHJvbG9ndWUvY29udHJpYnV0aW9uLWd1aWRlJ31cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dldHRpbmcgU3RhcnRlZCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge3RleHQ6ICdJbnRyb2R1Y3Rpb24nLCBsaW5rOiAnL2dldHRpbmctc3RhcnRlZC9pbnRyb2R1Y3Rpb24nfSxcbiAgICAgICAgICB7dGV4dDogJ0luc3RhbGxhdGlvbicsIGxpbms6ICcvZ2V0dGluZy1zdGFydGVkL2luc3RhbGxhdGlvbid9LFxuICAgICAgICAgIHt0ZXh0OiAnU2V0dGluZ3MnLCBsaW5rOiAnL2dldHRpbmctc3RhcnRlZC9zZXR0aW5ncyd9LFxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge3RleHQ6ICdTdGFydCBUd2Vha2luZycsIGxpbms6ICcvc3RhcnQnfSxcbiAgICAgIHt0ZXh0OiAnRG9ja2VyJywgbGluazogJy9kb2NrZXInfSxcbiAgICAgIHt0ZXh0OiAnS3ViZXJuZXRlcycsIGxpbms6ICcva3ViZXJuZXRlcyd9LFxuICAgICAge3RleHQ6ICdTU0gnLCBsaW5rOiAnL3NzaCd9LFxuICAgICAge3RleHQ6ICdWYXBvcicsIGxpbms6ICcvdmFwb3InfSxcbiAgICAgIHt0ZXh0OiAnTUNQIFNlcnZlcicsIGxpbms6ICcvbWNwLXNlcnZlcid9LFxuICAgICAge3RleHQ6ICdDbGllbnQgTGlicmFyeScsIGxpbms6ICcvY2xpZW50J30sXG4gICAgICB7dGV4dDogJ0N1c3RvbSBMb2FkZXJzJywgbGluazogJy9jdXN0b20tbG9hZGVycyd9LFxuICAgIF0sXG4gICAgc29jaWFsTGlua3M6IFtdLFxuICAgIGZvb3Rlcjoge1xuICAgICAgbWVzc2FnZTogJ01hZGUgd2l0aCBcdTI3NjRcdUZFMEYnLFxuICAgICAgY29weXJpZ2h0OiAnQ29weXJpZ2h0IFx1MDBBOSAyMDI0LXByZXNlbnQgRGF2aWQgR2FsZXQgJiBTYWVlZCBWYXppcnkgJiBUd2Vha1BIUCBjb250cmlidXRvcnMnLFxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1gsU0FBUSxvQkFBbUI7QUFDalosT0FBTyxXQUFXO0FBRWxCLElBQUksVUFBVTtBQUNkLElBQUksWUFBWTtBQUtoQixJQUFJO0FBQ0YsUUFBTSxXQUFXLE1BQU0sTUFBTSxnRUFBZ0U7QUFDN0YsTUFBSSxTQUFTLElBQUk7QUFDZixVQUFNLE9BQVksTUFBTSxTQUFTLEtBQUs7QUFDdEMsUUFBSSxPQUFPLE1BQU0sYUFBYSxVQUFVO0FBQ3RDLGdCQUFVLEtBQUs7QUFDZixrQkFBWSxPQUFPLEtBQUssYUFBYSxXQUFXLEtBQUssV0FBVztBQUFBLElBQ2xFO0FBQUEsRUFDRjtBQUNGLFFBQVE7QUFBQztBQUdULElBQU8saUJBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNSjtBQUFBLE1BQ0U7QUFBQSxNQUNBLENBQUM7QUFBQSxNQUNEO0FBQUEsSUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVlGO0FBQUEsRUFDQSxhQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFFTixLQUFLO0FBQUEsTUFDSDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBQyxNQUFNLGVBQWUsTUFBTSxnQ0FBK0I7QUFBQSxVQUMzRCxFQUFDLE1BQU0sZ0JBQWdCLE1BQU0sZ0NBQStCO0FBQUEsUUFDOUQ7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBQyxNQUFNLGFBQWEsTUFBTSxVQUFTO0FBQUEsVUFDbkMsRUFBQyxNQUFNLGNBQWMsTUFBTSwrQkFBOEI7QUFBQSxRQUMzRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTCxFQUFDLE1BQU0sc0JBQXNCLE1BQU0sK0JBQThCO0FBQUEsUUFDbkU7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsRUFBQyxNQUFNLGdCQUFnQixNQUFNLGdDQUErQjtBQUFBLFVBQzVELEVBQUMsTUFBTSxnQkFBZ0IsTUFBTSxnQ0FBK0I7QUFBQSxVQUM1RCxFQUFDLE1BQU0sWUFBWSxNQUFNLDRCQUEyQjtBQUFBLFFBQ3REO0FBQUEsTUFDRjtBQUFBLE1BQ0EsRUFBQyxNQUFNLGtCQUFrQixNQUFNLFNBQVE7QUFBQSxNQUN2QyxFQUFDLE1BQU0sVUFBVSxNQUFNLFVBQVM7QUFBQSxNQUNoQyxFQUFDLE1BQU0sY0FBYyxNQUFNLGNBQWE7QUFBQSxNQUN4QyxFQUFDLE1BQU0sT0FBTyxNQUFNLE9BQU07QUFBQSxNQUMxQixFQUFDLE1BQU0sU0FBUyxNQUFNLFNBQVE7QUFBQSxNQUM5QixFQUFDLE1BQU0sY0FBYyxNQUFNLGNBQWE7QUFBQSxNQUN4QyxFQUFDLE1BQU0sa0JBQWtCLE1BQU0sVUFBUztBQUFBLE1BQ3hDLEVBQUMsTUFBTSxrQkFBa0IsTUFBTSxrQkFBaUI7QUFBQSxJQUNsRDtBQUFBLElBQ0EsYUFBYSxDQUFDO0FBQUEsSUFDZCxRQUFRO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
