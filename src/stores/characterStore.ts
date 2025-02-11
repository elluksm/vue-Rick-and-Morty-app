import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character, CharactersApiResponse } from '@/types/Character'
import axios from 'axios'

export const useCharacterStore = defineStore('characterStore', () => {
  const characters = ref<Character[]>([])
  const nextPageUrl = ref<string | null>('https://rickandmortyapi.com/api/character')
  const loading = ref(false)
  const fetchingError = ref(false)

  const fetchCharacters = async () => {
    if (loading.value || !nextPageUrl.value) return
    loading.value = true
    fetchingError.value = false

    try {
      const response = await axios.get<CharactersApiResponse>(nextPageUrl.value)
      characters.value.push(...response.data.results)

      console.log(response.data)

      // Update nextPageUrl with new "next" link
      nextPageUrl.value = response.data.info.next
    } catch (error) {
      console.error('Error fetching characters:', error)
      fetchingError.value = true
    } finally {
      loading.value = false // Ensures loading is always reset
    }
  }

  return { characters, loading, fetchingError, fetchCharacters }
})
