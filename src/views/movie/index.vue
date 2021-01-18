<template>
    <div id="main">
      <heoder title="鱼生电影"></heoder>
      <div id="content">
        <div class="movie_menu">
          <router-link class="city_name" tag="div" to="/movie/city">
            <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
          </router-link>
          <div class="hot_swtich">
            <router-link class="hot_item" tag="div" to="/movie/nowplaying">正在热映</router-link>
            <router-link class="hot_item" tag="div" to="/movie/comingsoon">即将上映</router-link>
          </div>
          <router-link class="search_entry" tag="div" to="/movie/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <tabbar></tabbar>
    </div>
</template>

<script>
import heoder from '@/components/heoder'
import tabbar from '@/components/tabbar'
import { messageBox } from '@/components/JS'

export default {
  name: 'movie',
  components: {
    heoder,
    tabbar
  },
  mounted () {
    var cityNm = this.$store.state.city.nm

    var self = this

    setTimeout(() => { // setTimeout下this指向会改变
      messageBox({
        title: '定位',
        content: cityNm,
        cancel: '取消',
        ok: '切换定位',
        handleOk () {
          console.log(2)
          self.$router.push('/movie/city')
        }
      })
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
  #content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
  .movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
  .movie_menu .city_name span{max-width: 40px;overflow: hidden; white-space: nowrap; text-overflow:ellipsis;display: block;float: left;}
  .movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
  .movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
  .movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
  .movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry i{  font-size:24px; color:red;}
</style>
