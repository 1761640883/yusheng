<template>
    <!-- 全文失败：出了问题：滑动除非从pc端转到移动端才会触发better-scroll，否则失效。其他部件有效 -->
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroller',
  props: {
    handleToScroll: {
      type: Function,
      default: function () {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function () {}
    }
  },
  mounted () {
    var scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    })

    this.scroll = scroll

    scroll.on('scroll', (pos) => {
      this.handleToScroll(pos)
    })

    scroll.on('touchEnd', (pos) => {
      this.handleToTouchEnd(pos)
    })
  },
  methods: {
    toScrollTop (y) {
      this.scroll.scrollTo(0, y)
    }
  }
}
</script>

<style scoped>
    .wrapper{ height:100%;}
</style>
