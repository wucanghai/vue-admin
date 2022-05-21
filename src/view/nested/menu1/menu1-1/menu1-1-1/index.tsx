import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const pageName = ref<string>('nested1-1-1')
    return {
      pageName
    }
  },
  render() {
    return (
      <>
        <div>{this.pageName}</div>
      </>
    )
  }
})
