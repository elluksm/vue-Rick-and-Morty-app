import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('characterStore', () => {
  const characters = ref([]);
  function fetchCharacters() {
   
  }

  return { characters, fetchCharacters }
})
