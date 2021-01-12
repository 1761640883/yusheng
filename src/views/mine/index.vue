<template>
    <div id="main">
        <Header title="我的鱼生"></Header>
        <div id="conten">
          <router-view></router-view>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import Header from '@/components/header'
import tabbar from '@/components/tabbar'

export default {
  name: 'mine',
  components: {
    Header,
    tabbar
  }
}
</script>

<style lang="scss" scoped>

</style>
