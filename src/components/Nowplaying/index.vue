<template>
    <div class="movie_body">
      <loading v-if="isLoding"></loading>
      <ul v-else ref="myUl">
        <li class="pullDown">{{pullDownMsg}}</li>
        <li @click="handaleToDetail(data.filmId)" v-for="data in nowlist" :key="data.filmId">
          <div class="pic_show"><img :src="data.poster"></div>
          <div class="info_list">
              <div class="title">
                <h2>{{data.name}}</h2>
                <div v-if="data.filmType.name">{{data.filmType.name}}</div>
              </div>
              <p v-if="data.grade">观众评分 <span class="grade">{{data.grade}}</span></p>
              <p v-else>观众评分：暂无评分</p>
              <p v-if="data.actors">主演: <span v-for="(actorName, index) in data.actors" :key="index">{{actorName.name}},</span></p>
              <p v-else>暂无主演</p>
              <p v-if="data.category">{{data.category.replace(/\|/g, ' | ')}}</p>
              <p v-else>暂时无法分类</p>
          </div>
          <div class="btn_mall" v-if="data.isPresale">
              购票
          </div>
          <div class="btn_pre" v-else>
            预售
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
// import Vue from 'vue'
// Vue.filter('versionReplace', (data) => {
//   data = data.replace('v', '')
//   data = data.replace('d', 'D')
//   return data
// })

import BScroll from 'better-scroll'

export default {
  name: 'Nowplaying',
  data () {
    return {
      nowlist: [],
      pullDownMsg: '',
      // pullUpMsg: '',
      isLoding: true,
      prevCityId: -1,
      total: 0,
      current: 1,
      cityId: 0
    }
  },
  methods: {
    handaleToDetail (id) {
      this.$router.push(`/movie/detail/1/${id}`)// id主要是为了传参用的（需要在其他的组件相互配合，具体查看movie的route路径文件和vue组件文件）
      // this.$router.push({ name: 'kerwindetail', params: { id: id } })// 这是另外一种动态路由写法（写法b）去route文件中找对应的写法
    }

    // 这个有用，但是公共组件出问题了
    // handaleToScroll (pos) {
    //   if (pos.y > 10) {
    //     this.pullDownMsg = '正在更新中'
    //   }
    // },
    // handaleToTouchEnd (pos) {
    //   if (pos.y > 30) {
    //     this.axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=2329E2404B2611EB8159730124A21DCCC549973F69D54484BB80CF47A318031F&optimus_risk_level=71&optimus_code=10').then(res => {
    //       this.pullDownMsg = '更新成功'
    //       setTimeout(() => {
    //         this.nowlist = res.data.movieList
    //         this.pullDownMsg = ''
    //       }, 1000)
    //     })
    //   }
    // }
  },

  activated () {
    this.cityId = this.$store.state.city.id
    if (this.prevCityId === this.cityId) {
      return
    }
    this.isLoding = true

    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=7598523`,
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"${this.cityId}"}`,
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.nowlist = res.data.data.films
      this.total = res.data.data.total
      console.log(this.total)
      this.isLoding = false
      this.prevCityId = this.cityId
      // console.log(this.nowlist)
      this.$nextTick(() => { // vue提供的回调函数：在上面数据渲染完后，才会执行的回调函数 $nextTick()
        var scroll = new BScroll('.movie_body', { // 这是另外一种引入方法，通过ref获取元素节点，官方文档是通过class引入这里引入的是'.movie_body'
          click: true,
          probeType: 1
        })
        scroll.on('scroll', (pos) => {
          // console.log(pos)// pos（自带的实参，是滑动的对象，有x， y两个属性）
          if (pos.y > 10) {
            this.pullDownMsg = '正在更新中'
          }
        })
        scroll.on('touchEnd', (pos) => {
          // console.log('touchend')
          if (pos.y > 30) {
            this.axios({
              url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=7598523`,
              headers: {
                'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"${this.cityId}"}`,
                'X-Host': 'mall.film-ticket.film.list'
              }
            }).then(res => {
              console.log(this.cityId)
              this.pullDownMsg = '更新成功'
              setTimeout(() => {
                this.nowlist = res.data.data.films
                this.total = res.data.total
                this.current = 1
                this.pullDownMsg = ''
                scroll.refresh()
              }, 1000)
            })
          } else {
            if (this.nowlist.length !== this.total) {
              this.current++
              this.axios({
                url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=1844767`,
                headers: {
                  'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"${this.cityId}"}`,
                  'X-Host': 'mall.film-ticket.film.list'
                }
              }).then((res) => {
                this.nowlist = [...this.nowlist, ...res.data.data.films]
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
    .movie_body ul .pullDown{margin: 0;padding: 0;border: none;}
    .movie_body ul .pullUp{margin: 0;padding: 0;border: none;}
    .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
    .movie_body .pic_show{ width:64px; height: 90px;}
    .movie_body .pic_show img{ width:100%;}
    .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
    .movie_body .info_list .title{display: flex;align-items: center;}
    .movie_body .title div{height: 16px;background: #509fc9;color: white;line-height: 16px;text-align: center;font-size: 14px;border-radius: 3px;margin-left: 5px;padding: 0 3px;}
    .movie_body .info_list h2{ font-size: 17px; line-height: 24px; max-width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
    .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
    .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
    .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
    .movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
