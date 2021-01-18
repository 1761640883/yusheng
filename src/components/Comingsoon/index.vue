<template>
    <div class="movie_body">
      <loading v-if="isLoading"></loading>
        <ul v-else>
            <li v-for="data in datalist" :key="data.id">
                <div class="pic_show"><img :src="data.img.replace('w.h', '128.180')"></div>
                <div class="info_list">
                    <div class="title">
                      <h2>{{data.nm}}</h2>
                      <div v-if="data.version">{{data.version | versionReplace}}</div>
                    </div>
                    <p><span class="grade">{{data.wish}}</span>人想看</p>
                    <p v-if="data.star">主演: {{data.star}}</p>
                    <p v-else>暂无主演</p>
                    <p>{{data.rt}}上映</p>
                </div>
                <div class="btn_pre" v-if="data.showst - 1">
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
import Vue from 'vue'
import BScroll from 'better-scroll'

Vue.filter('versionReplace', (data) => {
  data = data.replace('v', '')
  data = data.replace('d', 'D')
  return data
})

export default {
  name: 'Comingsoon',
  data () {
    return {
      datalist: [],
      isLoading: true,
      prevCityId: -1
    }
  },
  activated () {
    var cityId = this.$store.state.city.id
    if (this.prevCityId === cityId) {
      return
    }
    this.isLoading = true
    // console.log('123')

    this.axios.get('/ajax/comingList?ci=1&token=&limit=10&optimus_uuid=2329E2404B2611EB8159730124A21DCCC549973F69D54484BB80CF47A318031F&optimus_risk_level=71&optimus_code=10').then(res => {
      console.log(res.data.coming)
      this.datalist = res.data.coming
      this.isLoading = false
      this.prevCityId = cityId
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new BScroll('.movie_body', { // 这是另外一种引入方法，通过ref获取元素节点，官方文档是通过class引入这里引入的是'.movie_body'
          click: true
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
