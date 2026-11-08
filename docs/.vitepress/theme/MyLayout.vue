<script setup>
import { useData } from 'vitepress'
import Theme from 'vitepress/theme'
import HomePage from "./components/HomePage.vue";
import GithubStars from "./components/GithubStars.vue";

const { Layout } = Theme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <HomePage v-if="frontmatter.customHome" />
    </template>

    <!-- Star count pill next to the GitHub icon in the navbar -->
    <template #nav-bar-content-after>
      <GithubStars class="nav-bar-stars" />
    </template>

    <!-- Same pill, inside the mobile fullscreen menu -->
    <template #nav-screen-content-after>
      <div class="nav-screen-stars">
        <GithubStars />
      </div>
    </template>
  </Layout>
</template>

<style>
/* Hide default VitePress home content when using custom homepage */
.VPHome:has(+ .home-page),
.VPHome .VPHero,
.VPHome .VPFeatures {
  display: none !important;
}

/* When custom home is active, hide the default home layout elements */
[data-custom-home="true"] .VPHome > *:not(.home-page) {
  display: none !important;
}

/* Navbar star pill — VitePress hides the social icons below 768px, so
   the pill hides too and lives in the mobile menu screen instead */
.nav-bar-stars {
  margin-left: 8px;
}

@media (max-width: 767px) {
  .nav-bar-stars {
    display: none;
  }
}

/* Mobile menu star pill */
.nav-screen-stars {
  display: flex;
  padding: 12px 24px 0;
}

.nav-screen-stars .github-stars {
  height: 40px;
}
</style>
