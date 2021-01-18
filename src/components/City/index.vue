<template>
    <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="data in hotCity" :key="data.cityId" @click="handToCity(data.name, data.cityId)">{{data.name}}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="data in datalist" :key="data.index">
                    <h2>{{data.index}}</h2>
                    <ul>
                        <li v-for="city in data.list" :key="city.cityId" @click="handToCity(city.name, city.cityId)">{{city.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(data, index) in datalist" :key="data.index" @click="handleToIndex(index)">{{data.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'city',
  data () {
    return {
      datalist: [],
      hotCity: []
    }
  },
  methods: {
    formatCityList (data) {
      var index = []
      for (var i = 65; i < 91; i++) {
        index.push(String.fromCharCode(i))
      }
      // console.log(index)
      var citylist = []
      // [{index: A,list:{cityId: 110100, name: "北京", pinyin: "beijing", isHot: 1}}]
      for (var j = 0; j < index.length; j++) {
        var listArr = data.filter(item => item.pinyin.substr(0, 1) === index[j].toLowerCase())
        // console.log(listArr)
        if (listArr.length !== 0) {
          citylist.push({ index: index[j], list: listArr })
        }
      }
      console.log(citylist)
      return citylist
    },
    formHotCity (data) {
      var HotCity = data.filter(item => item.isHot === 1)
      return HotCity
    },
    handleToIndex (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
    },
    handToCity (nm, id) {
      // console.log('sb')
      this.$store.commit('city/CITY_INFO', { nm, id })
      this.$router.push('/movie/nowplaying')
      localStorage.setItem('cityId', id)
      localStorage.setItem('cityName', nm)
    }
  },
  mounted () {
    var cityList = window.localStorage.getItem('cityList')
    var hotCity = window.localStorage.getItem('hotCity')

    if (cityList && hotCity) {
      this.datalist = JSON.parse(cityList)
      this.hotCity = JSON.parse(hotCity)
      console.log('从本地获取的数据')
    } else {
      this.axios({
        url: 'https://m.maizuo.com/gateway?k=1745127',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105"}',
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then(res => {
        console.log(res.data)
        var msg = res.data.msg
        if (msg === 'ok') {
          var data = res.data.data.cities
          this.datalist = this.formatCityList(data)
          this.hotCity = this.formHotCity(data)
          // console.log(data)
          // console.log(this.hotCity)
          window.localStorage.setItem('cityList', JSON.stringify(this.datalist))//  JSON.stringify() 方法将 JavaScript 对象转换为字符串。
          window.localStorage.setItem('hotCity', JSON.stringify(this.hotCity))
        }
      })
    }
  }
}
</script>

<style scoped>
    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        width:0;
    }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
