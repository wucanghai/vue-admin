import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const pageName = ref<string>('menu1-1')
    return {
      pageName
    }
  },
  render() {
    return (
      <>
        <div>{this.pageName}</div>
        <router-view />
      </>
    )
  }
})
