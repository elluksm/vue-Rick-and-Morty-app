<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useRoute } from 'vue-router'
import type { Character } from '@/types/Character'

const route = useRoute()
const characterStore = useCharacterStore()
const character = ref<Character | null>(null)

onMounted(async () => {
  const characterId = Number(route.params.id)
  if (characterId) {
    character.value = await characterStore.getCharacterById(characterId)
  }
})

const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toISOString().split('T')[0]
}
</script>

<template>
  <div class="p-16 md:p-20 lg:p-30">
    <div class="max-w-300 mx-auto">
      <div v-if="characterStore.loading" class="loading-spinner mx-auto"></div>
      <p v-else-if="characterStore.getCharacterError" class="mb-4">
        Whoops! This character slipped into another dimension. Try reloading to bring them back!
      </p>

      <div v-else-if="character" class="sm:flex mb-14">
        <div class="rounded-sm overflow-hidden">
          <img :src="character.image" :alt="character.name" />
        </div>
        <div class="sm:ml-6">
          <h1 class="text-xl leading-9 font-semibold text-gray-900">{{ character.name }}</h1>
          <div class="text-sm leading-5.5 font-light text-gray-500">
            <p>Characted Id: <span class="text-gray-900">{{ character.id }}</span></p>
            <p>Species: <span class="text-gray-900">{{ character.species }}</span></p>
            <p>Status: <span class="text-gray-900">{{ character.status }}</span></p>
            <p>Gender: <span class="text-gray-900">{{ character.gender }}</span></p>
            <p>Origin: <span class="text-gray-900">{{ character.origin.name }}</span></p>
            <p>Location: <span class="text-gray-900">{{ character.location.name }}</span></p>
            <p>Created Date: <span class="text-gray-900">{{ formatDate(character.created) }}</span></p>
          </div>
        </div>
      </div>

      <RouterLink to="/" class="text-xl underline font-semibold text-gray-900 hover:text-gray-500">Back</RouterLink>
    </div>
  </div>
</template>

<style></style>
