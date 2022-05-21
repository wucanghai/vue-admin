import { createRouter, createWebHistory, RouterOptions } from 'vue-router'

// layout
import Layout from '@/layout'

export interface IRoutesMeta {
  title: string
  icon: string
  hidden?: true
}

export interface IRouteRecordRaw {
  hidden: boolean
}

// 配置路由
const routers: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/view/home'),
          meta: { title: 'home', icon: 'PieChart' }
        }
      ]
    },
    {
      path: '/nested',
      component: Layout,
      //redirect: '/nested/menu1',
      meta: { title: 'Nested', icon: 'Notebook' },
      children: [
        {
          path: '/menu1',
          name: 'menu1',
          component: () => import('@/view/nested/'),
          meta: { title: 'menu1', icon: '' },
          children: [
            {
              path: '/menu1-1',
              name: 'menu1-1',
              component: () => import('@/view/nested/menu1'),
              meta: { title: 'menu1-1', icon: '' },
              children: [
                {
                  path: '/menu1-1-1',
                  name: 'menu1-1-1',
                  component: () => import('@/view/nested/menu1/menu1-1/menu1-1-1'),
                  meta: { title: 'menu1-1-1', icon: '' }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/view/login'),
      hidden: true,
      meta: { title: 'login', icon: '' }
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/view/404'),
      hidden: true,
      meta: { title: '404', icon: '' }
    },
    { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
  ]
}

export default createRouter(routers)
