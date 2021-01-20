<template>
    <div id="detailContrainer" class="slide-emter-active">
		<heoder title="影片详情">
			<i class="iconfont icon-right" @click="handleToBack"></i>
		</heoder>
		<loading v-if="isLoading" />
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style="{'background': `url('${datalist.poster}')`}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="datalist.poster" alt="图片加载失败">
					</div>
					<div class="detail_list_info">
						<h2>{{datalist.name}}</h2>
						<p>观众评分：{{datalist.grade}}</p>
						<p>{{datalist.category.replace(/\|/g, ' | ')}}</p>
						<p v-if="datalist.runtime">{{datalist.nation}} / {{datalist.runtime}}分钟</p>
						<p v-else>{{datalist.nation}} / 暂无时间</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{datalist.synopsis}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(data, index) in datalist.actors" :key="index">
						<div>
							<img :src="data.avatarAddress" alt="图片加载失败">
						</div>
						<p>{{data.name}}</p>
						<p>{{data.role}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import heoder from '@/components/heoder'
import Swiper from 'swiper'// 使用模块化引入swiper只能引入js文件
import 'swiper/swiper.min.css'

export default {
  name: 'detail',
  components: {
    heoder
  },
  props: ['id'],
  data () {
    return {
      datalist: {},
      isLoading: true
    }
  },
  methods: {
    handleToBack () {
      this.$router.back()
    }
  },
  mounted () {
    this.axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.id}&k=3843891`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      if (res.data.msg === 'ok') {
        console.log(res.data.data.film)
        this.datalist = res.data.data.film
        this.isLoading = false
        this.$nextTick(() => {
          /* eslint-disable no-new */
          new Swiper(this.$refs.detail_player, {
            slidesPerView: 'auto',
            freeMode: true,
            freeModeSticky: true
          })
        })
      }
    })
  }
}
</script>

<style scoped>
	#detailContrainer{position: absolute;left: 0;top: 0;z-index: 100;width: 100%;min-height: 100%;background: white;}
	#detailContrainer.slide-emter-active{animation: .5s slideMove;}
	@keyframes slideMove{
		0%{transform: translateX(100%);}
		100%{transform: translateX(0);}
	}
	#content.contentDetail{ display: block; margin-bottom:0;}
	#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
	.detail_list .detail_list_bg{ width:100%; height:100%; background: url(/images/movie_1.jpg) 0 40%; background-size:cover; position: absolute; left: 0; top: 0;filter: blur(20px);}
	.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
	.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
	.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
	.detail_list .detail_list_img img{ width:100%; height: 100%;}
	.detail_list .detail_list_info{ margin-top: 20px;}
	.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
	.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

	#content .detail_intro{ padding: 10px;}
	#content .detail_player{ margin:20px;}
	.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
	.detail_player .swiper-slide div{width: 100%;height: 80px;overflow: hidden;}
	.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
	.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>
