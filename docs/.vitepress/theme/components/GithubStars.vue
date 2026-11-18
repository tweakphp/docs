<script setup>
import { onMounted } from 'vue'
import { useGithubStars } from '../composables/useGithubStars'

const { stars, fetchStars, format, REPO } = useGithubStars()

onMounted(fetchStars)
</script>

<template>
  <a
    v-if="stars !== null"
    class="github-stars"
    :href="`https://github.com/${REPO}`"
    target="_blank"
    rel="noopener"
    :aria-label="`${format(stars)} stars on GitHub`"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-.99-.96-.015-.96.915 0 1.545.84 1.77 1.245 1.05 1.815 2.73 1.305 3.39.99.105-.765.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.955 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.635-2.79 5.655-5.46 5.955.435.375.81 1.095.81 2.22 0 1.635-.015 2.955-.015 3.375 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
    <span class="count">{{ format(stars) }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="star">
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  </a>
</template>

<style scoped>
.github-stars {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  transition: border-color 0.25s, color 0.25s;
}

.github-stars:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.github-stars svg {
  display: block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.github-stars .count {
  font-variant-numeric: tabular-nums;
}
</style>
