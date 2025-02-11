<script setup lang="ts">
import { onMounted } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const characterStore = useCharacterStore()
const { characters, loading, fetchingError } = storeToRefs(characterStore);

onMounted(() => {
  characterStore.fetchCharacters()
})

const goToDetails = (id) => {
  router.push(`/character/${id}`)
}
</script>

<template>
  <main>
    <h1>This is Character List view</h1>

    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
      @click="goToDetails(character.id)"
    />
  </main>
</template>
