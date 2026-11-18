<script setup>
import { computed } from 'vue'

// Inline SVG sources — the icons use `currentColor`, so their color
// follows CSS and adapts to the selected accent theme automatically.
import local from '../assets/icons/local.svg?raw'
import docker from '../assets/icons/docker.svg?raw'
import kubernetes from '../assets/icons/kubernetes.svg?raw'
import ssh from '../assets/icons/ssh.svg?raw'
import ai from '../assets/icons/ai.svg?raw'
import lsp from '../assets/icons/lsp.svg?raw'
import framework from '../assets/icons/framework.svg?raw'
import vapor from '../assets/icons/vapor.svg?raw'
import mcp from '../assets/icons/mcp.svg?raw'
import mac from '../assets/icons/mac.svg?raw'
import linux from '../assets/icons/linux.svg?raw'
import windows from '../assets/icons/windows.svg?raw'

const icons = {
  local,
  docker,
  kubernetes,
  ssh,
  ai,
  lsp,
  framework,
  vapor,
  mcp,
  mac,
  linux,
  windows,
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

const markup = computed(() => icons[props.name] ?? '')
</script>

<template>
  <span
    class="app-icon"
    :style="{ width: `${size}px`, height: `${size}px` }"
    aria-hidden="true"
    v-html="markup"
  />
</template>

<style scoped>
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--hp-accent-500);
}

.dark .app-icon {
  color: var(--hp-accent-400);
}

.app-icon :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
