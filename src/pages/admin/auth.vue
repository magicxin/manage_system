<template>
  <div class="auth">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="type.name" label="类别" width="180"></el-table-column>
      <el-table-column prop="statu.name" label="审核" width="180"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button v-if="scope.row.statu.value === '1'" @click="handleCheck(scope.row)" type="text" size="small">审核</el-button>
        <el-button v-if="user.username==='admin'" @click="changeAuth(scope.row)" type="text" size="small">权限</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getUser,checkUser,changeAuth } from 'controller/auth'
  export default {
    name: 'auth',
    data() {
      return {
        tableData: [],
        user:this.$store.state.admin.user
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getUser.bind(this)(this.user.type).then(res=>{
          this.tableData = res
          console.log(res)
        })
      },
      handleCheck(item) {
        checkUser.bind(this)(item.username).then(res=>{
          this.getList()
          this.$message('审核通过！')
          
        })
      },
      changeAuth(item) {
        this.$prompt('请输入权限', '修改选线', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /['1','2']/,
          inputErrorMessage: '权限输入错误'
        }).then(({ value }) => {
          changeAuth.bind(this)({
            username:item.username,
            type:value
          }).then(res=>{
            this.getList()
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .auth {
    
  }
</style>