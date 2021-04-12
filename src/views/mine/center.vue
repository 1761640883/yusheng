<template>
    <div>
        <div>个人中心</div>
        <div>当前用户：{{$store.state.user.name}} <a href="#" @click="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="_blank">进入管理后台</a></div>
        <div v-else>用户身份：普通会员</div>
        <div>
          <input type="file" name="file" value="上传头像" @change="handleToUpload"><!-- change具有改变的意思，change事件会在元素数据发生变化的时候触发。 -->
          <img class="userHead" :src="$store.state.user.userHead" alt="图片加载失败">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { messageBox } from '@/components/JS'

export default {
  name: 'center',
  methods: {
    handleToLogout () {
      this.axios.get('/api2/users/logout').then((res) => {
        var status = res.data.status
        if (status === 0) {
          localStorage.removeItem('name')
          localStorage.removeItem('isAdmin')
          this.$store.commit('user/USER_NAME', { name: '', isAdmin: false, userHead: '' })
          this.$router.push('/mine/login')
        }
      })
    },
    handleToUpload (ev) { // 上传头像
      var file = ev.target.files[0]
      var param = new FormData()// FormData是Ajax 2.0对象用以将数据编译成键值对，以便于XMLHttpRequest来发送数据。XMLHttpRequest Level 2提供的一个接口对象，可以使用该对象来模拟和处理表单并方便的进行文件上传操作。
      param.append('file', file, file.name)
      var config = {
        headers: {
          'Content-Type': 'multipart/from-data'
        }
      }

      this.axios.post('/api2/users/uploadUserHead', param, config).then((res) => {
        var This = this
        var status = res.data.status
        if (status === 0) {
          messageBox({
            title: '信息',
            content: '上传头像成功',
            ok: '确定',
            handleOk () {
              This.$store.commit('user/USER_NAME', {
                name: This.$store.state.user.name,
                isAdmin: This.$store.state.user.isAdmin,
                userHead: res.data.data.userHead + '?' + Math.random()// 为了刷新
              })
            }
          })
        } else {
          messageBox({
            title: '信息',
            content: '上传头像失败',
            ok: '确定'
          })
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) { // 组件内前置守卫，to：去哪；from： 来自哪；next：向下执行
    axios.get('/api2/users/getUser').then((res) => {
      var status = res.data.status
      if (status === 0) {
        next(vm => { // vm:是该组件
          localStorage.setItem('name', res.data.data.username)
          localStorage.setItem('isAdmin', res.data.data.isAdmin)
          vm.$store.commit('user/USER_NAME', {
            name: res.data.data.username,
            isAdmin: res.data.data.isAdmin,
            userHead: res.data.data.userHead
          })
        })
      } else {
        next('/mine/login')
      }
    })
  }
}
</script>

<style scoped>
.userHead{width: 100px;height: 100px;border-radius: 50%;overflow: hidden;}
</style>
