<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useRoute } from 'vue-router'
import type { Character } from '@/types/Character'

const route = useRoute()
const characterStore = useCharacterStore()
const character = ref<Character>(null)

onMounted(async () => {
  character.value = await characterStore.getCharacterById(route.params.id)
})

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toISOString().split('T')[0]
}
</script>

<template>
  <div class="p-16 md:p-20 lg:p-30">
    <div class="max-w-300 mx-auto">
      <p v-if="characterStore.loading">Loading...</p>
      <p v-else-if="characterStore.getCharacterError">
        Whoops! This character slipped into another dimension. Try reloading to bring them back!
      </p>

      <div v-else-if="character" class="sm:flex mb-14">
        <div class="rounded-sm overflow-hidden">
          <img :src="character.image" :alt="character.name" />
        </div>
        <div class="sm:ml-6">
          <h1 class="text-xl leading-9 font-semibold text-gray-900">{{ character.name }}</h1>
          <div class="text-sm leading-5.5 font-light text-gray-500">
            <p>Characted Id: {{ character.id }}</p>
            <p>Species: {{ character.species }}</p>
            <p>Status: {{ character.status }}</p>
            <p>Gender: {{ character.gender }}</p>
            <p>Origin: {{ character.origin.name }}</p>
            <p>Location: {{ character.location.name }}</p>
            <p>Created Date: {{ formatDate(character.created) }}</p>
          </div>
        </div>
      </div>

      <RouterLink to="/" class="text-xl underline font-semibold">Back</RouterLink>
    </div>
  </div>
</template>

<style></style>
