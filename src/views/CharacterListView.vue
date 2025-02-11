<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
</script>

<template>
  <main>
    <h1>This is Character List view</h1>
    <CharacterCard msg="Character" />
    <RouterLink to="/character/1">Character 1</RouterLink>
  </main>
</template>
