import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const pageName = ref<string>('this is home page')

    return () => (
      <div class="has" data-url="" style={{ padding: '20px' }}>
        {pageName.value}
      </div>
    )
  }
})
