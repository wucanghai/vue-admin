import { defineComponent } from 'vue'

import Sidebar from '@/layout/Sidebar'
import Navbar from '@/layout/Navbar'
import AppMain from '@/layout/Appmain'

//store
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import useWinResize from '@/hooks/useWinResize'
// scss
import '@/layout/index.scss'

export default defineComponent({
  components: {
    Sidebar
  },
  setup() {
    // resise
    useWinResize()
    const appStore = useAppStore()
    const { closeSideBar } = appStore
    const { opened, withoutAnimation, device } = storeToRefs(appStore)
    return {
      opened,
      withoutAnimation,
      device,
      closeSideBar
    }
  },
  render() {
    const iSdrawerBg = this.device === 'mobile' && this.opened

    const sliderClass = {
      hideSidebar: !this.opened,
      openSidebar: this.opened,
      withoutAnimation: this.withoutAnimation,
      mobile: this.device === 'mobile'
    }

    return (
      <div class={['app-wrapper', sliderClass]}>
        {iSdrawerBg && <div class="drawer-bg" onClick={() => this.closeSideBar(false)} />}
        <Sidebar class={'sidebar-container'} />
        <div class="main-container">
          <div class={{ 'fixed-header': false }}>
            <Navbar />
          </div>
          <AppMain />
        </div>
      </div>
    )
  }
})
