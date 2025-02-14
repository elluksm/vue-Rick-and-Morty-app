<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const characterStore = useCharacterStore()
const scrollContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  // Fetch characters only when the component is mounted first time
  if (!characterStore.characters.length) {
    characterStore.fetchCharacters()
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const element = scrollContainer.value
  if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
    characterStore.fetchCharacters()
  }
}

const goToDetails = (id: number) => {
  router.push(`/character/${id}`)
}
</script>

<template>
  <main class="p-16 md:p-20 lg:p-30">
    <div class="max-w-300 mx-auto">
      <div
        ref="scrollContainer"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8"
      >
        <CharacterCard
          v-for="character in characterStore.characters"
          :key="character.id"
          :character="character"
          @click="goToDetails(character.id)"
          class="cursor-pointer hover:scale-105 hover:-translate-y-1 transition ease-in-out duration-300"
        />
      </div>
      <div v-if="characterStore.loading" class="loading-spinner mx-auto"></div>
      <p v-if="characterStore.fetchCharactersError">
        Oops! Looks like the portal glitched! Check your connection and try again.
      </p>
    </div>
  </main>
</template>
