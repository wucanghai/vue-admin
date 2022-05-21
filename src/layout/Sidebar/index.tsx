import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMenu } from 'element-plus'
import variables from '@/styles/variables.module.scss'
import SidebarItem from '@/layout/Sidebar/SidebarItem'

// store
import { useAppStore } from '@/stores/app'
export default defineComponent({
  components: {
    SidebarItem
  },
  setup() {
    let showLogo = ref<boolean>(false)
    const appStore = useAppStore()
    let isCollapse = computed(() => {
      return !appStore.opened
    })

    // 获取路由表
    const routes = computed(() => {
      return useRouter().options.routes
    })

    const activeMenu = computed(() => {
      const { currentRoute } = useRouter()
      const { meta, path } = currentRoute.value
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    return {
      showLogo,
      isCollapse,
      routes,
      activeMenu
    }
  },
  render() {
    return (
      <div class={this.showLogo ? 'has-logo' : ''}>
        <ElMenu
          default-active={this.activeMenu}
          collapse={this.isCollapse}
          unique-opened={false}
          collapse-transition={false}
          background-color={variables.menuBg}
          text-color={variables.menuText}
          active-text-color={variables.menuActiveText}
          router={true}
          mode={'vertical'}
        >
          {this.routes.map((items) => (
            <SidebarItem item={items} key={items.path} base-path={items.path} />
          ))}
        </ElMenu>
      </div>
    )
  }
})
