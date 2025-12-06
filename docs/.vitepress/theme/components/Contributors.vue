<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const contributors = ref<any[]>([])

const CACHE_KEY = 'tweakphp_contributors'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

const fromRepo = (repo: string) =>
    fetch(`https://api.github.com/repos/tweakphp/${repo}/contributors`)
        .then((res) => res.json())
        .catch(() => [])

const getCachedData = () => {
  if (typeof localStorage === 'undefined') return null

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    const now = Date.now()

    if (now - timestamp < CACHE_DURATION) {
      return data
    }

    localStorage.removeItem(CACHE_KEY)
    return null
  } catch {
    return null
  }
}

const setCachedData = (data: any[]) => {
  if (typeof localStorage === 'undefined') return

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch {
    // Ignore storage errors
  }
}

const getContributors = async () => {
  const cached = getCachedData()

  if (cached) {
    contributors.value = cached
    return
  }

  const users = await Promise.all([
    fromRepo('tweakphp'),
    fromRepo('docs'),
    fromRepo('client'),
    fromRepo('.github'),
  ])

  const result = users
      .reduce((acc, data = []) => {
        if (!Array.isArray(data)) return acc
        return [...acc, ...data.filter(i => i.login)]
      }, [])
      .reduce((acc, user) => {
        const existingUser = acc.find(u => u.id === user.id)
        if (existingUser) {
          existingUser.contributions += user.contributions
          return acc
        }
        return [...acc, {
          id: user.id,
          username: user.login,
          contributions: user.contributions,
          avatar_url: user.avatar_url
        }]
      }, [])

  contributors.value = result
  setCachedData(result)
}

onMounted(() => {
  getContributors()
})
</script>

<template>
  <div class="text-lg text-center leading-7 my-10 px-5">
    <div class="flex flex-wrap gap-2">
      <a
          v-for="contributor of contributors"
          :key="contributor.id"
          v-tooltip="contributor.username"
          :href="`https://github.com/${contributor.username}`"
          :aria-label="contributor.username"
          rel="noopener noreferrer"
          target="_blank"
      >
        <img
            :src="contributor.avatar_url"
            :alt="contributor.username"
            :aria-label="contributor.username"
            loading="lazy"
            width="50"
            height="50"
            class="w-15 h-15 min-w-15 min-h-15 !rounded-full"
        />
      </a>
    </div>
  </div>
</template>