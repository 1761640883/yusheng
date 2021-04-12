<template>
    <div>
        <el-table :data="nowTableDate" border style="width: 100%"><!-- :data="nowTableDate"：类似于v-for="data in datalist",会将内容自动渲染成表格 -->
            <el-table-column
            prop="userHead"
            label="用户头像">
                 <template slot-scope="scope">
                     <img class="userHead" :src="scope.row.userHead" alt="图片加载失败">
                 </template>
            </el-table-column>
            <el-table-column prop="data" label="注册日期"><!-- prop="data"：data是该列的内容种类，也就是nowTableDate都西昂的属性 -->
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户姓名">
            </el-table-column>
            <el-table-column
            prop="email"
            label="用户邮箱">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope"><!-- scope:包含nowTableDate的所有值 -->
                    <el-button size="small" @click="handleToFreeze(scope.$index, scope.row)">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button><!-- scope.$index, scope.row是饿了么ui框架独有的 scope.$index：该行的排序，scope.row：该行的数据-->
                    <el-button type="danger" size="small" @click="handleToDelet(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="page" :page-size="pageSize" :current-page.sync="currentPage"
        background
        layout="prev, pager, next"
        :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    nowTableDate () {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize) || []
    }
  },
  mounted () {
    this.axios.get('/api2/admin/usersList').then((res) => {
      console.log(res)
      var status = res.data.status
      if (status === 0) {
        this.tableData = res.data.data.usersList
      }
    })
  },
  methods: {
    handleToFreeze (index, row) {
      this.axios.post('/api2/admin/updateFreeze', {
        email: row.email,
        isFreeze: !row.isFreeze
      }).then((res) => {
        var status = res.data.status
        if (status === 0) {
          this.$alert('冻结操作成功', '信息', {
            confirmButtonText: '确定',
            callback: action => {
              this.nowTableDate[index].isFreeze = !row.isFreeze
            }
          })
        } else {
          this.$alert('冻结操作失败', '信息', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    handleToDelet (index, row) {
      this.axios.post('/api2/admin/deleteUser', {
        email: row.email
      }).then((res) => {
        var status = res.data.status
        if (status === 0) {
          this.$alert('删除操作成功', '信息', {
            confirmButtonText: '确定',
            callback: action => {
              this.nowTableDate.splice(index, 1)
            }
          })
        } else {
          this.$alert('删除操作失败', '信息', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.page{margin-top: 20px;}
.userHead{width: 50px;height: 50px;border-radius: 50%;overflow: hidden;}
</style>
