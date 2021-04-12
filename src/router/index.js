/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import admin from './admin'

Vue.use(VueRouter)

const routes = [
  movieRouter,
  cinemaRouter,
  mineRouter,
  admin,
  {
    path: '*',
    redirect: 'movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'yusheng',// 这里更改的是路由的路径，让路径默认带yusheng（这里更改后需要去vue.config.js文件夹更改根目录）
  routes
})

export default router
