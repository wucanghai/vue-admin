import { defineStore } from 'pinia'
import { ref } from 'vue'

type TDevice = 'desktop' | 'mobile'
export const useAppStore = defineStore('app', () => {
  // state
  const opened = ref<boolean>(true)
  const withoutAnimation = ref<boolean>(false)
  const device = ref<TDevice>('desktop')
  // actions
  const toggleSideBar = () => {
    opened.value = !opened.value
    withoutAnimation.value = false
  }

  const closeSideBar = (without_animation: boolean) => {
    opened.value = false
    withoutAnimation.value = without_animation
  }

  const toggleDevice = (device_v: TDevice) => {
    device.value = device_v
  }
  return {
    opened,
    withoutAnimation,
    toggleSideBar,
    closeSideBar,
    device,
    toggleDevice
  }
})
