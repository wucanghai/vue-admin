import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

import '@/layout/Appmain/index.scss'

export default defineComponent({
  setup() {
    const pathkey = computed(() => {
      return useRoute().path
    })

    return { pathkey }
  },
  render() {
    return (
      <section class={'app-main'}>
        {/* <Transition name="fade-transform" mode="out-in"> */}
        <router-view key={this.pathkey} />
        {/* </Transition> */}
      </section>
    )
  }
})
