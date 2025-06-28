<script setup>
import Theme from 'vitepress/theme'
import Contributors from "./components/Contributors.vue";

const { Layout } = Theme
</script>

<template>
  <Layout>
    <template #home-features-after>
      <div
        class="flex flex-col justify-center items-center w-full mt-10"
      >
        <h3 class="text-4xl! font-semibold! text-center mb-4">Contributors</h3>
        <Contributors />
      </div>
    </template>
  </Layout>
</template>