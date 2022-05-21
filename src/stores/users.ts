import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('Users', () => {
  const userToken = ref<string>('')
  const userName = ref<string>('')

  const updateUserToken = (token: string) => {
    userToken.value = token
  }

  const updateUserName = (name: string) => {
    userName.value = name
  }

  return { userToken, userName, updateUserName, updateUserToken }
})
