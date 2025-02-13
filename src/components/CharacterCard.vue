<script setup lang="ts">
import type { Character } from '@/types/Character'

defineProps<{
  character: Character
}>()
</script>

<template>
  <div class="rounded-lg overflow-hidden">
    <div>
      <img :src="character.image" :alt="character.name" />
    </div>
    <div>
      <p class="text-xl leading-9 font-semibold text-gray-900">{{ character.name }}</p>
      <div class="text-sm leading-5.5 font-light text-gray-500">
        <p>Status: {{ character.status }}</p>
        <p>Species: {{ character.species }}</p>
        <p>Gender: {{ character.gender }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
