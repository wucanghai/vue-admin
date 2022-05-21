import router from '@/router'
import { useUsersStore } from '@/stores/users'
// white
const whiteList = ['/login']

let login_token: string = ''

router.beforeEach((to, from, next) => {
  const userStore = useUsersStore()
  const { userToken } = userStore

  login_token = userToken

  if (login_token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
