<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="mySearch"><!-- v-model：获取该表单元素的value，需要在data中给他一个变量 -->
            </div>
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="data in movieList" :key="data.id">
                    <div class="img"><img :src="data.img.replace('w.h', '128.180')"></div>
                    <div class="info">
                        <p>
                          <span class="title">{{data.nm}}</span>
                          <span v-if="data.sc">{{data.sc}}</span>
                          <span v-else>暂无评分</span>
                        </p>
                        <p class="title">{{data.enm}}</p>
                        <p>{{data.cat}}</p>
                        <p>{{data.rt}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      mySearch: '',
      movieList: []
    }
  },
  methods: {
    cancelRequest () { // axios防抖动定义的函数（需要复制）
      if (typeof this.source === 'function') {
        this.source('终止请求')
      }
    }
  },
  watch: { // watch是vue内部提供的一个用于侦听功能的更通用的方法，其用来响应数据的变化，通过特定的数据变化驱动一些操作。
    mySearch (newVal) { // mySearch是会发生数据变化的值，这里是v-model="mySearch"中的mySearch（也就是搜索框的value的变化）（newVal是默认带的参数，为input标签的value）
      // console.log(newVal)
      var that = this// axios防抖动（从这里开始复制）
      var cityId = parseInt(this.$store.state.city.id / 100000)
      console.log(cityId)
      this.cancelRequest()
      if (newVal === '') { // 标记a（这里是自定义的开始）
        this.movieList = ''
      } else {
        this.axios.get(`/ajax/search?kw=${newVal}&cityId=${cityId}&stype=-1`, { // 但是这个函数实参不是自定义的，需要复制（开始）
          cancelToken: new this.axios.CancelToken(function (c) {
            that.source = c
          })// 但是这个函数实参不是自定义的，需要复制（结束）
        }).then(res => {
          this.movieList = res.data.movies.list
          console.log(this.movieList)// 标记a（这里是自定义的结束）
        }).catch((err) => { // catch不是自定义
          if (this.axios.isCancel(err)) {
            console.log('Rquest canceled', err.message) // 请求如果被取消，这里是返回取消的message
          } else {
            // handle error
            console.log(err)
          }
        })
      }// axios防抖动（这里结束）
    }
  }
}
</script>

<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1){display: flex;justify-content: space-between;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
.search_body .info .title{max-width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
</style>
