<script setup>
import { useData } from 'vitepress'
import Theme from 'vitepress/theme'
import HomePage from "./components/HomePage.vue";

const { Layout } = Theme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <HomePage v-if="frontmatter.customHome" />
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
</style>