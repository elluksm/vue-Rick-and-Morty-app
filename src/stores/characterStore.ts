import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character, CharactersApiResponse } from '@/types/Character'
import axios from 'axios'

const characterApiUrl = 'https://rickandmortyapi.com/api/character'

export const useCharacterStore = defineStore('characterStore', () => {
  const characters = ref<Character[]>([])
  const nextPageUrl = ref<string | null>(characterApiUrl)
  const loading = ref(false)
  const fetchCharactersError = ref(false)
  const getCharacterError = ref(false)

  const fetchCharacters = async () => {
    if (loading.value || !nextPageUrl.value) return
    loading.value = true
    fetchCharactersError.value = false

    try {
      const response = await axios.get<CharactersApiResponse>(nextPageUrl.value)
      characters.value.push(...response.data.results)

      // Update nextPageUrl with new "next" link (for next pages of data)
      nextPageUrl.value = response.data.info.next
    } catch (error) {
      console.error('Error fetching characters:', error)
      fetchCharactersError.value = true
    } finally {
      loading.value = false // Ensures loading is always reset
    }
  }

  const getCharacterById = async (id: number) => {
    getCharacterError.value = false
    let character = characters.value.find((c) => c.id == id)
    if (!character) {
      loading.value = true
      try {
        const response = await axios.get(`${characterApiUrl}/${id}`)
        character = response.data
      } catch (err) {
        console.error('Error fetching character details:', err)
        getCharacterError.value = true
      } finally {
        loading.value = false
      }
    }
    return character
  }

  return {
    characters,
    loading,
    fetchCharactersError,
    getCharacterError,
    fetchCharacters,
    getCharacterById,
  }
})
