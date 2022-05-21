import { defineComponent } from 'vue'
import { ElDropdown, ElDropdownItem, ElIcon } from 'element-plus'
import { useRouter } from 'vue-router'
import { CaretBottom } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// store
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useUsersStore } from '@/stores/users'

// scss
import '@/layout/Navbar/index.scss'

export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUsersStore()
    const router = useRouter()
    const { toggleSideBar } = appStore
    const { updateUserToken } = userStore
    const { opened } = storeToRefs(appStore)
    const { userName } = storeToRefs(userStore)

    const loginOut = () => {
      updateUserToken('')
      router.push('/login')
    }
    return {
      toggleSideBar,
      opened,
      userName,
      loginOut
    }
  },
  render() {
    return (
      <div class={'navbar'}>
        <Hamburger
          class={'hamburger-container'}
          isActive={this.opened}
          onToggleClick={this.toggleSideBar}
        />
        <Breadcrumb class={'breadcrumb-container'} />
        <div class="right-menu">
          <ElDropdown
            class="avatar-container"
            trigger="click"
            v-slots={{
              dropdown: () => (
                <>
                  <ElDropdownItem>
                    <router-link to={'/home'}>home</router-link>
                  </ElDropdownItem>
                  <ElDropdownItem>
                    <span onClick={this.loginOut}>login out</span>
                  </ElDropdownItem>
                </>
              )
            }}
          >
            <div class="avatar-wrapper">
              <img
                src={'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'}
                class="user-avatar"
              />
              <ElIcon>
                <CaretBottom />
              </ElIcon>
            </div>
          </ElDropdown>
          <div class="user-name">{this.userName}</div>
        </div>
      </div>
    )
  }
})
