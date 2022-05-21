import { createApp } from 'vue'
import App from '@/App'
import router from '@/router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// element ui css
import 'element-plus/dist/index.css'

// global scss
import '@/styles/index.scss'

// permission
import '@/permission'

const app = createApp(App)

function boostrap() {
  app.use(router)

  app.use(createPinia())

  // element icon component
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.mount('#app')

  if (import.meta.env.DEV) {
    window.__APP__ = app
  }
}

boostrap()
