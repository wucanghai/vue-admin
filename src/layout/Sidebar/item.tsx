import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    // const icon = props.icon
    const title = props.title
    const slots = context.slots
    return {
      title,
      slots
    }
  },
  render() {
    return (
      <>
        <span>{this.title}</span>
      </>
    )
  }
})
