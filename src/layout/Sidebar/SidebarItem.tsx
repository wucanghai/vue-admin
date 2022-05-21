import { defineComponent, ref, resolveDynamicComponent, h, DefineComponent } from 'vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import AppLink from '@/layout/Sidebar/link'
import SidebarItem from '@/layout/Sidebar/SidebarItem'
import Item from '@/layout/Sidebar/item'

import { ElIcon } from 'element-plus'
// types
import { IRoutesMeta } from '@/router/index'
export default defineComponent({
  name: 'SidebarItem',
  components: { AppLink, Item },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const item = props.item
    const isNest = props.isNest
    const basePath = props.basePath
    const onlyOneChild = ref<any>('')

    // 是否只有一个子集
    const hasOneShowingChild = (children = [], parent: any) => {
      const showingChildren = children.filter((item: IRoutesMeta) => {
        if (item.hidden) {
          return false
        }
        onlyOneChild.value = item
        return true
      })

      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, noShowingChildren: true }

        return true
      }

      return false
    }

    return {
      item,
      isNest,
      basePath,
      hasOneShowingChild,
      onlyOneChild
    }
  },
  render() {
    const iconCom = (icon: string) => {
      if (icon) {
        return h(resolveDynamicComponent(icon) as DefineComponent)
      }
    }

    // hidden 为true ，默认不展示，例如404，不展示在侧边栏
    if (!this.item.hidden) {
      const applink = () => {
        if (
          this.hasOneShowingChild(this.item.children, this.item) &&
          (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) &&
          !this.item.alwaysShow
        ) {
          return (
            <AppLink
              to={this.onlyOneChild.path}
              v-slots={{
                default: () => (
                  <ElMenuItem
                    index={this.onlyOneChild.path}
                    v-slots={{ title: () => <Item title={this.onlyOneChild.meta.title} /> }}
                  >
                    <ElIcon>{iconCom(this.onlyOneChild.meta.icon)}</ElIcon>
                  </ElMenuItem>
                )
              }}
            />
          )
        } else {
          return (
            <ElSubMenu
              index={this.item.path}
              popper-append-to-body
              v-slots={{
                title: () => (
                  <>
                    <ElIcon>{iconCom(this.item.meta.icon)}</ElIcon>
                    <Item title={this.item.meta.title} />
                  </>
                )
              }}
            >
              {this.item.children.map((route: any) => (
                <SidebarItem item={route} key={route.path} base-path={route.path} />
              ))}
            </ElSubMenu>
          )
        }
      }

      return applink()
    }
  }
})
