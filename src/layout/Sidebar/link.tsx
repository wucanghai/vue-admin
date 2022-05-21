import { defineComponent, computed, h } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const slots = context.slots
    const to = props.to

    const is_external = computed(() => {
      return isExternal(props.to)
    })

    const elType = computed(() => {
      if (is_external) {
        return 'a'
      }
      return 'router-link'
    })

    const linkProps = (to: string) => {
      if (isExternal(to)) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }

    return {
      slots,
      to,
      linkProps,
      elType
    }
  },
  render() {
    const slotDefault = this.slots?.default && this.slots.default()

    return h(this.elType, { ...this.linkProps(this.to) }, slotDefault)
  }
})
