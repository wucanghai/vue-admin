import { defineComponent, ref, onMounted, watch } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
// types
import { useRoute, RouteLocationMatched, RouteRecordNormalized, useRouter } from 'vue-router'
// scss
import '@/components/Breadcrumb/index.scss'

export default defineComponent({
  setup() {
    let levelList = ref<RouteLocationMatched[]>([])
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
      getBreadcrumb()
    })

    watch(
      () => router.currentRoute.value.path,
      () => {
        getBreadcrumb()
      }
    )

    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched = route.matched.filter((item) => item.meta && item.meta.title)
      const first = matched[0]

      if (!isDashboard(first)) {
        matched.unshift({ ...first, path: '/home', meta: { title: 'home' } })
      }

      levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }

    const isDashboard = (route: RouteLocationMatched) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (name as string).trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
    }

    // 跳转
    const handleLink = (item: RouteRecordNormalized) => {
      const { path, redirect } = item
      if (redirect) {
        router.push(redirect as string)
      }

      router.push(path)
    }

    return { levelList, handleLink }
  },
  render() {
    // 路径是否可点击
    const noRedirect = (item: RouteRecordNormalized, index: number) => {
      return item.redirect === 'noRedirect' || index == this.levelList.length - 1
    }

    return (
      <ElBreadcrumb separator={'/'} class={'app-breadcrumb'}>
        {this.levelList.map((items, index) => (
          <ElBreadcrumbItem key={items.path}>
            {noRedirect(items, index) ? (
              <span class="no-redirect">{items.meta.title}</span>
            ) : (
              <a
                onClick={() => {
                  this.handleLink(items)
                }}
              >
                {items.meta.title}
              </a>
            )}
          </ElBreadcrumbItem>
        ))}
      </ElBreadcrumb>
    )
  }
})
