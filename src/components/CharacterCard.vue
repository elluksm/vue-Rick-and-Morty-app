<script setup lang="ts">
import type { Character } from '@/types/Character'

defineProps<{
  character: Character
}>()
</script>

<template>
  <div>
    <h1>{{ character.name }}</h1>
  </div>
</template>

<style scoped></style>
