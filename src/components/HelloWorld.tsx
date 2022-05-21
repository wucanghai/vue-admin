import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const helloWord = ref<string>('helloWord')
    return () => <div>{helloWord.value}</div>
  }
})
