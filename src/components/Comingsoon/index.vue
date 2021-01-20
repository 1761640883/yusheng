<template>
    <div class="movie_body" ref="movie_body">
      <loading v-if="isLoading"></loading>
      <ul v-else ref="myUl">
          <li v-for="data in datalist" :key="data.filmId" @click="handaleToDetail(data.filmId)">
              <div class="pic_show"><img :src="data.poster"></div>
              <div class="info_list">
                  <div class="title">
                    <h2>{{data.name}}</h2>
                    <div v-if="data.filmType.name">{{data.filmType.name}}</div>
                  </div>
                  <p><span class="grade">{{data.filmId}}</span>人想看</p>
                  <p v-if="data.actors">主演: <span v-for="(actorsName, index) in data.actors" :key="index">{{actorsName.name}},</span></p>
                  <p v-else>暂无主演</p>
                  <p v-if="data.category">{{data.category.replace(/\|/g, ' | ')}}</p>
                  <p v-else>暂时无法分类</p>
              </div>
              <div class="btn_pre" v-if="data.isPresale">
                  预售
              </div>
              <div class="btn_see" v-else>
                  想看
              </div>
          </li>
      </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Comingsoon',
  data () {
    return {
      datalist: [],
      isLoading: true,
      prevCityId: -1,
      current: 1,
      total: 0
    }
  },
  methods: {
    handaleToDetail (id) {
      this.$router.push(`/movie/detail/2/${id}`)
    }
  },
  activated () {
    var cityId = this.$store.state.city.id
    if (this.prevCityId === cityId) {
      return
    }
    this.isLoading = true
    // console.log('123')

    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=2&k=2946394`,
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"${cityId}"}`,
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.datalist = res.data.data.films
      this.total = res.data.data.total
      console.log(this.datalist)
      this.isLoading = false
      this.prevCityId = cityId
      this.$nextTick(() => {
        var scroll = new BScroll(this.$refs.movie_body, { // 这是另外一种引入方法，通过ref获取元素节点，官方文档是通过class引入这里引入的是'.movie_body'
          click: true,
          probeType: 1
        })
        scroll.on('touchEnd', (pos) => {
          if (pos.y < -30) {
            if (this.datalist.length !== this.total) {
              this.current++
              this.axios({
                url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${this.current}&pageSize=10&type=2&k=3277277`,
                headers: {
                  'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"${cityId}"}`,
                  'X-Host': 'mall.film-ticket.film.list'
                }
              }).then(res => {
                this.datalist = [...this.datalist, ...res.data.data.films]
              })
            }
            this.$nextTick(() => {
              scroll.refresh()// 当内容发生变化时，要重新计算 BetterScroll，不然会导致滚动效果异常
            })
          }
        })
      })
    })
  }
}
</script>

<style scoped>
    #content .movie_body{ flex:1; overflow:auto;}
    .movie_body ul{ margin:0 12px; overflow: hidden;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list .title{display: flex;align-items: center;}
    .movie_body .title div{height: 16px;width: 24px;background: #509fc9;color: white;line-height: 15px;text-align: center;font-size: 14px;border-radius: 3px;margin-left: 5px;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; max-width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
    .movie_body .btn_mall , .movie_body .btn_pre, .movie_body .btn_see{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
    .movie_body .btn_see{background-color:orange;}
</style>
