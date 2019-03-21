<template>
  <div class="auth">
    <magix-control></magix-control>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="type.name" label="类别" width="180"></el-table-column>
      <el-table-column prop="statu.name" label="审核" width="180"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.statu.value === '1'" @click="handleCheck(scope.row)" type="text" size="small">审核</el-button>
          <el-button v-if="user.username==='admin'" @click="changeAuth(scope.row)" type="text" size="small">权限</el-button>
          <el-button v-if="user.username==='admin'" @click="deleteUser(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="length" @current-change="currentChange"></el-pagination>
    
  </div>
</template>

<script>
  import magixControl from 'components/magix-control'
  import { getUser,checkUser,changeAuth,deleteUser } from 'controller/auth'
  export default {
    name: 'auth',
    components: { magixControl },
    data() {
      return {
        tableData: [],
        user:this.$store.state.admin.user,
        length:0,
        count:10
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(params) {
        let o = {
          count:this.count,
          index:0
        }
        getUser.bind(this)(Object.assign({},params?params:o,{type:this.user.type})).then(res=>{
          this.tableData = res.users
          this.length = res.length
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
      },
      deleteUser(id) {
        console.log(id)
        this.deleteMsg('此操作将永久删除该文件, 是否继续?').then(()=>{
          deleteUser.bind(this)([id]).then(res=>{
            this.$message('删除成功！')
            this.getList()
          })
          .catch(err=>{
            this.$message(err.message)
          })
        })
      },
      currentChange(i) {
        this.getList({
          count:this.count,
          index:i-1
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .auth {
    .pagination {
      padding:1rem 1rem 3rem 1rem;
      text-align: center;
    }
  }
</style>