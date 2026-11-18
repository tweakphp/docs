import { ref } from 'vue'

const REPO = 'tweakphp/tweakphp'
const STORAGE_KEY = 'tweakphp_stars'
const LAST_KNOWN_KEY = 'tweakphp_stars_last'
const TTL = 60 * 60 * 1000

// Baked at build time by vite.define in config.mts — the pill always
// has something to show, even when the client-side fetch is
// rate-limited or the visitor has never fetched successfully
const BUILD_FALLBACK =
  typeof __GITHUB_STARS_FALLBACK__ === 'number' && __GITHUB_STARS_FALLBACK__ > 0
    ? __GITHUB_STARS_FALLBACK__
    : null

// Module-level state — every consumer shares the same value and a single
// in-flight request, even when several components mount at once.
const stars = ref(BUILD_FALLBACK)
let inFlight = null

const fetchStars = () => {
  if (inFlight) return

  if (typeof localStorage !== 'undefined') {
    try {
      const cached = localStorage.getItem(STORAGE_KEY)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (typeof data === 'number' && data > 0) {
          if (Date.now() - timestamp < TTL) {
            // Fresh cache — no request needed
            stars.value = data
            return
          }
          // Expired cache — still a real count once fetched: show it
          // now, the request below refreshes it if the API allows
          stars.value = data
        }
      }
      // Last-known value from a previous session
      const last = localStorage.getItem(LAST_KNOWN_KEY)
      if (last && !Number.isNaN(Number(last)) && Number(last) > 0) {
        stars.value = Number(last)
      }
    } catch {}
  }

  inFlight = fetch(`https://api.github.com/repos/${REPO}`)
    .then((res) => res.json())
    .then((data) => {
      if (data && typeof data.stargazers_count === 'number') {
        stars.value = data.stargazers_count
        if (typeof localStorage !== 'undefined') {
          try {
            const payload = JSON.stringify({ data: data.stargazers_count, timestamp: Date.now() })
            localStorage.setItem(STORAGE_KEY, payload)
            localStorage.setItem(LAST_KNOWN_KEY, String(data.stargazers_count))
          } catch {}
        }
      }
    })
    .catch(() => {})
    .finally(() => {
      inFlight = null
    })
}

/** Compact label — 12700 → "12.7k", 842 → "842" */
const format = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n))

export function useGithubStars() {
  return { stars, fetchStars, format, REPO }
}
