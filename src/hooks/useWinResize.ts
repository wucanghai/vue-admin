import { onBeforeMount, onBeforeUnmount, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

export default function useWinResize() {
  const appStore = useAppStore()
  const route = useRoute()
  const { closeSideBar, toggleDevice } = appStore
  const { device, opened } = storeToRefs(appStore)

  const WIDTH = 992

  watch(
    () => route.path,
    () => {
      if (device.value === 'mobile' && opened.value) {
        closeSideBar(false)
      }
    }
  )

  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      toggleDevice(isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        closeSideBar(true)
      }
    }
  }

  const $_isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })

  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      toggleDevice(isMobile ? 'mobile' : 'desktop')
      closeSideBar(true)
    }
  })
}
