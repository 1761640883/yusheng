<template>
    <div id="main">
        <heoder title="我的鱼生"></heoder>
        <div id="conten">
          <router-view></router-view>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import heoder from '@/components/heoder'
import tabbar from '@/components/tabbar'

export default {
  name: 'mine',
  components: {
    heoder,
    tabbar
  }
}
</script>

<style lang="scss" scoped>

</style>
