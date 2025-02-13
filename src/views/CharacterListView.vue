<script setup lang="ts">
import { onMounted } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const router = useRouter()
const characterStore = useCharacterStore()

onMounted(() => {
  // Fetch characters only when the component is mounted first time
  if (!characterStore.characters.length) {
    characterStore.fetchCharacters()
  }
})

const goToDetails = (id) => {
  router.push(`/character/${id}`)
}
</script>

<template>
  <main class="p-16 md:p-20 lg:p-30">
    <div class="max-w-300 mx-auto">
      <p v-if="characterStore.loading">Loading...</p>
      <p v-if="characterStore.fetchCharactersError">
        Oops! Looks like the portal glitched! Check your connection and try again.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8">
        <CharacterCard
          v-for="character in characterStore.characters"
          :key="character.id"
          :character="character"
          @click="goToDetails(character.id)"
        />
      </div>
    </div>
  </main>
</template>
