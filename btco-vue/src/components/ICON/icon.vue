<template>
    <svg
        :class="svgClass"
        aria-hidden="true"
        v-on="$listeners"
    >
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>

export default {
  name: 'isIcon',
  props: {
    i: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    }
  },
  computed: {
    iconName() {
      return `#BTCO-${this.i}`
    },
    svgClass() {
      if (this.className) {
        return 'icon ' + this.i
      } else {
        return 'icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.i}) no-repeat 50% 50%`
      }
    }
  }
}
</script>